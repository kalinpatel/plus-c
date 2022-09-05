import TeX from "@matejmazur/react-katex";
import { MathfieldElement } from "mathlive";
import "mathlive/dist/mathlive-fonts.css";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

const Wrapper = styled.div`
  .prefix {
    display: inline-block;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.themed.minor};
    user-select: none;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
`;

const Containter = styled.div`
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  margin-left: 10px;
  height: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  position: relative;
  width: 100%;
  .math-field-element {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px;
    padding-left: 10px;
    --highlight: ${({ theme }) =>
      theme.darkMode ? "rgba(219, 48, 105, 0.7)" : "rgba(219, 48, 105, 0.3)"};
    --primary: ${({ theme }) => theme.colors.themed.minor};
    --caret: #d92469;
    --highlight-inactive: rgba(219, 48, 105, 0.1);
    --contains-highlight: ${({ theme }) =>
      theme.darkMode ? "rgba(219, 48, 105, 0.7)" : "rgba(219, 48, 105, 0.3)"};
    --hue: 0;
    cursor: text;
    border: 2px solid ${({ theme }) => theme.colors.peripheral.grey};
    outline: none !important;
    transition: border 0.2s ease-in-out;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.themed.minor};
    font-size: ${({ theme }) => theme.typography.fontSize.default};
    &:focus {
      border: 2px solid #d92469;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      min-height: 60px;
    }
    @media (prefers-color-scheme: dark) {
      --highlight-inactive: rgba(219, 48, 105, 0.1) !important;
    }
    .ML__contains-highlight {
      display: none !important;
    }
  }
  &::before {
    content: "${(props) => props.title}";
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    font-size: 20px;
    font-family: "Lora", serif;
    color: ${({ theme }) => theme.colors.peripheral.grey};
    font-style: italic;
    opacity: 1;
    transition: opacity 0.18s ease-in-out;
    pointer-events: none;
    max-width: calc(100% - 50px);
  }
  &.has-input::before {
    opacity: 0;
  }
`;

interface MathEntryProps {
  onChange: (value: string) => void;
  onHitEnter?: (value?: string) => void;
  value?: string;
  className?: string;
  mathFieldClassName?: string;
  smartSuperscriptOff?: boolean;
  placeholderText?: string;
  keyboards?: string;
  prefix?: string;
  reset?: boolean;
}

export default function MathEntry({
  onChange,
  onHitEnter,
  value,
  className,
  mathFieldClassName,
  smartSuperscriptOff = false,
  placeholderText,
  prefix,
  reset,
  keyboards = "numeric functions",
}: MathEntryProps) {
  const mathfieldRef = useRef<HTMLDivElement>(null);
  let mf: MathfieldElement | null = null;

  useEffectOnce(() => {
    //   Get current div
    const mathfield = mathfieldRef.current;

    // If div exists
    if (mathfield !== null && mathfield.innerHTML === "") {
      // Create a mathfield in the div
      mf = new MathfieldElement({
        defaultMode: "math",
        smartFence: true,
        smartSuperscript: !smartSuperscriptOff,
        removeExtraneousParentheses: true,
        virtualKeyboardMode: "manual",
        virtualKeyboards: keyboards,
        virtualKeyboardTheme: "apple",
      });
      mathfield.appendChild(mf);

      // Set the initial value
      if (value) {
        mf.setValue(value);
      }

      if (value || mf.value) {
        mathfield.classList.add("has-input");
      }

      if (mathFieldClassName) {
        mf.classList.add(mathFieldClassName);
      }
      mf.classList.add("math-field-element");

      // Set the onChange callback
      mf.addEventListener("input", () => {
        if (!mf) return;
        if (mf.value === "") {
          mathfield.classList.remove("has-input");
        } else {
          mathfield.classList.add("has-input");
        }
        onChange(mf.value);
      });
      mf.addEventListener("change", () => {
        if (!mf) return;
        if (onHitEnter) {
          onHitEnter(mf.value);
        }
      });

      setTimeout(() => {
        if (mf) mf.focus();
      }, 100);
    }

    return () => {
      if (mf) mf.remove();
    };
  });
  useEffect(() => {
    if (isMobile) {
      mf?.setOptions({
        virtualKeyboardMode: "onfocus",
      });
    } else {
      mf?.setOptions({
        virtualKeyboardMode: "manual",
      });
    }
  }, [isMobile]);

  useEffect(() => {
    if (value || mf?.value) {
      mathfieldRef.current?.classList.add("has-input");
    } else {
      mathfieldRef.current?.classList.remove("has-input");
    }
    if (value) {
      mf?.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    const mathfield = mathfieldRef.current?.querySelector(
      "math-field"
    ) as MathfieldElement;
    if (reset) {
      mathfield?.setValue("");
    }
  }, [reset]);

  return (
    <Wrapper>
      {prefix && <TeX math={prefix} className={`${className} prefix`} block />}
      <Containter ref={mathfieldRef} title={placeholderText}></Containter>
    </Wrapper>
  );
}
