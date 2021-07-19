import { useSelector } from "react-redux";
import { selectToken } from "../redux/slices/authSlice";

export const useAuth = () => {
  const user = useSelector(selectToken);

  return React.useMemo(() => ({ user }), [user]);
};
