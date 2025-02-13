import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { OtpField } from "~/components/form/otp-field";
import { PasswordField } from "~/components/form/password-field";
import { ButtonLoading } from "~/components/ui-extension/button-loading";

import { AUTH_URI } from "../constants";
import { ResetPasswordPayload, ResetPasswordSchema } from "../schemas";
import AuthCard from "./auth-card";

const ResetPassword = () => {
  const isPending = false;

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      // email: searchParams.get("email") ?? "",
      otp: "",
      password: "test123",
      passwordConfirmation: "test123",
    },
  });

  // const { execute, isPending } = useAction(resetPasswordAction, {
  // onError: ({ error }) => handleActionError(error, form),
  // onSuccess() {
  // toast.success("Password changed!");
  // },
  // });

  return (
    <AuthCard
      headerTitle="Enter a new password"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
    >
      <GenericForm {...form} onSubmit={console.log}>
        <div className="space-y-4">
          <PasswordField form={form} name="password" isPending={isPending} />
          <PasswordField
            form={form}
            name="passwordConfirmation"
            label="Password Confirmation"
            isPending={isPending}
          />
          <OtpField
            form={form}
            name="otp"
            label="OTP Code"
            isPending={isPending}
          />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Change Password
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};

export default ResetPassword;
