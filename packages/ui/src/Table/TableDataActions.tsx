import React, { useState } from "react";

import { Button, DropdownMenu, MenuItem } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface DataActionsMenuItem
  extends Omit<MenuItem, "disabled" | "display" | "onClick"> {
  requireConfirmationModal?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arguments_: any) => void | Promise<void>;
  confirmationOptions?: IModalProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean | ((data: any) => boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  display?: boolean | ((data: any) => boolean);
}

export interface DataActionsMenuProperties<TData> {
  actions?: DataActionsMenuItem[];
  data?: TData;
  mode?: "auto" | "buttons" | "menu";
  displayActions?: boolean | ((data: TData) => boolean);
}

export const DataActionsMenu = ({
  actions,
  data,
  displayActions = true,
  mode = "auto", // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: DataActionsMenuProperties<any>) => {
  const [confirmation, setConfirmation] = useState<IModalProperties | null>();

  const isVisibleActions =
    typeof displayActions === "function"
      ? displayActions(data)
      : displayActions;

  if (!isVisibleActions) {
    return null;
  }

  const items: MenuItem[] = actions
    ? actions
        .filter((action) => {
          if (typeof action.display === "function") {
            return action.display(data);
          } else if (typeof action.display === "boolean") {
            return action.display;
          } else {
            return true;
          }
        })
        .map((action) => ({
          ...action,
          disabled:
            typeof action.disabled === "function"
              ? action.disabled(data)
              : action.disabled,
          display:
            typeof action.display === "function"
              ? action.display(data)
              : action.display,
          onClick: () => {
            if (action.requireConfirmationModal) {
              setConfirmation({
                ...action.confirmationOptions,
                onHide: () => setConfirmation(null),
                accept: async () => {
                  await action.onClick?.(data);

                  setConfirmation(null);
                },
              });
            } else {
              action.onClick && action.onClick(data);
            }
          },
        }))
    : [];

  const renderActions = () => {
    if (!items?.length) return null;

    const showButtons =
      (mode === "buttons" && items.length > 0) ||
      (mode === "auto" && items.length === 1);

    const showMenu =
      (mode === "menu" && items.length > 0) ||
      (mode === "auto" && items.length > 1);

    if (showButtons) {
      return items
        .filter((item) => item?.display !== false)
        .map((item) => (
          <Button
            key={`action-mode-${item?.label}`}
            iconLeft={item.icon}
            data-pr-tooltip={item.label}
            disabled={item.disabled}
            variant="textOnly"
            size="small"
            severity={item.severity}
            title={item.label}
            onClick={() => item.onClick?.()}
            rounded
          />
        ));
    }

    if (showMenu) {
      return (
        <DropdownMenu
          label={<i className="pi pi-cog"></i>}
          menu={items}
          hideDropdownIcon
        />
      );
    }

    return null;
  };

  return (
    <>
      <div className="data-actions">{renderActions()}</div>
      {!!confirmation && (
        <ConfirmationModal {...confirmation} visible={!!confirmation} />
      )}
    </>
  );
};
