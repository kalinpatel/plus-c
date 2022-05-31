import Button from "@/atoms/defaultButton";
import InputField from "@/atoms/inputField";
import MathInputSection from "@/atoms/mathInputSection";
import MathSubmitButtonsRow from "@/atoms/mathSubmitButtonsRow";
import { InputContainer, InputSection } from "@/atoms/responsiveInputFields";
import { firebaseAuth } from "@/firebase";
import saveToFirestore from "@/firebase/saveToFirestore";
import calculateEulersMethod, {
  EulersMethodAnswer,
  EulersMethodInputs,
} from "@/math/calculators/eulersMethod";
import type { Screen } from "@/molecules/calculatorInputOutputSwitch";
import CalculatorInputOutput from "@/molecules/calculatorInputOutputSwitch";
import MathEntry from "@/molecules/mathEntry";
import EulersOutputTable from "@/organisms/eulersOutputTable";
import CalculatorLayout from "@/templates/calculatorLayout";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import toast from "react-hot-toast";
import { ImShare2 } from "react-icons/im";
import { VscDebugRestart } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

interface StepCountInputsInterface {
  numberUsed: boolean;
  sizeUsed: boolean;
  numberTooltip: string;
  sizeTooltip: string;
}

export interface Values {
  initialX: string;
  initialY: string;
  finalX: string;
  step: {
    definedAs: "number" | "size" | "";
    value: string;
  };
  diffEq: string;
  reset: boolean;
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ShareText = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.themed.minor};
`;

export default function EulersMethod() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("input");
  const [canSubmit, setCanSubmit] = useState(false);
  const [output, setOutput] = useState<EulersMethodAnswer | null>(null);
  const [shareData, setShareData] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState(
    "Share functionality is not available."
  );
  const [stepCountInputs, setStepCountInputs] =
    useState<StepCountInputsInterface>({
      numberUsed: false,
      sizeUsed: false,
      numberTooltip: "The number of steps to be taken. Enter a whole number.",
      sizeTooltip: "The step size to be taken. Enter a decimal or fraction.",
    });
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    initialX: "",
    initialY: "",
    finalX: "",
    step: {
      definedAs: "",
      value: "",
    },
    diffEq: "",
    reset: false,
  });
  const location = useLocation();
  const state = location.state as any;
  const isFromDb = state && typeof state == "object" && "dbData" in state;
  const dbData = isFromDb ? state.dbData : null;

  useEffectOnce(() => {
    if (isFromDb) {
      const dataValues = {
        initialX: dbData.initialX,
        initialY: dbData.initialY,
        finalX: dbData.finalX,
        step: {
          definedAs: dbData.stepType,
          value: dbData.stepValue,
        },
        diffEq: dbData.diffEq,
        reset: false,
      };
      const result = calculateEulersMethod(dataValues);
      setOutput(result as EulersMethodAnswer);
      setCurrentScreen("output");
      setValues(dataValues);
      setShareMessage(
        `This calculation was originally shared by ${state.dbInfo.ownerName}.`
      );
      setShareData(state.dbInfo.shareUrl);
    }
  });

  useEffect(() => {
    if (valuesAreValid(values)) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [values]);

  function clearData() {
    setStepCountInputs({
      numberUsed: false,
      sizeUsed: false,
      numberTooltip: "The number of steps to be taken. Enter a whole number.",
      sizeTooltip: "The step size to be taken. Enter a decimal or fraction.",
    });
    formRef.current?.reset();
    setValues({
      initialX: "",
      initialY: "",
      finalX: "",
      step: {
        definedAs: "",
        value: "",
      },
      diffEq: "",
      reset: true,
    });
  }

  async function upload() {
    if (!firebaseAuth.currentUser) {
      setShareMessage(
        "Create an account to save your calculations and share them with others."
      );
      return;
    }
    const docData = await saveToFirestore({
      user: firebaseAuth.currentUser!,
      pageName: "Euler's Method",
      subtext: `Approximate y(${values.finalX}) given (${values.initialX}, ${values.initialY})`,
      math: values.diffEq,
      url: location.pathname,
      data: {
        initialX: values.initialX,
        initialY: values.initialY,
        finalX: values.finalX,
        stepType: values.step.definedAs,
        stepValue: values.step.value,
        diffEq: values.diffEq,
      },
    });
    if (docData === "offline") {
      setShareMessage("Your calculation is not saved since you are offline.");
      return;
    }
    setShareData(docData.shareLink);
    setShareMessage("");
  }

  const Input = (
    <MathInputSection>
      <MathEntry
        onChange={(value: string) => {
          setValues({ ...values, reset: false, diffEq: value });
        }}
        placeholderText="Enter a differential equation in terms of x and y"
        prefix="\frac{dy}{dx} = "
        reset={values.reset}
      />
      <form
        onSubmit={(e) => {
          console.log("submitted");
          e.preventDefault();
          if (!valuesAreValid(values)) {
            toast.error("Please enter valid values");
            return;
          }
          const result = calculateEulersMethod(values as EulersMethodInputs);
          if (result.completed) {
            setOutput(result);
            setCurrentScreen("output");
            upload();
          } else {
            toast.error(
              `Could not calculate the solution. ${
                result.errorMessage ? "Error: " + result.errorMessage : ""
              }`
            );
          }
        }}
        ref={formRef}
      >
        <InputContainer>
          <InputSection>
            <InputField
              placeholder="X"
              label="Initial X Value"
              width="half"
              required
              tooltip="X value provided in the question. Enter a decimal or fraction."
              onUserChange={(value) => {
                setValues({ ...values, reset: false, initialX: value });
              }}
            />
            <InputField
              placeholder="Y"
              label="Initial Y Value"
              width="half"
              required
              tooltip="Y value provided in the question. Enter a decimal or fraction."
              onUserChange={(value) => {
                setValues({ ...values, reset: false, initialY: value });
              }}
            />
          </InputSection>
          <InputSection>
            <InputField
              placeholder="X"
              label="Final X Value"
              width="half"
              required
              tooltip="The final X value to be reached. Enter a decimal or fraction."
              onUserChange={(value) => {
                setValues({ ...values, reset: false, finalX: value });
              }}
            />
          </InputSection>
          <InputSection>
            <InputField
              placeholder="#"
              label="Steps"
              width="half"
              tooltip={stepCountInputs.numberTooltip}
              disabled={stepCountInputs.sizeUsed}
              tooltipOnHover={stepCountInputs.sizeUsed}
              onUserChange={(value) => {
                setStepCountInputs({
                  ...stepCountInputs,
                  numberUsed: value !== "",
                  sizeTooltip:
                    value === ""
                      ? "The step size to be taken. Enter a decimal or fraction."
                      : "You have entered a number of steps already. To change the step size, clear the number of steps.",
                });
                setValues({
                  ...values,
                  reset: false,
                  step: {
                    definedAs: "number",
                    value: value,
                  },
                });
              }}
            />
            OR
            <InputField
              placeholder="Step Size"
              label="Step Size"
              width="half"
              tooltip={stepCountInputs.sizeTooltip}
              disabled={stepCountInputs.numberUsed}
              tooltipOnHover={stepCountInputs.numberUsed}
              onUserChange={(value) => {
                setStepCountInputs({
                  ...stepCountInputs,
                  sizeUsed: value !== "",
                  numberTooltip:
                    value === ""
                      ? "The number of steps to be taken. Enter a whole number."
                      : "You have entered a step size already. To change the number of steps, clear the step size.",
                });
                setValues({
                  ...values,
                  reset: false,
                  step: {
                    definedAs: "size",
                    value: value,
                  },
                });
              }}
            />
          </InputSection>
        </InputContainer>
        <MathSubmitButtonsRow canSubmit={canSubmit} onReset={clearData} />
      </form>
    </MathInputSection>
  );

  const Output = (
    <>
      <EulersOutputTable input={values} result={output} />
      <FlexRow>
        {!isFromDb && (
          <Button
            type="button"
            onClick={() => {
              clearData();
              setCurrentScreen("input");
            }}
            className="icon"
          >
            Restart <VscDebugRestart />
          </Button>
        )}
        {shareData && (
          <Button
            type="button"
            onClick={() => {
              if (!shareData) return;
              if (
                "canShare" in navigator &&
                navigator.canShare() &&
                "share" in navigator &&
                isMobile
              ) {
                navigator.share({
                  title: "Euler's Method Calculation",
                  text: "Check out this calculation I made using +C.",
                  url: shareData,
                });
              } else {
                navigator.clipboard.writeText(shareData).then(() => {
                  toast.success("Share link copied to clipboard");
                });
              }
            }}
            className="icon"
          >
            Share <ImShare2 />
          </Button>
        )}
      </FlexRow>
      <ShareText>{shareMessage}</ShareText>
    </>
  );

  return (
    <CalculatorLayout title="Euler's Method">
      <CalculatorInputOutput
        screen={currentScreen}
        input={Input}
        output={Output}
      />
    </CalculatorLayout>
  );
}

function valuesAreValid(values: Values) {
  const numbersToCheck = [values.initialX, values.initialY, values.finalX];
  if (values.step.value === "" || values.step.definedAs === "") return false;
  if (values.diffEq === "") return false;
  if (values.step.definedAs === "size") numbersToCheck.push(values.step.value);
  if (numbersToCheck.some((num) => num === "")) return false;
  if (numbersToCheck.some((num) => /[a-zA-Z]+/.test(num))) return false;
  numbersToCheck.forEach((num) => {
    if (num.includes("/")) {
      if (
        num.split("/").length !== 2 ||
        num.lastIndexOf("/") !== num.indexOf("/")
      )
        return false;
      if (!/[0-9]+\/[0-9]+/.test(num)) return false;
    } else if (num.includes(".")) {
      if (num.split(".").length === 2 && num.split(".")[1].length > 0) {
        if (!/\.[0-9]+/.test(num)) return false;
      } else if (!/[0-9]+\.[0-9]+/.test(num)) return false;
    }
  });
  if (
    values.step.definedAs === "number" &&
    (Number(values.step.value) <= 0 || Number(values.step.value) % 1 !== 0)
  )
    return false;
  return true;
}
