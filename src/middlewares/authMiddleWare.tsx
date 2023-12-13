import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, Outlet, useLocation } from "react-router-dom";
import Loading from "components/Loading";
import AuthService from "services/AuthService";
import { connect } from "react-redux";
import { saveUserData, signOut } from "redux/actions/Auth";
import { RootState } from "redux/types/Root";
import { useLoading } from "hooks/useLoading";
import { User } from "redux/types";

interface AuthMiddlewareProps {
  isAuthenticated: boolean;
  saveUserData: (userData: User) => void;
  signOut: () => void;
}

const AuthMiddleWare: React.FC<AuthMiddlewareProps> = (props) => {
  const navigate = useNavigate();
  const { saveUserData, signOut, isAuthenticated } = props;
  const [loading, withLoading] = useLoading();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const response = await withLoading(AuthService.user());
        saveUserData(response?.data?.user);
      } catch {
        signOut();
        navigate("/");
      }
    }
    
    getAuthUser();
  }, []);

  return (
    <>
      {loading === true ? (
        <Loading cover="page" />
      ) : isAuthenticated ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate
          to={{
            pathname: "/",
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  saveUserData,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMiddleWare);
