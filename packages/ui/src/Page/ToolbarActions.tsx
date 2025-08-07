import React, { useState } from "react";

import { Button, DropdownMenu, IButtonProperties, MenuItem } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface ActionsMenuItem
  extends Omit<MenuItem, "onClick">,
    Partial<IButtonProperties> {
  requireConfirmationModal?: boolean;
  onClick?: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export interface ToolbarActionsMenuProperties {
  actions?: ActionsMenuItem[];
}

export const ToolbarActions = ({ actions }: ToolbarActionsMenuProperties) => {
  const [confirmation, setConfirmation] = useState<IModalProperties | null>();

  const renderActions = () => {
    if (!actions || !actions.length) {
      return null;
    }

    if (actions.length > 1) {
      return <DropdownMenu menu={actions} hideDropdownIcon />;
    }

    const [{ icon, iconLeft, iconRight, label, onClick, disabled, variant }] =
      actions;

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

  return (
    <>
      {renderActions()}
      {!!confirmation && (
        <ConfirmationModal {...confirmation} visible={!!confirmation} />
      )}
    </>
  );
};
