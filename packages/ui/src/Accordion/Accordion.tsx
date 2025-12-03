import React, { useId, useState } from "react";

import type { ReactElement } from "react";

type Properties = {
  className?: string;
  children: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  direction?: "horizontal" | "vertical";
  activeIcon?: string;
  canSelfCollapse?: boolean;
  inactiveIcon?: string;
};

const Accordion: React.FC<Properties> = ({
  className = "",
  children,
  defaultActiveIndex,
  direction = "vertical",
  activeIcon,
  canSelfCollapse = false,
  inactiveIcon,
}) => {
  const id = useId();
  const [active, setActive] = useState(defaultActiveIndex);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleClick = (index: number) => {
    if (!canSelfCollapse || active !== index) setActive(index);
    else setActive(undefined);
  };

  if (!children) {
    throw new Error("Accordion needs at least one children");
  }

  return (
    <ul
      className={`accordion ${direction} ${className}`}
      aria-orientation={direction}
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
              aria-label={title}
              onClick={() => handleClick(index)}
              type="button"
              aria-disabled={!canSelfCollapse && isActive}
              aria-expanded={isActive}
            >
              {icon ? (
                <img src={icon} alt="title icon" aria-hidden="true" />
              ) : null}
              <span>{title}</span>
              {activeIcon && inactiveIcon ? (
                <img
                  src={isActive ? activeIcon : inactiveIcon}
                  alt="toggle icon"
                  aria-hidden="true"
                />
              ) : null}
            </button>

            <div role="region" id={bodyId}>
              <div className="content-wrapper">{childNodes[index]}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Accordion;
