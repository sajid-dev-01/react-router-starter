import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form as ActionForm } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ButtonLoading } from "~/components/ui-extension/button-loading";
import { InputPassword } from "~/components/ui-extension/input-password";

import { ConfirmPasswordPayload, ConfirmPasswordSchema } from "../schemas";
import AuthCard from "./auth-card";

const ConfirmPassword = () => {
  const isPending = false;

  const form = useForm<ConfirmPasswordPayload>({
    resolver: zodResolver(ConfirmPasswordSchema),
    defaultValues: {
      password: "123456",
      passwordConfirmation: "123456",
    },
  });

  // const { execute, isPending } = useAction(confirmPassAction, {
  //   onError: ({ error }) => handleActionError(error, form),
  //   onSuccess: () => {
  //     const callbackUrl = searchParams.get("callback-url");
  //
  //     if (callbackUrl) router.replace(callbackUrl);
  //   },
  // });

  return (
    <AuthCard headerTitle="Confirm your password">
      <Form {...form}>
        <ActionForm
          onSubmit={form.handleSubmit((v) => console.log(v))}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <InputPassword {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading type="submit" loading={isPending} className="w-full">
            Confirm
          </ButtonLoading>
        </ActionForm>
      </Form>
    </AuthCard>
  );
};

export default ConfirmPassword;
