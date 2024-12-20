import { SignIn, SignUp } from "@clerk/nextjs";

const TestPage = () => (
  <div>
    <h1>Test Page</h1>
    <div>
      <h2>Sign In</h2>
      <SignIn />
    </div>
    <div>
      <h2>Sign Up</h2>
      <SignUp />
    </div>
  </div>
);

export default TestPage;
