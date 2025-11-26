import { ReactNode, useEffect, useState } from "react";

import { Button, IButtonProperties } from "../Buttons";
import { IStepEvent, LineStyleType, Step } from "./Step";

type AlignType = "start" | "center" | "end";

type StepItem = {
  activeStepIcon?: string | ReactNode;
  content?: string | ReactNode;
  label?: string;
  step?: number | string | ReactNode;
  subtitle?: string;
};

interface IProperties {
  activeIndex?: number;
  direction?: "horizontal" | "vertical";
  hideButtons?: boolean;
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
  activeIndex,
  align = "center",
  direction = "horizontal",
  hideButtons = false,
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
    if (activeIndex !== undefined && activeIndex !== null) {
      setActiveStepIndex(activeIndex);
    }
  }, [activeIndex]);

  const onClick = (event: IStepEvent) => {
    if (!readOnly && onChange) {
      onChange(event);
    }
  };

  const handleNext = () => {
    if (hideButtons) {
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
    if (hideButtons) {
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
    if (hideButtons) {
      return null;
    }

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
          {...nextButtonProperties}
          onClick={handleNext}
        />
      </div>
    );
  };

  const renderActiveContent = () => {
    if (!renderContent() && !renderButtons()) {
      return null;
    }

    return (
      <div className="content-wrapper">
        {renderContent()}
        {renderButtons()}
      </div>
    );
  };

  return (
    <div className={`stepper ${align} ${direction}`}>
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
              activeContent={
                direction === "vertical" && activeStepIndex === index
                  ? renderActiveContent()
                  : null
              }
            />
          );
        })}
      </ul>

      {direction === "horizontal" ? renderActiveContent() : null}
    </div>
  );
};
