import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "../helpers/pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={pages.SIGNUP} />
        <Route path="/signin" element={pages.SIGNIN} />
        <Route path="/todo" element={pages.TODO} />
      </Routes>
    </BrowserRouter>
  );
}
