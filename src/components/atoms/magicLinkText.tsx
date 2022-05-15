import { UserInfo } from "firebase/index";
import { useEffect, useState } from "react";

interface MagicLinkTextProps {
  user: any;
}

export default function MagicLinkText({ user }: MagicLinkTextProps) {
  const [usesMagicLink, setUsesMagicLink] = useState(false);
  useEffect(() => {
    if (user) {
      user.providerData.forEach((provider: UserInfo) => {
        if (provider.providerId === "password") {
          setUsesMagicLink(true);
        }
      });
    }
  }, [user]);
  return (
    <>
      {usesMagicLink
        ? "You can always use a magic link to sign in, as long as you enter the same email address you currently use."
        : "You can sign in with a magic link, if you enter the same email associated with the account you first signed up with."}
    </>
  );
}
