import React, { useMemo } from "react";

import { Popup, PopupProperties } from "../Popup";
import Menu, { MenuProperties } from "./Menu";

export interface DropdownMenuProperties
  extends MenuProperties, Partial<Omit<PopupProperties, "content">> {
  hideDropdownIcon?: boolean;
  label?: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProperties> = ({
  close,
  hideDropdownIcon = false,
  isControlled,
  isOpen,
  label,
  offset,
  position = "bottom-start",
  toggle,
  trigger,
  ...others
}) => {
  const defaultTrigger = useMemo(() => {
    return (
      <span className="dropdown-menu-trigger">
        {label ? <span>{label}</span> : <i className="pi pi-ellipsis-h"></i>}
        {!hideDropdownIcon && (
          <i className="dropdown-icon pi pi-angle-down"></i>
        )}
      </span>
    );
  }, [label]);

  return (
    <Popup
      className={`dropdown-menu ${others.className || ""}`.trimEnd()}
      close={close}
      content={<Menu {...others} />}
      isControlled={isControlled}
      isOpen={isOpen}
      offset={offset}
      position={position}
      toggle={toggle}
      trigger={trigger || defaultTrigger}
    />
  );
};

export default DropdownMenu;
