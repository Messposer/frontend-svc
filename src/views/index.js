import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AuthMiddleWare from "middlewares/authMiddleWare";
import GuestMiddleWare from "middlewares/guestMiddleWare";
import Error404 from "./errors/404";
import {
  CHAT_PREFIX_PATH,
  CONTACT_PREFIX_PATH,
  DASHBOARD_PREFIX_PATH
} from "configs/AppConfig";
import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout";
import ChatLayout from "layouts/chat-layout";
import ContactLayout from "layouts/contact-layout";

export const Views = (props) => {
  const { token } = props;
  return (
    <Routes>
      <Route
        element={
          <GuestMiddleWare isAuthenticated={token} />
        }
      >
        <Route
          path="/*"
          element={<AuthLayout />}
        />
      </Route>
      <Route
        element={
          <AuthMiddleWare isAuthenticated={token} />
        }
      >
        <Route
          path={`${DASHBOARD_PREFIX_PATH}/*`}
          element={
            <DashboardLayout />
          }
        />
        <Route
          path={`${CHAT_PREFIX_PATH}/*`}
          element={
            <ChatLayout />
          }
        />
        <Route
          path={`${CONTACT_PREFIX_PATH}/*`}
          element={
            <ContactLayout />
          }
        />
      </Route>
      <Route path="*" element={<Error404 title="Page not found" />} />
    </Routes>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token  } = auth;
  return { token};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);