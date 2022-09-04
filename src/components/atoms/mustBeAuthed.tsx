import { firebaseAuth } from "@/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function MustBeAuthed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading] = useAuthState(firebaseAuth);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/auth", {
        state: location.pathname,
        replace: true,
      });
    }
  }, [user, loading]);

  return null;
}
