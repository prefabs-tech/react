import { Button, IButtonProperties } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";

interface FormActionsProperties {
  actions?: IButtonProperties[];
  alignment?: "center" | "left" | "right" | "fill";
  className?: string;
  flowDirection?: "horizontal" | "vertical";
  loading?: boolean;
  reverse?: boolean;
}

export const FormActions = ({
  actions,
  alignment = "right",
  className,
  flowDirection = "horizontal",
  loading,
  reverse = false,
}: FormActionsProperties) => {
  const defaultActions: IButtonProperties[] = [
    {
      id: "submit",
      label: "Submit",
      loading: loading,
      type: "submit",
    },
    {
      id: "cancel",
      label: "Cancel",
      loading: loading,
      severity: "secondary",
      variant: "outlined",
    },
  ];

  const parsedActions: IButtonProperties[] = useMemo(() => {
    if (!actions) {
      return defaultActions;
    }

    const mappedActions = new Map<string, IButtonProperties>();

    for (const action of actions) {
      mappedActions.set(action.id || action.label || "", action);
    }

    for (const defaultAction of defaultActions) {
      if (mappedActions.get(defaultAction.id || defaultAction.label || "")) {
        const previousAction = mappedActions.get(
          defaultAction.id || defaultAction.label || "",
        );

        mappedActions.set(defaultAction.id || defaultAction.label || "", {
          ...defaultAction,
          ...previousAction,
        });
      }
    }

    return Array.from(mappedActions.values());
  }, [actions]);

  return (
    <div
      className={`dz-form-actions ${className || ""}`.trimEnd()}
      data-alignment={alignment}
      data-direction={flowDirection}
      data-reverse={reverse}
    >
      {parsedActions.map(({ id, label, ...action }) => {
        return <Button key={id || label} label={label} {...action} />;
      })}
    </div>
  );
};
