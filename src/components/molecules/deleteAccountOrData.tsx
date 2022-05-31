import DeleteConfirmation from "@/atoms/deleteConfirmation";
import {
  firebaseAuth,
  firebaseProviderGoogle,
  firebaseProviderMicrosoft,
} from "@/firebase";
import { reauthenticateWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 40px);
  height: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  border: 2px solid ${({ theme }) => theme.colors.action.error};
`;

const StandardButton = styled.button`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: none;
  background-color: #bbb;
  cursor: pointer;
  transition: background-color 0.18s ease-in-out, color 0.18s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.themed.alwaysLight};
  }
`;

const DeleteButton = styled(StandardButton)`
  border: 1px solid ${({ theme }) => theme.colors.action.error};
  color: ${({ theme }) => theme.colors.themed.minor};
  background-color: rgba(244, 67, 54, 0.353);
  &:hover {
    background-color: ${({ theme }) => theme.colors.action.error};
  }
`;

const ClearDataButton = styled(StandardButton)`
  border: 1px solid ${({ theme }) => theme.colors.action.warning};
  color: ${({ theme }) => theme.colors.themed.minor};
  background-color: rgba(255, 152, 0, 0.353);
  &:hover {
    background-color: ${({ theme }) => theme.colors.action.warning};
    color: ${({ theme }) => theme.colors.themed.alwaysDark};
  }
`;

export default function DeleteAccountOrData() {
  const navigate = useNavigate();

  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [clearDataModalShown, setClearDataModalShown] = useState(false);

  function handleShowClearData() {
    const dataExists = false;
    if (dataExists) {
      setClearDataModalShown(true);
    } else {
      toast("No data to clear");
    }
  }

  function getProviderFromId(user: any) {
    switch (user.providerId) {
      case "microsoft.com":
        return firebaseProviderMicrosoft;
      case "google.com":
      default:
        return firebaseProviderGoogle;
    }
  }

  function deleteUserAccount(user: any) {
    if (!user) return;

    toast
      .promise(user.delete(), {
        loading: "Deleting...",
        success: "Account deleted",
        error: (err) => {
          if (err.code === "auth/requires-recent-login") {
            if (
              user.providerData.length === 1 &&
              user.providerData[0]?.providerId === "password"
            ) {
              alert(
                "You must sign out and sign in again to delete your account."
              );
            } else {
              reauthenticateWithPopup(user, getProviderFromId(user))
                .catch((err) => {
                  if (err.code === "auth/popup-blocked") {
                    toast.error(
                      "The sign in popup was blocked. Please allow popups for this site."
                    );
                  }
                })
                .then(() => {
                  deleteUserAccount(user);
                });
              return "For security reasons, you must log in again to delete your account.";
            }
          }
          const providerName =
            user.providerData[0]?.providerId.split(".")[0] || "";
          return `Failed to delete account. ${providerName} sign in is required to delete your account.`;
        },
      })
      .then(() => {
        navigate("/user/auth");
      });
  }

  function deleteAccount() {
    setDeleteModalShown(false);
    const user = firebaseAuth.currentUser;
    if (!user) return;
    deleteUserAccount(user);
  }

  function clearData() {
    setClearDataModalShown(false);
    console.log("clear data");
  }

  return (
    <>
      <DeleteConfirmation
        show={deleteModalShown}
        message="Are you sure you want to delete your account?"
        context="Delete Account"
        onConfirm={deleteAccount}
        onCancel={() => setDeleteModalShown(false)}
      />
      <DeleteConfirmation
        show={clearDataModalShown}
        message="Are you sure you want to clear all data?"
        context="Clear Data"
        onConfirm={clearData}
        onCancel={() => setClearDataModalShown(false)}
      />
      <Container>
        <DeleteButton onClick={() => setDeleteModalShown(true)}>
          Delete Account
        </DeleteButton>
        <ClearDataButton onClick={() => handleShowClearData()}>
          Clear all Data
        </ClearDataButton>
      </Container>
    </>
  );
}
