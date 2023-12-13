import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from "configs/AppConfig";

interface GuestMiddlewareProps {
  isAuthenticated: boolean;
  location?: string
}
const GuestMiddleWare = (props: GuestMiddlewareProps) => {
  const {
    isAuthenticated,
    // location
  } = props;
  return (
    <>
      {
        !isAuthenticated ?
        <Outlet />
       :
        <Navigate
          to={{
            pathname: DASHBOARD_PREFIX_PATH,
            // state: { from: location },
          }}
        />
      }
    </>
  );
};

export default GuestMiddleWare;
