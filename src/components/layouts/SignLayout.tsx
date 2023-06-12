import { Outlet } from "react-router-dom";
import SignNav from "../ele/SignNav";

export default function SignLayout() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-neutral-100">
      <SignNav />
      <Outlet />
    </main>
  );
}
