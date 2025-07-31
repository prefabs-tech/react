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
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
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
          <Tag label="gray" color="gray" />
          <Tag label="red" color="red" />
          <Tag label="pink" color="pink" />
          <Tag label="purple" color="purple" />
          <Tag label="blue" color="blue" />
          <Tag label="cyan" color="cyan" />
          <Tag label="green" color="green" />
          <Tag label="yellow" color="yellow" />
          <Tag label="orange" color="orange" />
          <Tag label="brown" color="brown" />
        </div>
      </Section>

      <Section title={t("tag.usage.pill")}>
        <div className="demo-tag-container">
          <Tag label="default" rounded />
          <Tag label="blue" color="blue" icon="pi pi-times" rounded />
        </div>
      </Section>

      <Section title={t("tag.usage.icon")}>
        <div className="demo-tag-container">
          <Tag label="green" icon="pi pi-check" color="green" />
          <Tag label="red" icon="pi pi-times" color="red" />
          <Tag icon="pi pi-user" />
        </div>
      </Section>

      <Section title={t("tag.usage.custom")}>
        <div className="demo-tag-container">
          <Tag
            renderContent={() => (
              <>
                <span>{t("tag.usage.custom")}</span>
                <i className="pi pi-user"></i>
              </>
            )}
            color="#eddec8"
          />
        </div>
      </Section>
    </Page>
  );
};
