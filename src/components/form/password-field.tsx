import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputPassword } from "../ui-extension/input-password";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  name: FieldPath<T>;
  isPending: boolean;
  label?: string;
  placeholder?: string;
}
export const PasswordField = <T extends FieldValues = FieldValues>({
  form,
  name,
  isPending,
  label = "Password",
  placeholder = "Emter your password",
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputPassword
              {...field}
              disabled={isPending}
              placeholder={placeholder}
              type="password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
