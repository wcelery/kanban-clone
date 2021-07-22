import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/slices/authSlice";

export const useAuth = () => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  return React.useMemo(() => ({ token, user }), [token, user]);
};
