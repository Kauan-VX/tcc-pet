'use client';

import LoginForm from './_components/login-form';

const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center align-center p-4 max-w-md mx-auto h-screen">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          Iniciar sessão
        </h1>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
