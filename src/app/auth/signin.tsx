import { createCookie, data, useFetcher } from "react-router";

import SignInForm from "~/features/auth/components/sign-in";
import { createActionHandler } from "~/lib/action-handler";

import { Route } from "../+types";

import { SignInSchema } from "~/.server/application/dtos/auth.dto";
import { getInstance } from "~/.server/container";

export async function action(args: Route.ActionArgs) {
  createActionHandler({ args, schema: SignInSchema }).handle(
    async ({ json }) => {
      const headers = args.request.headers;
      const signInController = getInstance("ISignInController");

      if ("id" in user) {
        const { session } = await createSession(user.id, {
          ipAddress: headers.get("X-Forwarded-For"),
          userAgent: {},
        });

        createCookie(SESSION_COOKIE, {
          httpOnly: true,
          sameSite: "lax",
          // secure: serverEnv.NODE_ENV === "production",
          expires: session.expiresAt,
          path: "/",
        });
      }

      return data({ data: user });
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
