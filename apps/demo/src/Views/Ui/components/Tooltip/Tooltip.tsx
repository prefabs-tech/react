import { useTranslation } from "@prefabs.tech/react-i18n";
import { Tooltip, Page, Button } from "@prefabs.tech/react-ui";
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
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <div className="tooltip-component">
          <Tooltip
            elementRef={rightReference}
            offset={10}
            delay={100}
            position="right"
          >
            Tooltip content
          </Tooltip>
          <div ref={rightReference}>{t("tooltip.position.right")}</div>

          <Tooltip elementRef={leftReference} position="left" delay={200}>
            Tooltip content
          </Tooltip>
          <div ref={leftReference}>{t("tooltip.position.left")}</div>

          <Tooltip elementRef={topReference} position="top" offset={10}>
            Tooltip content
          </Tooltip>
          <div ref={topReference}>{t("tooltip.position.top")}</div>

          <Tooltip elementRef={bottomReference} position="bottom" offset={10}>
            Tooltip content
          </Tooltip>
          <div ref={bottomReference}>{t("tooltip.position.bottom")}</div>

          <Tooltip elementRef={buttonReference} position="right" offset={10}>
            <i className="pi pi-check"></i>
            <span>Save</span>
          </Tooltip>
          <button ref={buttonReference} className="button-save">
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
