import { Outlet } from "react-router-dom";

export default function TodoLayout() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <Outlet />
    </main>
  );
}
