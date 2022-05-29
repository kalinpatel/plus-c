import { firebaseAnalytics, firebaseApp } from "@/firebase";
import { logEvent } from "firebase/analytics";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";

export default function ShareHandler() {
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const location = useLocation();

  async function retrieveCalcData(url: string) {
    const docRef = doc(db, `/calculations/${url}`);
    const document = await getDoc(docRef);
    if (!document.exists()) {
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
        },
        dbData: docData.data,
      },
      replace: true,
    });
    return true;
  }

  useEffectOnce(() => {
    if (location.pathname.startsWith("/share/calc/")) {
      logEvent(firebaseAnalytics, "share_calc_view");
      retrieveCalcData(location.pathname.slice(13));
    } else if (location.pathname.startsWith("/share/gcs/")) {
      logEvent(firebaseAnalytics, "share_file_view");
      window.location.replace(
        `${
          import.meta.env.REACT_CLIENT_FIREBASE_API_DOMAIN
        }/file/${location.pathname.slice(12)}`
      );
    } else if (location.pathname.startsWith("/link/")) {
      logEvent(firebaseAnalytics, "external_link_view");
      window.location.replace(
        `${
          import.meta.env.REACT_CLIENT_FIREBASE_LINK_DOMAIN
        }/${location.pathname.slice(6)}`
      );
    } else {
      navigate("/");
    }
  });

  return <></>;
}
