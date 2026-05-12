import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";
import YoutubeFacade from "./YoutubeFacade";

export const YoutubeFacadeDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("youtubeFacade.title")}
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
        <div style={{ width: "50%" }}>
          <YoutubeFacade
            alt="Video alt"
            aspectRatio="16/9"
            videoLink="https://www.youtube.com/watch?v=zhnIruPa0XI"
            videoToken="zhnIruPa0XI"
          />
        </div>
      </Section>
    </Page>
  );
};
