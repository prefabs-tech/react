import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Divider, Page, Stepper } from "@prefabs.tech/react-ui";
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
      completedStepIcon: <i className="pi pi-check" />,
      label: "Personal",
      step: "a",
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
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("stepper.usage.basic")}>
        <Stepper align="start" steps={steps} />
      </Section>

      <Section title={t("stepper.usage.vertical")}>
        <Stepper align="start" direction="vertical" steps={steps} />
      </Section>

      <Section title={t("stepper.usage.controlled")}>
        <Stepper
          activeIndex={activeIndex}
          align="start"
          hideButtons={true}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => {
            setActiveIndex(event.index);
          }}
          readOnly={true}
          steps={list}
        />
        <div className="demo-stepper-content-wrapper">
          {renderStepContent(activeIndex)}
        </div>
        <div className="demo-stepper-button-wrapper">
          <Button
            label="Previous"
            onClick={handlePrevious}
            variant="outlined"
          />
          <Button label="Next" onClick={handleNext} />
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
                label={t("stepper.label.previous")}
                onClick={handleStepperPrevious}
                variant="outlined"
              />
              <Button
                label={t("stepper.label.next")}
                onClick={handleStepperNext}
              />
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
};
