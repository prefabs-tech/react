import { ReactNode, useState } from "react";

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
      setDisablePrevious(false);
    } else {
      setDisablePrevious(true);
    }
  };

  const renderContent = () => {
    return steps.forEach((step, index) => {
      if (index === activeStepIndex && step?.content) {
        return <div className="content">{step?.content}</div>;
      }
    });
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
    <>
      <ul className="stepper">
        {steps.map((element, index) => {
          return (
            <Step
              key={index}
              {...element}
              index={index}
              lineStyle={lineStyle}
              onClick={onClick}
              isCompleted={activeIndex > index ? true : false}
              isActive={activeIndex === index ? true : false}
              align={align}
            />
          );
        })}
      </ul>

      {!controlled && renderContent()}
      {!controlled && renderButtons()}
    </>
  );
};
