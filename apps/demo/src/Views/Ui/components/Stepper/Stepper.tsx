import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Divider, Stepper, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

import { Section } from "../../../../components/Demo";

export const StepperDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [verticalStepperIndex, setVerticalStepperIndex] = useState(0);
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

  const steps = [
    {
      completedStepIcon: "pi pi-check",
      content: "Please enter your personal details",
      label: "Personal",
      step: 1,
      subtitle: "Personal information",
    },
    {
      completedStepIcon: "pi pi-check",
      content: "Please enter your contact details",
      label: "Contact",
      step: 2,
      subtitle: "Contact information",
    },
    {
      completedStepIcon: "pi pi-check",
      content: "Please enter your payment details",
      label: "Payment",
      step: 3,
      subtitle: "Payment information",
    },
    {
      completedStepIcon: "pi pi-check",
      content: "Confirm your details",
      label: "Confirmation",
      step: 4,
      subtitle: "Confirm your details",
    },
  ];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <h3>Personal details</h3>;
      case 1:
        return <h3>Family details</h3>;
      case 2:
        return <h3>Payment details</h3>;
      case 3:
        return <h3>Confirm submit</h3>;
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

  const handleStepperPrevious = () => {
    if (verticalStepperIndex > 0) {
      setVerticalStepperIndex(verticalStepperIndex - 1);
    }
  };

  const handleStepperNext = () => {
    if (verticalStepperIndex < list.length - 1) {
      setVerticalStepperIndex(verticalStepperIndex + 1);
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
      <Section title={t("stepper.usage.basic")}>
        <Stepper steps={steps} align="start" />
      </Section>

      <Section title={t("stepper.usage.vertical")}>
        <Stepper steps={steps} align="start" direction="vertical" />
      </Section>

      <Section title={t("stepper.usage.controlled")}>
        <Stepper
          steps={list}
          hideButtons={true}
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

      <Section title={t("stepper.usage.verticalControlled")}>
        <div className="demo-stepper-wrapper">
          <Stepper
            activeIndex={verticalStepperIndex}
            align="start"
            direction="vertical"
            hideButtons
            steps={steps}
          />
          <Divider orientation="vertical" />
          <div className="demo-stepper-content-actions">
            <div className="demo-stepper-content-wrapper">
              {renderStepContent(verticalStepperIndex)}
            </div>
            <div className="demo-stepper-button-wrapper">
              <Button
                onClick={handleStepperPrevious}
                label={t("stepper.label.previous")}
                variant="outlined"
              />
              <Button
                onClick={handleStepperNext}
                label={t("stepper.label.next")}
              />
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
};
