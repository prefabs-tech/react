import React, { useState } from "react";

import { Button, DropdownMenu, MenuItem } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface DataActionsMenuItem extends Omit<
  MenuItem,
  "disabled" | "display" | "onClick"
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  confirmationOptions?: ((data: any) => IModalProperties) | IModalProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: ((data: any) => boolean) | boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  display?: ((data: any) => boolean) | boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arguments_: any) => Promise<void> | void;
  requireConfirmationModal?: boolean;
}

export interface DataActionsMenuProperties<TData> {
  actions?: DataActionsMenuItem[];
  autoModeCount?: number;
  data?: TData;
  displayActions?: ((data: TData) => boolean) | boolean;
  mode?: "auto" | "buttons" | "dropdown";
}

export const DataActionsMenu = ({
  actions,
  autoModeCount = 1,
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
                ...(typeof action.confirmationOptions === "function"
                  ? action.confirmationOptions(data)
                  : action.confirmationOptions),
                accept: async () => {
                  await action.onClick?.(data);

                  setConfirmation(null);
                },
                onHide: () => setConfirmation(null),
              });
            } else {
              action.onClick && action.onClick(data);
            }
          },
        }))
    : [];

  const renderActions = () => {
    if (!items?.length) {
      return null;
    }

    const showButtons =
      (mode === "buttons" && items.length > 0) ||
      (mode === "auto" && (actions?.length ?? 0) <= autoModeCount);

    const showDropdown =
      (mode === "dropdown" && items.length > 0) ||
      (mode === "auto" && (actions?.length ?? 0) > autoModeCount);

    if (showButtons) {
      return items
        .filter((item) => item?.display !== false)
        .map((item, index) => (
          <Button
            data-pr-tooltip={item.label}
            disabled={item.disabled}
            iconLeft={item.icon}
            key={`action-${item?.key ?? index}`}
            label={!item.icon ? item.label : ""}
            onClick={() => item.onClick?.()}
            rounded
            severity={item.severity}
            size="small"
            title={item.label}
            variant="textOnly"
          />
        ));
    }

    if (showDropdown) {
      return (
        <DropdownMenu
          hideDropdownIcon
          label={<i className="pi pi-cog"></i>}
          menu={items}
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
