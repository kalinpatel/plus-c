import InputField from "@/atoms/inputField";
import LowerClouds from "@/brand/assets/BG_LowerClouds.svg";
import { firebaseApp, firebaseAuth } from "@/firebase";
import Layout from "@/templates/studyLayout";
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { BiRightArrowAlt } from "react-icons/bi";
import ReactRotatingText from "react-rotating-text";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CTAText = styled.div`
  padding-left: 80px;
  padding-top: 3%;
  padding-right: 20px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.themed.minor};
  font-size: 2.8rem;
  min-height: 6.5rem;
  max-width: 38rem;
  margin-bottom: 0px;
  .react-rotating-text-cursor {
    animation: blinking-cursor 1s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s
      infinite;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.themed.minor};
  }

  @keyframes blinking-cursor {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .accent {
    color: ${({ theme }) => theme.colors.brand.accent};
  }
`;
const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 1.3rem;
  max-width: 38rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.themed.minor};
  width: 100%;
  .emphasize {
    font-weight: 500;
  }
  .underline {
    text-decoration: underline;
  }
`;
const ActionArea = styled.section`
  width: calc(100vw - 38rem - 80px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10vh;
`;
const ActionContainer = styled.div`
  background: ${({ theme }) => theme.colors.peripheral.majorVariant};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0.5px 2px 8px 0px rgba(0, 0, 0, 0.15);
  height: fit-content;
  max-width: 90%;
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.themed.minor};
  padding: 20px;
`;
const GetStartedTitle = styled.h3`
  font-size: 2rem;
  margin-top: 8px;
`;
const HelpText = styled.p`
  span {
    font-weight: 300;
  }
`;
const InputArea = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
const ContinueButton = styled.button`
  width: 60px;
  margin-left: 10px;
  height: 44px;
  margin-bottom: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 2px solid ${({ theme }) => theme.colors.peripheral.grey};
  background-color: ${({ theme }) => theme.colors.peripheral.grey};
  cursor: not-allowed;
  svg {
    height: 30px;
    width: 30px;
    transform: translate(0, 1.5px);
    fill: ${({ theme }) => theme.colors.peripheral.extraDarkGrey};
  }
  &.valid {
    background-color: ${({ theme }) => theme.colors.action.success};
    svg {
      fill: ${({ theme }) => theme.colors.themed.alwaysLight};
      animation: pointRight 1s infinite;
      @keyframes pointRight {
        0% {
          transform: translate(0, 1.5px);
        }
        40% {
          transform: translate(-1px, 1.5px);
        }
        60% {
          transform: translate(2px, 1.5px);
        }
        100% {
          transform: translate(0px, 1.5px);
        }
      }
    }
    cursor: pointer;
  }
`;
const RecentItemsContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.themed.minor};
  width: 100%;
  margin-top: 10px;
  padding-top: 20px;
`;
const RecentItemsMissingInformation = styled.p`
  text-align: center;
  a {
    color: ${({ theme }) => theme.colors.themed.minor};
  }
`;

export default function Study() {
  const [inputValid, setInputValid] = useState(false);
  const [inputTooltip, setInputTooltip] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [user, loading] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  useEffectOnce(() => {
    // TESTING API
    fetch(
      `/external/${import.meta.env.REACT_CLIENT_PROXY_DOMAIN}/${314655274}`
    ).then((res) => {
      console.log(res);
    });
  });

  async function retrieveAndSetData(
    uid: string,
    qid: string,
    qurl: string,
    coll: CollectionReference
  ) {
    addDoc(coll, {
      useruid: uid,
      quizletid: qid,
      quizletData: {
        author: null,
        title: null,
      },
    });
  }
  return (
    <Layout title="Home" background={LowerClouds} oneTapDisabled>
      <Container>
        <CTAText>
          <Title>
            Master{" "}
            <span className="accent">
              <ReactRotatingText
                items={[
                  "chemistry terms",
                  "math formulas",
                  "word definitions",
                  "the unit circle",
                  "Spanish vocabulary",
                  "physics problems",
                  "business skills",
                  "the Periodic Table",
                  "psychology facts",
                  "French translations",
                  "biological species",
                  "philosophical concepts",
                  "events in history",
                  "reading in German",
                  "legal basics",
                  "U.S. Capitals",
                  "rules of accounting",
                  "the basis of trade",
                  "personal finance",
                  "classifying data",
                ]}
                pause={4000}
              />
              {""}
            </span>
          </Title>
          <Subtitle>
            <span className="emphasize">
              Don&apos;t pay for Quizlet Plus when you can do it for{" "}
              <span className="underline">free!</span>
            </span>{" "}
            <br />
            Be ready for test day with custom practice tests created from your
            flashcards.
          </Subtitle>
        </CTAText>
        <ActionArea>
          <ActionContainer>
            <GetStartedTitle>Get Started!</GetStartedTitle>
            <InputArea
              method="get"
              action="#"
              onSubmit={async function (e) {
                e.preventDefault();
                if (inputValid) {
                  setInputTooltip("");
                  // For logged in users
                  if (user && !loading) {
                    const db = getFirestore(firebaseApp);
                    const setsCollection = collection(db, "quizletSets");
                    const fullPath = inputValue.substring(20);
                    const path = fullPath.substring(0, fullPath.indexOf("/"));
                    console.log(path);
                    const q = query(
                      setsCollection,
                      where("useruid", "==", user.uid),
                      where("quizletid", "==", path)
                    );
                    const docs = await getDocs(q);
                    if (docs.empty) {
                      //   Has not used before, store in database
                      toast.promise(
                        retrieveAndSetData(
                          user.uid,
                          path,
                          inputValue,
                          setsCollection
                        ),
                        {
                          loading: "Working on it...",
                          success: "This set is linked to your account",
                          error: "An issue occurred. Please try again.",
                        }
                      );
                    } else {
                      //   Already used, direct to page
                      if (docs.docs.length > 1) {
                        toast.error("A database error occurred");
                        return;
                      }
                      navigate(`/study/set/${docs.docs[0].data().quizletid}`, {
                        state: {
                          dbData: docs.docs[0].data(),
                        },
                      });
                    }
                  }
                  //
                } else {
                  setInputTooltip("Please enter a valid quizlet URL");
                }
              }}
            >
              <InputField
                label="Quizlet URL"
                placeholder="Paste a Quizlet Link Here"
                onChange={({ target }) => {
                  setInputValue(target.value);
                  if (
                    target.value &&
                    /https:\/\/quizlet\.com\/[0-9]+\/[a-zA-Z]+/i.test(
                      target.value
                    )
                  ) {
                    setInputValid(true);
                    setInputTooltip("");
                  } else {
                    setInputValid(false);
                    setInputTooltip("Please enter a valid quizlet URL");
                  }
                }}
                required
                tooltip={inputTooltip}
              ></InputField>
              <ContinueButton
                className={inputValid ? "valid" : ""}
                type="submit"
              >
                <BiRightArrowAlt />
              </ContinueButton>
            </InputArea>
            <HelpText>
              Grab the URL from Quizlet by copying your browser&apos;s address
              bar.
            </HelpText>
            <RecentItemsContainer>
              <RecentItemsMissingInformation>
                <Link to="/user/auth">Login</Link> to save your recent study
                sets.
              </RecentItemsMissingInformation>
            </RecentItemsContainer>
          </ActionContainer>
        </ActionArea>
      </Container>
    </Layout>
  );
}
