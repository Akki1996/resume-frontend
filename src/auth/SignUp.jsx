import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
import "./auth.css"; 

const SignUp = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="logo-container">
            <h1 className="logo-text">Resume Builder</h1>
          </div>
        <div className="auth-tabs">
          <Link to="/login" className="inactive-tab">Login</Link>
          <button className="active-tab">Sign Up</button>
        </div>

        {/* Google Sign Up */}
        {/* <button className="google-login-btn">
          <FcGoogle className="google-icon" />
          Sign up with Google
        </button> */}

        {/* Separator */}
        {/* <div className="separator">
          <hr className="line" />
          <span>OR</span>
          <hr className="line" />
        </div> */}

        <form className="auth-form">
          <div className="form-group">
            <label>First Name <span className="required">*</span></label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label>Last Name <span className="required">*</span></label>
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input type="email" placeholder="example@email.com" />
          </div>
          <div className="form-group">
            <label>Password <span className="required">*</span></label>
            <div className="password-container">
              <input type="password" placeholder="Enter a Password" />
              <span className="password-toggle">👁️</span>
            </div>
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By signing up, I agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
            </label>
          </div>

          <button className="auth-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
