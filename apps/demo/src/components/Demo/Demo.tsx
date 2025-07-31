import { NavigationMenu } from "@prefabs.tech/react-ui";
import { ReactNode, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  subnav: Array<any>;
  children?: ReactNode;
  isGrouped?: boolean;
}

export const Demo: React.FC<Properties> = ({
  subnav,
  children,
  isGrouped = false,
}) => {
  const demoMainReference = useRef<HTMLDivElement | null>(null);

  const subnavigationMenu = useMemo(() => {
    if (isGrouped) {
      return <NavigationMenu navigationMenu={{ menu: subnav }} />;
    }

    return (
      <ul>
        {subnav.map((nav: any) => {
          return (
            <li key={nav.route}>
              <NavLink to={nav.route} end>
                {nav.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }, [subnav, isGrouped]);

  return (
    <div className="demo">
      <div className="demo-aside">{subnavigationMenu}</div>
      <div ref={demoMainReference} className="demo-main">
        {children}
      </div>
    </div>
  );
};
