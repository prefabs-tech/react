import React from "react";

import { Button, DropdownMenu, IButtonProperties, MenuItem } from "..";

export interface ActionsMenuItem
  extends Omit<MenuItem, "onClick">,
    Partial<IButtonProperties> {
  iconOnly?: boolean;
  onClick?: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export interface ToolbarActionsMenuProperties {
  actions?: ActionsMenuItem[];
}

export const ToolbarActions = ({ actions }: ToolbarActionsMenuProperties) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  if (actions.length > 1) {
    return <DropdownMenu menu={actions} hideDropdownIcon />;
  }

  const [{ icon, iconLeft, iconRight, label, onClick, variant }] = actions;

  const buttonIcon = icon ?? iconLeft ?? iconRight;

  return (
    <Button
      iconLeft={buttonIcon}
      data-pr-tooltip={label}
      label={!buttonIcon ? label : undefined}
      onClick={onClick}
      variant={variant}
    />
  );
};
