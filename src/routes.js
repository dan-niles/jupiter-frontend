import { Navigate, useRoutes } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";

export default function Router() {
	const routes = useRoutes([
		{
			path: "login",
			element: <LoginPage />,
		},
	]);

	return routes;
}
