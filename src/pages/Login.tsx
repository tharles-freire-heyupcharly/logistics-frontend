import React from "react";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
