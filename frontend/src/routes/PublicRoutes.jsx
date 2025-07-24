import { Route, Routes } from "react-router-dom";
import LoginAdmin from "../components/LoginAdmin";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginAdmin />} />
    </Routes>
  );
};

export default PublicRoutes;