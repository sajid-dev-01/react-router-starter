import { createCookie, data, useFetcher } from "react-router";

import { getInstance } from "~/.server/di";
import SignInForm from "~/features/auth/components/sign-in";
import { SignInSchema } from "~/features/auth/schemas";
import { createActionHandler } from "~/lib/action-handler";

import { Route } from "../+types";

export async function action(args: Route.ActionArgs) {
  // const instrumentationService = getInstance("InstrumentationService");
  // return instrumentationService.instrumentServerAction(
  //   "signIn",
  //   { recordResponse: true },
  //   async () => {
  return createActionHandler({ args, schema: SignInSchema }).handle(
    async ({ json }) => {
      const signInController = getInstance("SignInController");
      const { session, cookie } = await signInController(json);
      console.log(session, cookie);
      if (!("userId" in session)) {
        return data({ error: { message: "Invalid" } }, { status: 400 });
      }

      const signinCookie = createCookie(cookie.name, cookie.attributes);

      return data(
        { message: "Sign in successfull" },
        {
          headers: {
            "Set-Cookie": await signinCookie.serialize(cookie.value),
          },
        }
      );
    }
  );
  // }
  // );
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
