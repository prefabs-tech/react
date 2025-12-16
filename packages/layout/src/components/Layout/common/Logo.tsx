import React, { useMemo } from "react";
import { Link, useInRouterContext } from "react-router-dom";

import useConfig from "@/hooks/useConfig";

interface Properties {
  alt?: string;
  children?: React.ReactNode;
  route?: string;
  src?: string;
}

export const Logo = ({ alt, children, route, src }: Properties) => {
  const { appName, layout: layoutConfig } = useConfig();

  const hasRouterContext = useInRouterContext();

  const parseLogoAlt = useMemo(() => {
    if (!appName) {
      return;
    }

    return appName.replace("@", "").replace("/", " ");
  }, [appName]);

  const _route = route || layoutConfig?.logoRoute || "/";
  const _source = src || layoutConfig?.logo;
  const _alt = alt || layoutConfig?.logoAlt || parseLogoAlt || "My app";

  const renderLogo = () => {
    if (_source) {
      return <img src={_source} alt={_alt} />;
    }

    return (
      <span className="logo-default">
        <span>{_alt[0]}</span>
        <span>{_alt}</span>
      </span>
    );
  };

  const renderContent = () => {
    return (
      <>
        {hasRouterContext ? (
          <Link to={_route}>{renderLogo()}</Link>
        ) : (
          <a href={_route}>{renderLogo()}</a>
        )}
      </>
    );
  };

  return <div className="dz-logo">{children || renderContent()}</div>;
};
