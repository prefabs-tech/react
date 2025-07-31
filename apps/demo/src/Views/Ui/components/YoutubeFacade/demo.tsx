import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import YoutubeFacade from "./YoutubeFacade";
import { Section } from "../../../../components/Demo";

export const YoutubeFacadeDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("youtubeFacade.title")}
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
        <div style={{ width: "50%" }}>
          <YoutubeFacade
            videoLink="https://www.youtube.com/watch?v=zhnIruPa0XI"
            videoToken="zhnIruPa0XI"
            aspectRatio="16/9"
            alt="Video alt"
          />
        </div>
      </Section>
    </Page>
  );
};
