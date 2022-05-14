import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "usehooks-ts";

export default function useIsInstalledMobile() {
  const [isInstalledMobile, setIsInstalledMobile] = useState(false);
  const isStandalone = useMediaQuery("(display-mode: standalone)");

  useEffect(() => {
    setIsInstalledMobile(isMobile && isStandalone);
  }, [isMobile, isStandalone]);

  return isInstalledMobile;
}
