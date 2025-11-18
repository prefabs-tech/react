import React, { useState } from "react";

import { Button, DropdownMenu, MenuItem } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface DataActionsMenuItem
  extends Omit<MenuItem, "disabled" | "display" | "onClick"> {
  requireConfirmationModal?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arguments_: any) => void | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  confirmationOptions?: IModalProperties | ((data: any) => IModalProperties);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean | ((data: any) => boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  display?: boolean | ((data: any) => boolean);
}

export interface DataActionsMenuProperties<TData> {
  actions?: DataActionsMenuItem[];
  autoModeCount?: number;
  data?: TData;
  mode?: "auto" | "buttons" | "dropdown";
  displayActions?: boolean | ((data: TData) => boolean);
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
      (mode === "auto" && (actions?.length ?? 0) <= autoModeCount);

    const showDropdown =
      (mode === "dropdown" && items.length > 0) ||
      (mode === "auto" && (actions?.length ?? 0) > autoModeCount);

    if (showButtons) {
      return items
        .filter((item) => item?.display !== false)
        .map((item, index) => (
          <Button
            key={`action-${item?.key ?? index}`}
            iconLeft={item.icon}
            data-pr-tooltip={item.label}
            disabled={item.disabled}
            variant="textOnly"
            size="small"
            severity={item.severity}
            label={!item.icon ? item.label : ""}
            title={item.label}
            onClick={() => item.onClick?.()}
            rounded
          />
        ));
    }

    if (showDropdown) {
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
