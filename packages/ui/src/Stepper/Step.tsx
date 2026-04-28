import { FC, MouseEvent, ReactNode } from "react";

export interface IStepEvent extends MouseEvent<HTMLElement> {
  index?: number;
  label?: string;
}

export type LineStyleType = "dashed" | "solid";

interface IStepProperties {
  activeContent?: ReactNode | string;
  completedStepIcon?: ReactNode | string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  label?: string;
  lineStyle?: LineStyleType;
  onClick: (event: IStepEvent) => void;
  step?: number | ReactNode | string;
  subtitle?: string;
}

export const Step: FC<IStepProperties> = ({
  activeContent,
  completedStepIcon,
  index,
  isActive,
  isCompleted,
  label,
  lineStyle,
  onClick,
  step,
  subtitle,
}) => {
  const renderLabel = (label?: string) => {
    if (!label) {
      return null;
    }

    return (
      <span className={`step-label ${isActive ? "active" : ""} `}>{label}</span>
    );
  };

  const renderSubtitle = (subtitle?: string) => {
    if (!subtitle) {
      return null;
    }

    return (
      <span className={`step-subtitle ${isActive ? "active" : ""} `}>
        {subtitle}
      </span>
    );
  };

  const renderStep = (
    index: number,
    completedStepIcon?: ReactNode | string,
  ) => {
    const renderContent = () => {
      if (isCompleted && completedStepIcon) {
        if (typeof completedStepIcon !== "string") {
          return completedStepIcon;
        }

        return <i className={completedStepIcon} />;
      }

      return step || index + 1;
    };

    return (
      <span
        className={`step-number ${isActive ? "active" : ""} ${
          isCompleted ? "completed" : ""
        } `}
      >
        {renderContent()}
      </span>
    );
  };

  const handleClick = (event: IStepEvent) => {
    onClick(event);
  };

  return (
    <li
      className={`step ${lineStyle}`}
      key={index}
      onClick={(event) => {
        handleClick({ ...event, index, label: label });
      }}
    >
      {renderStep(index, completedStepIcon)}

      <div className="step-content-wrapper">
        {renderLabel(label)}
        {renderSubtitle(subtitle)}
        {activeContent}
      </div>
    </li>
  );
};
