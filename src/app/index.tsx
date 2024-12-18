import { Link } from "react-router";

import { AUTH_URI } from "~/features/auth/constants";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={AUTH_URI.signIn}>Sign In</Link>
    </div>
  );
}
