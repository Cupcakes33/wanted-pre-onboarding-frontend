import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { pages } from "../helpers/pages";
import { PrivateRoute, PublicRoute } from "./Routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route element={<PublicRoute />}>
          <Route element={pages.SIGN_LAYOUT}>
            <Route path="/signup" element={pages.SIGNUP} />
            <Route path="/signin" element={pages.SIGNIN} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={pages.TODO_LAYOUT}>
            <Route path="/todo" element={pages.TODO} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
