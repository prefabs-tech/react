import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Tag } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";
import "./index.css";

export const TagDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("tag.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("tag.usage.basic")}>
        <div className="demo-tag-container">
          <Tag label="default" />
        </div>
      </Section>

      <Section title={t("tag.usage.color")}>
        <div className="demo-tag-container">
          <Tag label="default" />
          <Tag color="gray" label="gray" />
          <Tag color="red" label="red" />
          <Tag color="pink" label="pink" />
          <Tag color="purple" label="purple" />
          <Tag color="blue" label="blue" />
          <Tag color="cyan" label="cyan" />
          <Tag color="green" label="green" />
          <Tag color="yellow" label="yellow" />
          <Tag color="orange" label="orange" />
          <Tag color="brown" label="brown" />
        </div>
      </Section>

      <Section title={t("tag.usage.pill")}>
        <div className="demo-tag-container">
          <Tag label="default" rounded />
          <Tag color="blue" icon="pi pi-times" label="blue" rounded />
        </div>
      </Section>

      <Section title={t("tag.usage.icon")}>
        <div className="demo-tag-container">
          <Tag color="green" icon="pi pi-check" label="green" />
          <Tag color="red" icon="pi pi-times" label="red" />
          <Tag icon="pi pi-user" />
        </div>
      </Section>

      <Section title={t("tag.usage.custom")}>
        <div className="demo-tag-container">
          <Tag
            color="#eddec8"
            renderContent={() => (
              <>
                <span>{t("tag.usage.custom")}</span>
                <i className="pi pi-user"></i>
              </>
            )}
          />
        </div>
      </Section>
    </Page>
  );
};
