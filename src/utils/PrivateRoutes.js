import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const auth = {
		token: sessionStorage.getItem("access-token") ? true : false,
	};
	return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
