import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
// Pages
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserPage from "./pages/UserPage";

export default function Router() {
	const routes = useRoutes([
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
