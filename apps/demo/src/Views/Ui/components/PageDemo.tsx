import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Tag } from "@prefabs.tech/react-ui";

export const PageDemo = () => {
  const [t] = useTranslation("ui");

  const PageContent = <div style={{ height: "20vh" }}>{t("page.content")}</div>;
  const breadcrumb = (
    <Button
      iconLeft={<i className="pi pi-chevron-left"></i>}
      label={t("page.breadcrumb.back")}
      variant="textOnly"
    />
  );

  return (
    <>
      <Page title={t("page.title.basic")}>{PageContent}</Page>

      <hr />
      <Page
        children={PageContent}
        title={t("page.title.toolbar")}
        toolbar={<Button label={t("page.toolbar.edit")} />}
      />

      <hr />
      <Page
        centered={true}
        children={PageContent}
        title={t("page.title.centerAligned")}
        toolbar={<Button label={t("page.toolbar.edit")} />}
      />

      <hr />
      <Page
        children={PageContent}
        subtitle={t("page.subTitle.title")}
        title={t("page.title.stringSubtitle")}
      />

      <hr />
      <Page
        children={PageContent}
        subtitle={<Tag label={t("page.subTitle.tag")} />}
        title={t("page.title.componentSubtitle")}
      />

      <hr />
      <Page
        breadcrumb={breadcrumb}
        children={PageContent}
        title={t("page.title.breadcrumb")}
      />

      <hr />
      <Page
        breadcrumb={breadcrumb}
        children={PageContent}
        subtitle={<Tag label={t("page.subTitle.tag")} />}
        title={t("page.title.complete")}
        titleTag={<Tag label={t("page.heading.tag")} />}
        toolbar={
          <>
            <Button
              label={t("page.toolbar.button.label")}
              severity="secondary"
            />
            <Button label={t("page.toolbar.edit")} />
          </>
        }
      />
    </>
  );
};
