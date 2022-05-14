import { firebaseAuth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";

export default function MustBeAuthed() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffectOnce(() => {
    if (!firebaseAuth.currentUser) {
      navigate("/user/auth", {
        state: location.pathname,
      });
    }
  });

  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) {
      navigate("/user/auth", {
        state: location.pathname,
      });
    }
  });

  return null;
}
