interface HeaderTitleProperties {
  children?: React.ReactNode;
  title?: React.ReactNode | string;
}

export const HeaderTitle = ({ children, title }: HeaderTitleProperties) => {
  const renderContent = () => {
    return <span>{title}</span>;
  };

  return <div className="dz-header-title">{children || renderContent()}</div>;
};
