import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { AnyZodObject } from "zod";

import { FormSubmitOptions } from "..";

interface IForm extends UseFormProps {
  className?: string;
  children: React.ReactNode;
  validationSchema?: AnyZodObject;
  html5Validation?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any, options?: FormSubmitOptions) => unknown;
  validationTriggerKey?: string;
}

export const Provider: React.FC<IForm> = ({
  className = "",
  children,
  onSubmit,
  validationSchema,
  html5Validation = false,
  validationTriggerKey,
  ...useFormOptions
}) => {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  const handleOnSubmit = async (data: Record<string, unknown>) => {
    try {
      const formSubmitOptions = {
        clearErrors: methods.clearErrors,
        reset: methods.reset,
        resetField: methods.resetField,
        setError: methods.setError,
      };

      await onSubmit(data, formSubmitOptions);
    } catch (error) {
      const { name, message } = error as Error;

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
        onSubmit={methods.handleSubmit(handleOnSubmit)}
        noValidate={!html5Validation} // enable/disable default html5 validations
      >
        {children}
      </form>
    </FormProvider>
  );
};
