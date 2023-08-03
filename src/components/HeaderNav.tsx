import React from "react";
import { connect } from "react-redux";
import { signOut } from "redux/actions";
import { useNavigate } from "react-router-dom";


const HeaderNav = (props: any) => {
  const {authUser, signOut} = props;
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        {
          authUser ? (
            <>
              <li onClick={() => navigate('/dashboard')}>Dashboard</li>
              <li onClick={() => signOut()}>Logout</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate('/auth/login')}>Login</li>
              <li onClick={() => navigate('/auth/register')}>Register</li>
            </>
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (reducers: any) => {
  const { auth } = reducers;
  const {authUser} = auth;
  return {authUser};
} 

const mapDispatchToProps = {
  signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);