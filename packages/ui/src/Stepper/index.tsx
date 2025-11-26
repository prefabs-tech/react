import { ReactNode, useEffect, useState } from "react";

import { Button, IButtonProperties } from "../Buttons";
import Divider from "../Divider";
import { IStepEvent, LineStyleType, AlignType, Step } from "./Step";

type StepItem = {
  activeStepIcon?: string | ReactNode;
  content?: string | ReactNode;
  label?: string;
  step?: number | string | ReactNode;
  stepContent?: string | ReactNode;
  subtitle?: string;
};

interface IProperties {
  activeIndex?: number;
  controlled?: boolean;
  direction?: "horizontal" | "vertical";
  onChange?: (event: IStepEvent) => void;
  previousButtonProperties?: IButtonProperties;
  nextButtonProperties?: IButtonProperties;
  readOnly?: boolean;
  lineStyle?: LineStyleType;
  steps: StepItem[];
  align?: AlignType;
  onComplete?: () => void;
  onStepUpdate?: (stepIndex: number) => void;
}

export const Stepper: React.FC<IProperties> = ({
  activeIndex = 0,
  align = "center",
  controlled = false,
  direction = "horizontal",
  lineStyle = "solid",
  onChange,
  onComplete,
  onStepUpdate,
  previousButtonProperties,
  nextButtonProperties,
  readOnly = true,
  steps = [],
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    if (controlled) {
      setActiveStepIndex(activeIndex);
    }
  }, [activeIndex]);

  const onClick = (event: IStepEvent) => {
    if (!readOnly && onChange) {
      onChange(event);
    }
  };

  const handleNext = () => {
    if (controlled) {
      return;
    }

    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
      onStepUpdate?.(activeStepIndex + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (controlled) {
      return;
    }

    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
      onStepUpdate?.(activeStepIndex - 1);
    }
  };

  const renderContent = () => {
    const activeStep = steps.find((_, index) => index === activeStepIndex);

    return activeStep?.content ? (
      <div className="content">{activeStep.content}</div>
    ) : null;
  };

  const renderButtons = () => {
    return (
      <div className="actions">
        <Button
          disabled={activeStepIndex === 0}
          label={previousButtonProperties?.label || "Previous"}
          variant={previousButtonProperties?.variant || "outlined"}
          onClick={handlePrevious}
          {...previousButtonProperties}
        />
        <Button
          label={
            activeStepIndex === steps.length - 1
              ? "Finish"
              : nextButtonProperties?.label || "Next"
          }
          severity={
            activeStepIndex === steps.length - 1
              ? "success"
              : nextButtonProperties?.severity || "primary"
          }
          onClick={handleNext}
          {...nextButtonProperties}
        />
      </div>
    );
  };

  const renderActiveStepContent = (
    content?: string | ReactNode,
    stepIndex?: number,
  ) => {
    const isActive = activeStepIndex === stepIndex;

    if (!content || !isActive || direction === "horizontal") {
      return null;
    }

    return <div className="step-content">{content}</div>;
  };

  return (
    <div className={`stepper ${direction}`}>
      <ul className="steps">
        {steps.map((element, index) => {
          return (
            <Step
              key={index}
              {...element}
              index={index}
              lineStyle={lineStyle}
              onClick={onClick}
              isCompleted={activeStepIndex > index ? true : false}
              isActive={activeStepIndex === index ? true : false}
              align={align}
              stepContent={renderActiveStepContent(element.stepContent, index)}
            />
          );
        })}
      </ul>

      {direction === "vertical" ? <Divider orientation="vertical" /> : null}
      <div className="content-wrapper">
        {!controlled && renderContent()}
        {!controlled && renderButtons()}
      </div>
    </div>
  );
};
