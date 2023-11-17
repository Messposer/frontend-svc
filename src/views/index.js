import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AuthMiddleWare from "middlewares/authMiddleWare";
import GuestMiddleWare from "middlewares/guestMiddleWare";
import Error404 from "./errors/404";
import {
  ACCOUNT_PREFIX_PATH,
  CHAT_PREFIX_PATH,
  CONTACT_GROUP_PREFIX_PATH,
  CONTACT_PREFIX_PATH,
  DASHBOARD_PREFIX_PATH,
  MEDIA_PREFIX_PATH,
  SCHEDULE_PREFIX_PATH,
  SETTINGS_PREFIX_PATH,
  SUBSCRIPTION_PREFIX_PATH,
  TEMPLATE_BUILDER_PREFIX_PATH,
  TEMPLATE_PREFIX_PATH,
  TRANSACTIONS_PREFIX_PATH,
} from "configs/AppConfig";
import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout";
import ChatLayout from "layouts/chat-layout";
import ContactLayout from "layouts/contact-layout";
import BroadCastLayout from "layouts/broadcast-layout";
import ScheduleLayout from "layouts/schedule-layout";
import TemplateLayout from "layouts/template-layout";
import TemplateBuilderLayout from "layouts/builder-layout";
import MediaLayout from "layouts/media-layout";
import SubscriptionLayout from "layouts/subscription-layout";
import TransactionLayout from "layouts/transaction-layout";
import ProfileLayout from "layouts/profile-layout";
import SettingsLayout from "layouts/settings-layout";
import { Toaster } from 'sonner';
import VerifySenderEmail from "./auth-views/verifySenderEmail";

export const Views = (props) => {
  const { token } = props;
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/verify/from-email"
          element={<VerifySenderEmail title="Verify email address"/>}
        />
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
          <Route
            path={`${CONTACT_GROUP_PREFIX_PATH}/*`}
            element={
              <BroadCastLayout />
            }
          />
          <Route
            path={`${SCHEDULE_PREFIX_PATH}/*`}
            element={
              <ScheduleLayout />
            }
          />
          <Route
            path={`${TEMPLATE_PREFIX_PATH}/*`}
            element={
              <TemplateLayout />
            }
          />
          <Route
            path={`${TEMPLATE_BUILDER_PREFIX_PATH}/*`}
            element={
              <TemplateBuilderLayout />
            }
          />
          <Route
            path={`${MEDIA_PREFIX_PATH}/*`}
            element={
              <MediaLayout />
            }
          />
          <Route
            path={`${SUBSCRIPTION_PREFIX_PATH}/*`}
            element={
              <SubscriptionLayout />
            }
          />
          <Route
            path={`${TRANSACTIONS_PREFIX_PATH}/*`}
            element={
              <TransactionLayout />
            }
          />
          <Route
            path={`${ACCOUNT_PREFIX_PATH}/*`}
            element={
              <ProfileLayout />
            }
          />
          <Route
            path={`${SETTINGS_PREFIX_PATH}/*`}
            element={
              <SettingsLayout />
            }
          />        
        </Route>
        <Route path="*" element={<Error404 title="Page not found" />} />
      </Routes>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token  } = auth;
  return { token};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
