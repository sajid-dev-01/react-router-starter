import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
      headerTitle={`Register to ${appConfig.name}`}
      headerDesc="Choose your preferred sign up method"
      buttonLabel="Already have an account?"
      buttonHref={AUTH_URI.signIn}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Jhon Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading type="submit" loading={isPending} className="w-full">
            Register
          </ButtonLoading>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignUp;
