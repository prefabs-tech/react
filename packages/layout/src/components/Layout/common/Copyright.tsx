import useConfig from "@/hooks/useConfig";

interface Properties {
  children?: React.ReactNode;
  defaultMessage?: string;
  holder?: string;
  url?: string;
  year?: number;
}

export const Copyright = ({
  children,
  defaultMessage = "All rights reserved",
  holder,
  url,
  year,
}: Properties) => {
  const appConfig = useConfig();

  const renderContent = () => {
    const _holder = holder || appConfig?.copyright?.holder;
    const _url = url || appConfig?.copyright?.url;
    const _year = year || new Date().getFullYear();

    if (_holder) {
      const holderElement = _url ? (
        <a href={_url} target="_blank" rel="noreferrer">
          {_holder}
        </a>
      ) : (
        _holder
      );

      return (
        <div className="dz-copyright">
          &copy; {_year} {holderElement}
        </div>
      );
    }

    return (
      <>
        &copy; {_year} {defaultMessage}
      </>
    );
  };

  return <div className="dz-copyright">{children || renderContent()}</div>;
};
