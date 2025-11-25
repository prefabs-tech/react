import { ReactNode, useEffect, useState } from "react";

import { Button, IButtonProperties } from "../Buttons";
import { IStepEvent, LineStyleType, AlignType, Step } from "./Step";

type StepItem = {
  activeStepIcon?: string | ReactNode;
  content?: string | ReactNode;
  label?: string;
  step?: number | string | ReactNode;
};

interface IProperties {
  controlled?: boolean;
  activeIndex?: number;
  onChange?: (event: IStepEvent) => void;
  previousButtonProperties?: IButtonProperties;
  nextButtonProperties?: IButtonProperties;
  readOnly?: boolean;
  lineStyle?: LineStyleType;
  steps: StepItem[];
  align?: AlignType;
  onComplete?: () => void;
}

export const Stepper: React.FC<IProperties> = ({
  align = "center",
  controlled = false,
  lineStyle = "solid",
  activeIndex = 0,
  onChange,
  onComplete,
  previousButtonProperties,
  nextButtonProperties,
  readOnly = true,
  steps = [],
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [disablePrevious, setDisablePrevious] = useState<boolean>(true);

  useEffect(() => {
    if (controlled) {
      setActiveStepIndex(activeIndex);
    }
  });

  useEffect(() => {
    if (activeStepIndex === 0) {
      setDisablePrevious(true);
    } else {
      setDisablePrevious(false);
    }
  }, [activeStepIndex]);

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
          disabled={disablePrevious}
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

  return (
    <div className="stepper">
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
            />
          );
        })}
      </ul>

      {!controlled && renderContent()}
      {!controlled && renderButtons()}
    </div>
  );
};
