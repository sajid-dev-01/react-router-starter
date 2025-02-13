import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitHandler,
} from "react-hook-form";

interface Props<T extends FieldValues = FieldValues>
  extends FormProviderProps<T> {
  onSubmit: SubmitHandler<T>;
}

export const GenericForm = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...props}>
      <form onSubmit={props.handleSubmit(onSubmit)} className="space-y-6">
        {children}
      </form>
    </FormProvider>
  );
};
