interface IHeaderProperties {
  breadcrumb?: React.ReactNode;
  subtitle?: React.ReactNode | string;
  title?: React.ReactNode | string;
  titleTag?: React.ReactNode | string;
  toolbar?: React.ReactNode;
}

export const PageHeader = ({
  breadcrumb,
  subtitle,
  title,
  titleTag,
  toolbar,
}: IHeaderProperties) => {
  const renderTitle = () => {
    if (!title) {
      return null;
    }

    if (typeof title === "string") {
      return (
        <h1>
          {title}
          {titleTag && <span>{titleTag}</span>}
        </h1>
      );
    }

    return title;
  };

  return (
    <div className="dz-page-header">
      <div className="dz-page-title-wrapper">
        {renderTitle()}
        {subtitle && (
          <div className="dz-page-subtitle" data-testid="page-subtitle">
            {subtitle}
          </div>
        )}
      </div>
      {(breadcrumb || toolbar) && (
        <div
          className="dz-page-toolbar"
          data-breadcrumb={!!breadcrumb}
          data-testid="page-toolbar"
        >
          {breadcrumb}
          {toolbar}
        </div>
      )}
    </div>
  );
};
