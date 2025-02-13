import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { GenericForm } from "~/components/form/generic-form";
import { InputField } from "~/components/form/input-field";
import { PasswordField } from "~/components/form/password-field";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui-extension/button-loading";
import { siteConfig } from "~/site-config";

import { AUTH_URI } from "../constants";
import { SignInDto, SignInSchema } from "../schemas";
import AuthCard from "./auth-card";

type Props = {
  onSubmit: (dto: SignInDto) => void;
};

const SignInForm = ({ onSubmit }: Props) => {
  const isPending = false;

  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
  });

  return (
    <AuthCard
      headerTitle={`Login to ${siteConfig.name}`}
      headerDesc="Choose your preferred sign in method"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
      showSocial
    >
      <GenericForm {...form} onSubmit={(data) => onSubmit(data)}>
        <div className="space-y-4">
          <InputField
            form={form}
            name="email"
            label="Email"
            isPending={isPending}
            type="email"
            placeholder="jhon@example.com"
          />
          <PasswordField form={form} name="password" isPending={isPending} />
          <Button
            size="sm"
            variant="link"
            className="h-0 p-0 font-normal text-blue-500"
            asChild
          >
            <Link to={AUTH_URI.forgotPassword}>Forgot password?</Link>
          </Button>
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Login
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};

export default SignInForm;
