import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLockedBody } from "usehooks-ts";

interface DeleteConfirmationProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  context: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100003;
  background-color: rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &.hide {
    display: none;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, 100vw);
  height: fit-content;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 100004;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  &.show {
    animation: fadeIn 0.3s ease-in-out;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  &.hide {
    display: none;
  }
  p {
    margin-top: 0px;
    span {
      font-family: monospace;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.action.error};
    }
  }
  input {
    width: min(300px, 100%);
    height: 35px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    border: 1px solid ${({ theme }) => theme.colors.themed.minor};
    padding: 0 10px;
    margin-bottom: 20px;
    &.complete {
      border: 1px solid #27ae60;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    button {
      padding: 10px;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: none;
      background-color: #bbb;
      cursor: pointer;
      transition: background-color 0.18s ease-in-out, color 0.18s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme.colors.themed.minor};
        color: ${({ theme }) => theme.colors.themed.alwaysLight};
      }
      &.delete-account {
        background-color: #ddd;
        color: ${({ theme }) => theme.colors.peripheral.grey};
        &.complete {
          background-color: ${({ theme }) => theme.colors.action.error};
          color: ${({ theme }) => theme.colors.themed.alwaysLight};
          transition: transform 0.18s ease-in-out;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
`;

const deleteWords = [
  "delete",
  "remove",
  "destroy",
  "expunge",
  "eliminate",
  "abolish",
  "obliterate",
  "extinguish",
  "terminate",
  "eradicate",
];
const deleteWord = deleteWords[Math.floor(Math.random() * deleteWords.length)];

export default function DeleteConfirmation({
  show,
  message,
  onConfirm,
  onCancel,
  context,
}: DeleteConfirmationProps) {
  const [deleteActionState, setDeleteActionState] = useState(false);
  const [, setLocked] = useLockedBody();

  function handleDeleteInput(event: any) {
    if (event.target?.value.toLowerCase() === deleteWord) {
      setDeleteActionState(true);
    } else {
      setDeleteActionState(false);
    }
  }

  useEffect(() => {
    setLocked(show);
  }, [show]);

  return (
    <>
      <Overlay className={show ? "show" : "hide"} />
      <Modal className={`show ${show ? "show" : "hide"}`}>
        <h2>{message}</h2>
        <p>
          Type <span>{deleteWord}</span> to confirm.
        </p>
        <input
          type="text"
          onChange={handleDeleteInput}
          placeholder={`${deleteWord}`}
          className={deleteActionState ? "complete" : ""}
        />
        <div className="buttons">
          <button
            className={`delete-account ${deleteActionState ? "complete" : ""}`}
            onClick={() => {
              if (deleteActionState) {
                onConfirm();
              }
            }}
          >
            {context}
          </button>
          <button
            className="cancel-delete"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
