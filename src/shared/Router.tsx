import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "../helpers/pages";
import { PrivateRoute, PublicRoute } from "./Routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={pages.SIGN_LAYOUT}>
            <Route path="/signup" element={pages.SIGNUP} />
            <Route path="/signin" element={pages.SIGNIN} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={pages.TODO} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
