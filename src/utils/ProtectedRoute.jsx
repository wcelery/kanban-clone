import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute({ children, ...rest }) {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
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
