import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ButtonLoading } from "~/components/ui-extension/button-loading";

import { AUTH_URI } from "../constants";
import { ForgotPasswordPayload, ForgotPasswordSchema } from "../schemas";
import AuthCard from "./auth-card";

const ForgotPassword = () => {
  const isPending = false;

  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "test@test.com",
    },
  });

  // const { execute, isPending } = useAction(forgotPasswordAction, {
  //   onError: ({ error }) => handleActionError(error, form),
  //   onSuccess: () => {
  //     router.push(`${AUTH_URI.resetPassword}?email=${form.getValues("email")}`);
  //   },
  // });

  return (
    <AuthCard
      headerTitle="Forgot your password?"
      buttonLabel="Back to login"
      buttonHref={AUTH_URI.signIn}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => console.log(v))}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading type="submit" loading={isPending} className="w-full">
            Send reset link
          </ButtonLoading>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ForgotPassword;
