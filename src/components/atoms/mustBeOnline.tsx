import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MustBeOnlineProps {
  children: any;
  disabled?: boolean;
  strict?: boolean;
  serviceName: string;
}

const OfflineMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function MustBeOnline({
  children,
  disabled,
  strict,
  serviceName,
}: MustBeOnlineProps) {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  if (isOnline || disabled) {
    return children;
  } else {
    if (strict) {
      navigate("/");
    } else {
      return (
        <OfflineMessage>
          <h1>You are offline</h1>
          <p>
            {serviceName} requires internet. You can still access other features
            while you are offline.
          </p>
          <p>Please check your internet connection and try again.</p>
        </OfflineMessage>
      );
    }
  }
}
