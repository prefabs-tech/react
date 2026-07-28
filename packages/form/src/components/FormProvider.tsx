import type { ZodType } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";

import { FormSubmitOptions } from "..";

interface IForm extends UseFormProps {
  children: React.ReactNode;
  className?: string;
  html5Validation?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any, options?: FormSubmitOptions) => any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: ZodType<any, any, any>;
  validationTriggerKey?: string;
}

export const Provider: React.FC<IForm> = ({
  children,
  className = "",
  html5Validation = false,
  onSubmit,
  validationSchema,
  validationTriggerKey,
  ...useFormOptions
}) => {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = async (data: any) => {
    try {
      const formSubmitOptions = {
        clearErrors: methods.clearErrors,
        reset: methods.reset,
        resetField: methods.resetField,
        setError: methods.setError,
      };

      await onSubmit(data, formSubmitOptions);
    } catch (error) {
      const { message, name } = error as Error;

      methods.setError(name, { message });
    }
  };

  useEffect(() => {
    if (
      validationTriggerKey &&
      methods.formState.submitCount > 0 &&
      !methods.formState.isValid
    ) {
      methods.trigger();
    }
  }, [validationTriggerKey]);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        noValidate={!html5Validation} // enable/disable default html5 validations
        onSubmit={methods.handleSubmit(handleOnSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
