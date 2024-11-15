import Wrapper from '@/Components/Wrapper';
import { Signin_Google } from '@/server-actions/auth/Signin';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  return (
    <Wrapper className="my-5 flex min-h-[70vw] items-center justify-center border border-gray-200 bg-white bg-opacity-30 text-2xl shadow-lg backdrop-blur-lg">
      <form action={Signin_Google}>
        <button
          type="submit"
          className="flex min-w-[300px] items-center justify-center gap-2 border-gray-200 bg-gray-600 bg-opacity-30 p-5 shadow-lg backdrop-blur-lg"
        >
          <FaGoogle /> Sign in with Google
        </button>
      </form>
    </Wrapper>
  );
};

export default LoginPage;
