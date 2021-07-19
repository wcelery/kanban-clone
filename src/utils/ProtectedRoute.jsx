import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useAuth();
  console.log(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
