import { UserInfo } from "firebase";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { firebaseApp } from ".";

const db = getFirestore(firebaseApp);

interface FirestoreFields {
  user: UserInfo;
  pageName: string;
  subtext?: string;
  math?: string;
  url: string;
  data: {
    [key: string]: any;
  };
}

export interface FirebaseDocData {
  id: string;
  shareLink: string;
}

export default async function saveToFirestore({
  user,
  pageName,
  subtext,
  math,
  url,
  data,
}: FirestoreFields): Promise<"offline" | FirebaseDocData> {
  if (navigator && "onLine" in navigator && !navigator.onLine) {
    return "offline";
  }
  const collRef = collection(db, "calculations");
  const currentDateTime = new Date(Date.now());
  const document = await addDoc(collRef, {
    owneruid: user.uid,
    timestamp: Timestamp.fromDate(currentDateTime),
    display: {
      pageName: pageName,
      subtext: subtext || null,
      math: math || null,
      ownerName: user.displayName || "unknown",
    },
    data: {
      url: url,
      ...data,
    },
  });

  return {
    id: document.id,
    shareLink: `${
      import.meta.env.REACT_CLIENT_FIREBASE_REDIRECT_ORIGIN
    }/share/calc/${document.id}`,
  };
}
