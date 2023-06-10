import { Outlet } from "react-router-dom";
import SignNav from "../UI/SignNav";

export default function SignLayout() {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-100 flex flex-col justify-center items-center">
        <SignNav />
        <Outlet />
      </div>
    </>
  );
}
