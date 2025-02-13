import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { PasswordField } from "~/components/form/password-field";
import { ButtonLoading } from "~/components/ui-extension/button-loading";

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
      <GenericForm {...form} onSubmit={console.log}>
        <div className="space-y-4">
          <PasswordField form={form} name="password" isPending={isPending} />
          <PasswordField
            form={form}
            name="passwordConfirmation"
            label="Password Confirmation"
            isPending={isPending}
          />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Confirm
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};

export default ConfirmPassword;
