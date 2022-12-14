import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const navigateToSignUP = () => {
    navigate("/register");
  };
  return (
    <form>
      <h3>Sign up</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
      </button>

      <p className="forgot-password text-right">
        Forgot{" "}
        <a href="/signup" onClick={navigateToSignUP}>
          password?
        </a>
      </p>
    </form>
  );
}
