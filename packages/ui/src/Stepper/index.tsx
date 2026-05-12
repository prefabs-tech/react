import { ReactNode, useEffect, useState } from "react";

import { Button, IButtonProperties } from "../Buttons";
import { IStepEvent, LineStyleType, Step } from "./Step";

type AlignType = "center" | "end" | "start";

interface IProperties {
  activeIndex?: number;
  align?: AlignType;
  direction?: "horizontal" | "vertical";
  hideButtons?: boolean;
  lineStyle?: LineStyleType;
  nextButtonProperties?: IButtonProperties;
  onActiveIndexUpdate?: (index: number) => void;
  onChange?: (event: IStepEvent) => void;
  onComplete?: () => void;
  previousButtonProperties?: IButtonProperties;
  readOnly?: boolean;
  steps: StepItem[];
}

type StepItem = {
  activeStepIcon?: ReactNode | string;
  content?: ReactNode | string;
  label?: string;
  step?: number | ReactNode | string;
  subtitle?: string;
};

export const Stepper: React.FC<IProperties> = ({
  activeIndex,
  align = "center",
  direction = "horizontal",
  hideButtons = false,
  lineStyle = "solid",
  nextButtonProperties,
  onActiveIndexUpdate,
  onChange,
  onComplete,
  previousButtonProperties,
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
      onActiveIndexUpdate?.(activeStepIndex + 1);
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
      onActiveIndexUpdate?.(activeStepIndex - 1);
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
          label="Previous"
          onClick={handlePrevious}
          variant="outlined"
          {...previousButtonProperties}
        />
        <Button
          label={activeStepIndex === steps.length - 1 ? "Finish" : "Next"}
          severity={
            activeStepIndex === steps.length - 1 ? "success" : "primary"
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
              activeContent={
                direction === "vertical" && activeStepIndex === index
                  ? renderActiveContent()
                  : null
              }
              index={index}
              isActive={activeStepIndex === index ? true : false}
              isCompleted={activeStepIndex > index ? true : false}
              lineStyle={lineStyle}
              onClick={onClick}
            />
          );
        })}
      </ul>

      {direction === "horizontal" ? renderActiveContent() : null}
    </div>
  );
};
