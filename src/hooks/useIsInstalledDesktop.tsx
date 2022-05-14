import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import { useMediaQuery } from "usehooks-ts";

export default function useIsInstalledDesktop() {
  const [isInstalledDesktop, setIsInstalledDesktop] = useState(false);
  const isStandalone = useMediaQuery("(display-mode: standalone)");

  useEffect(() => {
    setIsInstalledDesktop(isDesktop && isStandalone);
  }, [isDesktop, isStandalone]);

  return isInstalledDesktop;
}
