import { NavigationMenu } from "@prefabs.tech/react-ui";
import { ReactNode, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  children?: ReactNode;
  isGrouped?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subnav: Array<any>;
}

export const Demo: React.FC<Properties> = ({
  children,
  isGrouped = false,
  subnav,
}) => {
  const demoMainReference = useRef<HTMLDivElement | null>(null);

  const subnavigationMenu = useMemo(() => {
    if (isGrouped) {
      return <NavigationMenu navigationMenu={{ menu: subnav }} />;
    }

    return (
      <ul>
        {subnav.map((nav) => {
          return (
            <li key={nav.route}>
              <NavLink end to={nav.route}>
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
      <div className="demo-main" ref={demoMainReference}>
        {children}
      </div>
    </div>
  );
};
