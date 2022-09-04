import { firebaseAnalytics, firebaseApp } from "@/firebase";
import { logEvent } from "firebase/analytics";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight} - 103px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 6px solid ${({ theme }) => theme.colors.brand.accent};
  border-bottom: 6px solid
    ${({ theme }) => theme.colors.peripheral.majorVariant};
  border-top: 6px solid ${({ theme }) => theme.colors.peripheral.majorVariant};
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function ShareHandler() {
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const location = useLocation();

  async function retrieveCalcData(url: string) {
    console.log("retrieveCalcData", url);
    const docRef = doc(db, `/calculations/${url}`);
    const document = await getDoc(docRef);
    console.log("doc retrieved", document);
    if (!document.exists()) {
      navigate("/");
      return false;
    }
    const docData = document.data();
    navigate(docData.data.url, {
      state: {
        dbInfo: {
          shareUrl: `${
            import.meta.env.REACT_CLIENT_FIREBASE_REDIRECT_ORIGIN
          }/share/calc/${document.id}`,
          ownerName: docData.display.ownerName,
          timestamp: docData.timestamp,
        },
        dbData: docData.data,
      },
      replace: true,
    });
    return true;
  }

  useEffectOnce(() => {
    if (location.pathname.startsWith("/share/calc/")) {
      console.log("share calc");
      logEvent(firebaseAnalytics, "share_calc_view");
      retrieveCalcData(location.pathname.slice(12));
    } else {
      navigate("/");
    }
  });

  return (
    <>
      <Container>
        <Spinner />
      </Container>
    </>
  );
}
