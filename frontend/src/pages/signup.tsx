import React, { useState } from "react";
import { useSignup } from "../hooks/use_signup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password);
  };

  return (
    <form
      className='max-w-md rounded my-10 mx-auto p-5 bg-white '
      onSubmit={handleSubmit}
    >
      <h4 className="my-4">Sign Up</h4>

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

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Signup;
