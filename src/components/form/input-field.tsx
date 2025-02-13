import { HTMLInputTypeAttribute } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  label: string;
  name: FieldPath<T>;
  isPending: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  isPending,
  type = "text",
  placeholder,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              placeholder={placeholder}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
