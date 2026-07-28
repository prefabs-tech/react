import type { ZodType } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Children, createElement } from "react";
import { useForm, UseFormProps } from "react-hook-form";

interface IForm extends UseFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
  html5Validation?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: ZodType<any, any, any>;
}

export const Form: React.FC<IForm> = ({
  children,
  className = "",
  html5Validation = false,
  mode,
  onSubmit,
  validationSchema,
  ...useFormOptions
}) => {
  const {
    formState: { submitCount },
    getFieldState,
    handleSubmit,

    register,
  } = useForm({
    mode: mode,
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  return (
    <form
      className={className}
      noValidate={!html5Validation} // enable/disable default html5 validations
      onSubmit={handleSubmit(onSubmit)}
    >
      {Children.map(children, (child) => {
        return child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                getFieldState,
                key: child.props.name,
                register,
                submitCount: submitCount,
              },
            })
          : child;
      })}
    </form>
  );
};
