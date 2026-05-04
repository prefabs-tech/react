import type { ReactElement } from "react";

import React, { useId, useState } from "react";

type Properties = {
  activeIcon?: React.ReactNode | string;
  canSelfCollapse?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
  defaultActiveIndex?: number;
  direction?: "horizontal" | "vertical";
  inactiveIcon?: React.ReactNode | string;
};

const Accordion: React.FC<Properties> = ({
  activeIcon,
  canSelfCollapse = false,
  children,
  className = "",
  defaultActiveIndex,
  direction = "vertical",
  inactiveIcon,
}) => {
  const id = useId();
  const [active, setActive] = useState(defaultActiveIndex);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleClick = (index: number) => {
    if (!canSelfCollapse || active !== index) {
      setActive(index);
    } else {
      setActive(undefined);
    }
  };

  if (!children) {
    throw new Error("Accordion needs at least one children");
  }

  const renderIcon = (icon: React.ReactNode | string) => {
    if (!icon) {
      return null;
    }

    if (typeof icon === "string") {
      return <i className={icon} />;
    }

    return icon;
  };

  return (
    <ul
      aria-orientation={direction}
      className={`accordion ${direction} ${className}`}
    >
      {childNodes.map((item, index) => {
        const isActive = active === index;
        const key = `${id}-${index}`;
        const bodyId = `pane-body-${key}`;
        const title = item.props.title;
        const icon = item.props.icon;

        return (
          <li className={isActive ? "active" : ""} key={key}>
            <button
              aria-controls={bodyId}
              aria-disabled={!canSelfCollapse && isActive}
              aria-expanded={isActive}
              aria-label={title}
              onClick={() => handleClick(index)}
              type="button"
            >
              {icon ? renderIcon(icon) : null}
              <span>{title}</span>
              {activeIcon && inactiveIcon
                ? isActive
                  ? renderIcon(activeIcon)
                  : renderIcon(inactiveIcon)
                : null}
            </button>

            <div id={bodyId} role="region">
              <div className="content-wrapper">{childNodes[index]}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Accordion;
