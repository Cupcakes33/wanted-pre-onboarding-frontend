import SignLayout from "../components/layouts/SignLayout";
import TodoLayout from "../components/layouts/TodoLayout";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Todo from "../pages/Todo";

export const pages = {
  SIGN_LAYOUT: <SignLayout />,
  SIGNIN: <Signin />,
  SIGNUP: <Signup />,
  TODO_LAYOUT: <TodoLayout />,
  TODO: <Todo />,
};
