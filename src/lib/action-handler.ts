import { data } from "react-router";
import { z } from "zod";

import { HttpError, ValidationError } from "~/.server/domain/errors";

import { Route } from "../+types/root";

const SERVER_ERROR_MESSSAGE = "Inernal server error";

type HandleActionArgs<Auth extends boolean, TS extends z.Schema> = {
  args: Route.ActionArgs;
  auth?: Auth;
  schema?: TS;
};

type AuthCtx = {
  user: { id: string };
  session: { id: string };
};

type HandlerActionReturn<Auth extends boolean, TS extends z.Schema> = {
  handle: Auth extends true
    ? (cb: (args: { ctx: AuthCtx; json: z.infer<TS> }) => Promise<any>) => any
    : (cb: (args: { ctx: null; json: z.infer<TS> }) => Promise<any>) => any;
};

export const createActionHandler = <
  TS extends z.Schema,
  Auth extends boolean = false,
>({
  args,
  auth,
  schema,
}: HandleActionArgs<Auth, TS>): HandlerActionReturn<Auth, TS> => {
  return {
    handle: async (cb: any) => {
      let json = {};
      if (schema) {
        const result = schema.safeParse(await args.request.json());
        if (!result.success) {
          const e = new ValidationError(result.error.flatten().fieldErrors);
          return data(
            { name: e.name, message: e.message, fieldErrors: e.fieldErrors },
            { status: e.statusCode }
          );
        }
        json = result.data;
      }

      try {
        if (auth) {
          const ctx: AuthCtx = {
            user: { id: "1" },
            session: { id: "1" },
          };
          return await cb({ ctx, json });
        }

        return await cb({ ctx: null, json });
      } catch (e) {
        if (e instanceof ValidationError) {
          return data(
            { name: e.name, message: e.message, fieldErrors: e.fieldErrors },
            { status: e.statusCode }
          );
        }

        if (e instanceof HttpError) {
          return data(
            { name: e.name, message: e.message },
            { status: e.statusCode }
          );
        }

        return data({ message: SERVER_ERROR_MESSSAGE }, { status: 500 });
      }
    },
  };
};
