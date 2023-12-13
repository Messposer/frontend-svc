import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AuthMiddleWare from "middlewares/authMiddleWare";
import GuestMiddleWare from "middlewares/guestMiddleWare";
import Error404 from "./errors/404";
import {
  ACCOUNT_PREFIX_PATH,
  DASHBOARD_PREFIX_PATH,
  CATEGORY_PREFIX_PATH,
  PRODUCT_PREFIX_PATH,
} from "configs/AppConfig";
import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout";
import ProfileLayout from "layouts/profile-layout";
import { Toaster } from 'sonner';
import { RootState } from "redux/types/Root";
import { User } from "redux/types";
import CategoryLayout from "layouts/category-layout";
import ProductLayout from "layouts/product-layout";

interface ViewsProps {
  token: string | null;
  authUser: User | null;
}

const Views: React.FC<ViewsProps> = ({ token, authUser }) => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          element={
            <GuestMiddleWare isAuthenticated={Boolean(token)} />
          }
        >
          <Route
            path="/*"
            element={<AuthLayout />}
          />
        </Route>
        <Route
          element={
            <AuthMiddleWare isAuthenticated={Boolean(token)} />
          }
        >
          <Route
            path={`${DASHBOARD_PREFIX_PATH}/*`}
            element={
              <DashboardLayout />
            }
          />
          <Route
            path={`${ACCOUNT_PREFIX_PATH}/*`}
            element={
              <ProfileLayout />
            }
          />
          <Route
            path={`${CATEGORY_PREFIX_PATH}/*`}
            element={
              <CategoryLayout />
            }
          />

          <Route
            path={`${PRODUCT_PREFIX_PATH}/*`}
            element={
              <ProductLayout />
            }
          />
          
        </Route>
        <Route path="*" element={<Error404 title="Page not found" />} />
      </Routes>
    </>
  );
};

const mapStateToProps = ({ auth }: RootState) => {
  const { token, authUser } = auth;
  return { token, authUser };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
