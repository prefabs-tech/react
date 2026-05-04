import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, GridContainer, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Package } from "../../Home/components/Package";

export const GridContainerDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  const packages = [
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      name: "Card 1",
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      name: "Card 2",
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      name: "Card 3",
    },

    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      name: "Card 4",
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      name: "Card 5",
    },
  ];

  return (
    <Page
      className="home"
      title={t("gridContainer.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <GridContainer>
        {packages.map((package_) => {
          return (
            <Package
              description={package_.description}
              key={package_.name}
              onClick={() => {}}
              title={package_.name}
            />
          );
        })}
      </GridContainer>
    </Page>
  );
};
