import DefaultButton from "@/atoms/defaultButton";
import Header from "@/atoms/header";
import { firebaseApp, firebaseAuth } from "@/firebase";
import { FirestoreDocument } from "@/firebase/saveToFirestore";
import Layout from "@/templates/layout";
import TeX from "@matejmazur/react-katex";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  width: calc(100% - 40px);
  padding: 0 20px;
  padding-bottom: 20px;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.action.warning};
  span {
    font-weight: 600;
  }
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  width: calc(100% - 40px);
  padding: 0 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.action.success};
  }
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight} - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  width: calc(100vw - 80px);
  padding: 40px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.peripheral.grey};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const ListItemMetadata = styled.div`
  flex-direction: column;
  align-items: center;
  width: 30%;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`;

const ListItemName = styled.p`
  color: ${({ theme }) => theme.colors.brand.secondary};
  font-weight: 500;
`;

const ListItemCalculator = styled.p``;

const ListItemMath = styled(TeX)`
  margin-right: 12px;
`;

const ListItemOptions = styled.div`
  margin-left: auto;
  align-items: center;
  justify-content: center;
  & > button {
    display: block;
    margin: 0 auto;
  }
`;

const ListItemDate = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const ListItemSecondRow = styled.div`
  display: contents;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

const ListHeader = styled(motion.div)`
  margin-top: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.brand.accent};
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
`;

const ItemsToFetch = 50;

export default function History() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebaseAuth);
  const [list, setList] = useState<FirestoreDocument[]>([]);
  const db = getFirestore(firebaseApp);
  const calcsRef = collection(db, "calculations");
  const [listQueried, setListQueried] = useState(false);
  function loadQuery(uid: string): Query {
    return query(
      calcsRef,
      where("owneruid", "==", uid),
      orderBy("timestamp", "desc"),
      limit(ItemsToFetch)
    );
  }
  function newQuery(uid: string, startAt: Timestamp) {
    return query(
      calcsRef,
      where("owneruid", "==", uid),
      orderBy("timestamp", "desc"),
      startAfter(startAt),
      limit(ItemsToFetch)
    );
  }

  let overallDelay = -1;

  function nextDelayStep(advance?: false) {
    if (advance !== false) overallDelay++;
    return overallDelay;
  }

  function loadMore(lastTimestamp: Timestamp) {
    if (loading || !user) return;
    const nextQuery = newQuery(user.uid, lastTimestamp);
    getDocs(nextQuery)
      .then((docs) => {
        if (docs.empty) {
          toast.error("No more items to display");
          return;
        }
        setListQueried(true);
        const data = docs.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setList([...list, ...(data as FirestoreDocument[])]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  useEffect(() => {
    if (!loading && user) {
      const q = loadQuery(user.uid);
      getDocs(q)
        .then((docs) => {
          setListQueried(true);
          const data = docs.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setList(data as FirestoreDocument[]);
        })
        .catch(() => {
          toast.error("Error loading history. Please try again later.");
        });
    }
  }, [loading, user]);
  return (
    <Layout title="History" restricted>
      <Container>
        <Header
          title="History"
          subtitle="Recent calculations and saved results"
        />
        {list.length > 0 ? (
          <>
            <ListContainer>
              {list.map((doc, index) => (
                <>
                  {(index === 0 ||
                    isNextDay(doc.timestamp, list[index - 1].timestamp)) && (
                    <ListHeader
                      key={doc.timestamp.toMillis()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: nextDelayStep(false) / 100,
                      }}
                    >
                      {doc.timestamp.toDate().toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </ListHeader>
                  )}
                  <ListItem
                    key={doc.id}
                    initial={{ opacity: 0, translateY: -8 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.5, delay: nextDelayStep() / 50 }}
                  >
                    <ListItemMetadata>
                      <ListItemName>{doc.display.pageName}</ListItemName>
                      <ListItemCalculator>
                        {doc.display.subtext?.substring(0, 40)}
                        {doc.display.subtext &&
                          doc.display.subtext.length > 40 &&
                          "..."}
                      </ListItemCalculator>
                    </ListItemMetadata>
                    <ListItemSecondRow>
                      <ListItemMath>{doc.display.math}</ListItemMath>
                      <ListItemOptions>
                        <ListItemDate>
                          {doc.timestamp.toDate().toLocaleTimeString()}
                        </ListItemDate>
                        <DefaultButton
                          onClick={() => {
                            navigate(doc.data.url, {
                              state: {
                                dbInfo: {
                                  shareUrl: `${
                                    import.meta.env
                                      .REACT_CLIENT_FIREBASE_REDIRECT_ORIGIN
                                  }/share/calc/${doc.id}`,
                                  ownerName: doc.display.ownerName,
                                  timestamp: doc.timestamp,
                                },
                                dbData: doc.data,
                              },
                            });
                          }}
                          className="primary"
                        >
                          View
                        </DefaultButton>
                      </ListItemOptions>
                    </ListItemSecondRow>
                  </ListItem>
                </>
              ))}
            </ListContainer>
            {list.length >= ItemsToFetch && (
              <DefaultButton
                onClick={() => loadMore(list[list.length - 1].timestamp)}
              >
                Load more items...
              </DefaultButton>
            )}
          </>
        ) : listQueried ? (
          <InfoText>
            There are no calculations to display.{" "}
            <span>Start calculating!</span>
          </InfoText>
        ) : null}
      </Container>
      <Disclaimer>
        <span>Disclaimer:</span> Old data may be cleared from time to time.
        Although the calculation history feature is always available, data
        retention is not guaranteed.
      </Disclaimer>
    </Layout>
  );
}

function isNextDay(currentTimestamp: Timestamp, previousTimestamp: Timestamp) {
  const currentDate = currentTimestamp.toDate();
  const previousDate = previousTimestamp.toDate();
  currentDate.setHours(0, 0, 0, 0);
  previousDate.setHours(0, 0, 0, 0);
  if (currentDate < previousDate) {
    return true;
  }
  return false;
}
