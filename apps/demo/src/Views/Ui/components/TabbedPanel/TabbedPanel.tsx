import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { Message } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock } from "../../../../components/Demo";
import { Section } from "../../../../components/Demo";
import {
  Basic,
  CustomActive,
  DisableStatePersistence,
  PositionBottom,
  PositionLeft,
  PositionRight,
} from "./components";

export const TabbedPanelDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("tabbedPanel.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Message
        enableClose={false}
        message="@deprecated: Use TabView component from the ui package instead"
      />
      <Section title={t("tabbedPanel.usage.basic")}>
        <Basic />
        <CodeBlock
          exampleCode={Basic({ isString: true }) as string}
        ></CodeBlock>
      </Section>
      <Section title={t("tabbedPanel.usage.customActiveTab")}>
        <CustomActive />
        <CodeBlock
          exampleCode={CustomActive({ isString: true }) as string}
        ></CodeBlock>
      </Section>
      <Section title={t("tabbedPanel.usage.disableTabState.title")}>
        <p>{t("tabbedPanel.usage.disableTabState.subTitle")}</p>
        <DisableStatePersistence />
        <CodeBlock
          exampleCode={DisableStatePersistence({ isString: true }) as string}
        ></CodeBlock>
      </Section>
      <Section title={t("tabbedPanel.usage.positionBottom")}>
        <PositionBottom />
        <CodeBlock
          exampleCode={PositionBottom({ isString: true }) as string}
        ></CodeBlock>
      </Section>
      <Section title={t("tabbedPanel.usage.positionLeft")}>
        <PositionLeft />
        <CodeBlock
          exampleCode={PositionLeft({ isString: true }) as string}
        ></CodeBlock>
      </Section>
      <Section title={t("tabbedPanel.usage.positionRight")}>
        <PositionRight />
        <CodeBlock
          exampleCode={PositionRight({ isString: true }) as string}
        ></CodeBlock>
      </Section>
    </Page>
  );
};
