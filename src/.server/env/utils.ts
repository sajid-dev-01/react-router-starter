import { Schema, z } from "zod";

export const createEnv = <T extends Schema>(
  schema: T,
  source: Record<any, any>
) => {
  const envVars = Object.entries(source).reduce((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_")) {
      // @ts-expect-error
      acc[key.replace("VITE_", "")] = value;
    } else {
      // @ts-expect-error
      acc[key] = value;
    }
    return acc;
  }, {});
  console.log(envVars);

  const parsedEnv = schema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.\nThe following variables are missing or invalid:\n${Object.entries(
        parsedEnv.error.flatten().fieldErrors
      )
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")}`
    );
  }

  return parsedEnv.data as z.infer<T>;
};
