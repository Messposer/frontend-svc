import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "components/Loading";
import Forgot from "./authentication/forgot";
import CodeVerify from "./authentication/verify";
import NewPassword from "./authentication/newPassword";

const Login = lazy(() => import(`./authentication/login`));
const SignUp = lazy(() => import(`./authentication/signup`));

const AuthViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Routes>
        <Route
          path="/"
          element={<Login title="Login to your account" />}
        />
        <Route 
          path="/register" 
          element={<SignUp title="Create an account" />} 
        />
        <Route 
          path="/forgot" 
          element={<Forgot title="Did you forgot your password" />} 
        />
        <Route 
          path="/verify" 
          element={<CodeVerify title="Verify the code sent to your email" />} 
        />
        <Route 
          path="/new/password" 
          element={<NewPassword title="Verify the code sent to your email" />} 
        />
      </Routes>
    </Suspense>
  );
};

export default AuthViews;
