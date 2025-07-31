import { useTranslation } from "@prefabs.tech/react-i18n";
import { SortableList, Page, Button } from "@prefabs.tech/react-ui";
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
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <SortableList
          items={[
            { id: 1, data: "Item 1" },
            { id: 2, data: "Item 2" },
            { id: 3, data: "Item 3" },
          ]}
        />
      </Section>
    </Page>
  );
};
