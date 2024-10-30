"use client";

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IConfig {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

interface IProps extends IConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const ECform = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: IConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ECform;
