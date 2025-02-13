import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { InputField } from "~/components/form/input-field";
import { PasswordField } from "~/components/form/password-field";
import { ButtonLoading } from "~/components/ui-extension/button-loading";
import { siteConfig } from "~/site-config";

import { AUTH_URI } from "../constants";
import { SignUpPayload, SignUpSchema } from "../schemas";
import AuthCard from "./auth-card";

const SignUp = () => {
  const isPending = false;

  const form = useForm<SignUpPayload>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "Sajid",
      email: "test@test.com",
      password: "123456",
    },
  });

  // const { execute, isPending } = useAction(signUpAction, {
  //   onError: ({ error }) => handleActionError(error, form),
  //   onSuccess: () => {
  //     toast.success("Sign up successfull!");
  //     router.push(`${AUTH_URI.verifyEmail}?email=${form.getValues("email")}`);
  //   },
  // });

  function handleSubmit(data: SignUpPayload) {
    console.log(data);
  }

  return (
    <AuthCard
      headerTitle={`Register to ${siteConfig.name}`}
      headerDesc="Choose your preferred sign up method"
      buttonLabel="Already have an account?"
      buttonHref={AUTH_URI.signIn}
      showSocial
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            form={form}
            name="name"
            label="Name"
            isPending={isPending}
            placeholder="Jhon Doe"
          />
          <InputField
            form={form}
            name="email"
            label="Email"
            isPending={isPending}
            type="email"
            placeholder="jhon@example.com"
          />
          <PasswordField form={form} name="password" isPending={isPending} />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Register
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};

export default SignUp;
