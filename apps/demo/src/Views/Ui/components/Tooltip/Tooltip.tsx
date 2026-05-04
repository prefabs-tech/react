import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Tooltip } from "@prefabs.tech/react-ui";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { Section } from "../../../../components/Demo";

export const TooltipDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const rightReference = useRef(null);
  const leftReference = useRef(null);
  const topReference = useRef(null);
  const bottomReference = useRef(null);
  const buttonReference = useRef(null);
  const configuredReference = useRef(null);
  const mouseTrackReference = useRef(null);

  return (
    <Page
      title={t("tooltip.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <div className="tooltip-component">
          <Tooltip
            delay={100}
            elementRef={rightReference}
            offset={10}
            position="right"
          >
            Tooltip content
          </Tooltip>
          <div ref={rightReference}>{t("tooltip.position.right")}</div>

          <Tooltip delay={200} elementRef={leftReference} position="left">
            Tooltip content
          </Tooltip>
          <div ref={leftReference}>{t("tooltip.position.left")}</div>

          <Tooltip elementRef={topReference} offset={10} position="top">
            Tooltip content
          </Tooltip>
          <div ref={topReference}>{t("tooltip.position.top")}</div>

          <Tooltip elementRef={bottomReference} offset={10} position="bottom">
            Tooltip content
          </Tooltip>
          <div ref={bottomReference}>{t("tooltip.position.bottom")}</div>

          <Tooltip elementRef={buttonReference} offset={10} position="right">
            <i className="pi pi-check"></i>
            <span>Save</span>
          </Tooltip>
          <button className="button-save" ref={buttonReference}>
            Save
          </button>

          <Tooltip elementRef={mouseTrackReference} mouseTrack>
            Tooltip content
          </Tooltip>
          <div ref={mouseTrackReference}>
            {t("tooltip.position.mouseTrack")}
          </div>

          <Tooltip elementRef={configuredReference}>Tooltip content</Tooltip>
          <div ref={configuredReference}>
            {t("tooltip.position.configured")}
          </div>
        </div>
      </Section>
    </Page>
  );
};
