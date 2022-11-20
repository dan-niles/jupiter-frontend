import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
// Pages
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserPage from "./pages/UserPage";

export default function Router() {
	const routes = useRoutes([
		{
			path: "/",
			element: <Navigate to="/dashboard" />,
			index: true,
		},
		{
			path: "/dashboard",
			element: <DashboardLayout />,
			children: [
				{ element: <Navigate to="/dashboard/app" />, index: true },
				{ path: "app", element: <DashboardAppPage /> },
				{ path: "user", element: <UserPage /> },
			],
		},
		{
			path: "login",
			element: <LoginPage />,
		},
	]);

	return routes;
}
