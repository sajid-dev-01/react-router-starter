import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
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
import { InputPassword } from "~/components/ui-extension/input-password";
import { appConfig } from "~/configs/app-config";

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
      headerTitle={`Login to ${appConfig.name}`}
      headerDesc="Choose your preferred sign in method"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Button
                      size="sm"
                      variant="link"
                      className="h-auto p-0 font-normal text-blue-500"
                      asChild
                    >
                      <Link to={AUTH_URI.forgotPassword}>Forgot password?</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <InputPassword
                      {...field}
                      disabled={isPending}
                      placeholder="Enter password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading type="submit" loading={isPending} className="w-full">
            Login
          </ButtonLoading>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignInForm;
