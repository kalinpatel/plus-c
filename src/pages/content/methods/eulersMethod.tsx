import InputField from "@/atoms/inputField";
import MathInputSection from "@/atoms/mathInputSection";
import MathSubmitButtonsRow, { Button } from "@/atoms/mathSubmitButtonsRow";
import { InputContainer, InputSection } from "@/atoms/responsiveInputFields";
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
import toast from "react-hot-toast";
import { VscDebugRestart } from "react-icons/vsc";

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

export default function EulersMethod() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("input");
  const [canSubmit, setCanSubmit] = useState(false);
  const [output, setOutput] = useState<EulersMethodAnswer | null>(null);
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

  // useEffectOnce(() => {
  //   setTimeout(() => {
  //     setCurrentScreen("output");
  //   }, 3000);
  // });

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
