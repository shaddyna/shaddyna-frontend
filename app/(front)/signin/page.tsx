import { Metadata } from 'next';
import Form from './Form';

export const metadata: Metadata = {
  title: 'Sign in',
};

const SignInPage = async () => {
  return (
    <div className="bg-white min-h-screen p-4">
      <Form />
    </div>
  );
};

export default SignInPage;
