import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../views/Auth/Login";
import Registration from "../views/Auth/Registration";
import PositionsPage from "../views/Positions";
import PositionsFormPage from "../views/Positions/ProductsFormPage";
import ProductUpdate from "../views/Positions/ProductUpdate/ProductUpdate";

const Router = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  console.log("isAuth", isAuth);

  if (!isAuth)
    return (
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login " />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/products" />} />
        <Route path="products" element={<PositionsPage />} />
        <Route path="products/create" element={<PositionsFormPage />} />
        <Route path="products/:id" element={<PositionsFormPage />} />
        <Route path="menu" element={<>Menu</>} />
        <Route path="*" element={<Navigate to="products" />} />
      </Route>
      <Route path="*" element={<Navigate to="products" />} />
    </Routes>
  );
};

export default Router;
