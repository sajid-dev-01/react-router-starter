import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("./app/index.tsx"),
  layout("./app/auth/layout.tsx", [
    route("/signin", "./app/auth/signin.tsx"),
    route("/signup", "./app/auth/signup.tsx"),
    route("/verify-email", "./app/auth/verify-email.tsx"),
    route("/forgot-password", "./app/auth/forgot-password.tsx"),
    route("/reset-password", "./app/auth/reset-password.tsx"),
  ]),
  layout("./app/dashboard/layout.tsx", [
    route("dashboard", "./app/dashboard/index.tsx"),
  ]),
] satisfies RouteConfig;
