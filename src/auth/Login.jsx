import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc"; // For Google Icon
import "./auth.css"; 

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <h1 className="logo-text">Resume Builder</h1>
          </div>

          <div className="login-tabs">
            <button className="active-tab">Login</button>
            <Link to="/signup" className="inactive-tab">Sign Up</Link>
          </div>

          {/* Google Login */}
          {/* <button className="google-login-btn">
            <FcGoogle className="google-icon" />
            Continue with Google
          </button> */}

          {/* Separator */}
          {/* <div className="separator">
            <hr className="line" />
            <span>OR</span>
            <hr className="line" />
          </div> */}

          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="example@email.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-container">
                <input type="password" placeholder="Password" />
                <span className="password-toggle">👁️</span>
              </div>
            </div>
            <Link to="#" className="forgot-password">Forgot password?</Link>
            <button className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
