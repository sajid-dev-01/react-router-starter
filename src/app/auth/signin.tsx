import { createCookie, data, useFetcher } from "react-router";

import { SignInSchema } from "~/.server/application/dtos/auth.dto";
import { getInstance } from "~/.server/container";
import { signInController } from "~/.server/infrastructure/modules/auth/controller";
import SignInForm from "~/features/auth/components/sign-in";
import { createActionHandler } from "~/lib/action-handler";

import { Route } from "../+types";

export async function action(args: Route.ActionArgs) {
  const instrumentationService = getInstance("IInstrumentationService");
  instrumentationService.instrumentServerAction(
    "signIn",
    { recordResponse: true },
    async () => {
      return createActionHandler({ args, schema: SignInSchema }).handle(
        async ({ json }) => {
          const { session, cookie } = await signInController(json);

          if ("userId" in session) {
            createCookie(cookie.name, cookie.attributes);
          }

          return data({ message: "Sign in successfull" });
        }
      );
    }
  );
}

export default function SigninPage() {
  const fetcher = useFetcher();

  return (
    <SignInForm
      onSubmit={(dto) =>
        fetcher.submit(dto, { method: "post", encType: "application/json" })
      }
    />
  );
}
