import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { InputField } from "~/components/form/input-field";
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
      <GenericForm {...form} onSubmit={console.log}>
        <div className="space-y-4">
          <InputField
            form={form}
            name="email"
            label="Email"
            isPending={isPending}
            type="email"
            placeholder="jhon@example.com"
          />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Send reset link
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};

export default ForgotPassword;
