import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/use_auth_context";
import { useLogOut } from "../hooks/use_logout";

const Navbar = () => {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const handeLogOut = () => {
    logOut();
  };

  return (
    <header className='bg-white'>
      <div className='flex items-center justify-between my-0 mx-auto py-2 px-5 container'>
        <Link className='no-underline text-fuchsia-700 font-bold my-6' to='/'>
          <p className='text-4xl'>Workout Buddy</p>
        </Link>

        <nav className='flex items-center'>
          {user && (
            <div>
              <span>{user.email}</span>
              <button
                className='bg-fuchsia-800 rounded cursor-pointer text-base ml-2 py-2 px-4 text-white'
                onClick={handeLogOut}
              >
                Log Out
              </button>
            </div>
          )}

          {!user && (
            <div>
              <Link className='ml-2 text-black' to='/login'>
                Log In
              </Link>
              <Link className='ml-2 text-black' to='/signup'>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
