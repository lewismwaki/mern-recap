import React, { useState } from "react";
import { useLogin } from "../hooks/use_login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logIn(email, password);
  };

  return (
    <form
      className='login max-w-md rounded my-10 mx-auto p-5 bg-white '
      onSubmit={handleSubmit}
    >
      <h4 className='my-4'>Log In</h4>

      <label>Email: </label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password: </label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log In</button>
      {error && (
        <div className='rounded-md mx-0 my-5 p-2 border-2 border-red-300 bg-red-100'>
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
