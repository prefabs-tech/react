import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, SortableList } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const SortableListDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("sortableList.title")}
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
        <SortableList
          items={[
            { data: "Item 1", id: 1 },
            { data: "Item 2", id: 2 },
            { data: "Item 3", id: 3 },
          ]}
        />
      </Section>
    </Page>
  );
};
