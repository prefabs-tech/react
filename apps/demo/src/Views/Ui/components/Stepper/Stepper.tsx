import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Stepper, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

import { Section } from "../../../../components/Demo";

export const StepperDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const list = [
    {
      step: "a",
      completedStepIcon: <i className="pi pi-check" />,
      label: "Personal",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Children",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Payment",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Confirmation",
    },
  ];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return "Please enter personal details";
      case 1:
        return "Please enter family details";
      case 2:
        return "Please enter payment details";
      case 3:
        return "Do you wish to continue?";
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < list.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Page
      title={t("stepper.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Stepper
          steps={list}
          activeIndex={activeIndex}
          readOnly={true}
          onChange={(event: any) => {
            setActiveIndex(event.index);
          }}
          align="start"
        />
        <div className="demo-stepper-content-wrapper">
          {renderStepContent(activeIndex)}
        </div>
        <div className="demo-stepper-button-wrapper">
          <Button
            onClick={handlePrevious}
            label="Previous"
            variant="outlined"
          />
          <Button onClick={handleNext} label="Next" />
        </div>
      </Section>
    </Page>
  );
};
