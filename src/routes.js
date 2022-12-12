import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
// Pages
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserPage from "./pages/UserPage";

import EmployeePage from "./pages/EmployeePage";
import EmployeeAddPage from "./pages/EmployeeAddPage";
import EmployeeEditPage from "./pages/EmployeeEditPage";

import LeaveApplyPage from "./pages/LeaveApplyPage";

import LeaveConfigPage from "./pages/LeaveConfigPage";
import CustomAttributesPage from "./pages/CustomAttributesPage";
import ReportsPage from "./pages/ReportsPage";

import PrivateRoutes from "./utils/PrivateRoutes";
import DepartmentPage from "./pages/DepartmentPage";
import OrganizationInfoPage from "./pages/OrganizationInfoPage";
import ChangePassword from "./pages/ChangePassword";
import PersonalInfo from "./pages/PersonalInfo";

export default function Router() {
	const routes = useRoutes([
		{
			path: "/",
			element: <Navigate to="/dashboard" />,
			index: true,
		},
		{
			element: <PrivateRoutes />,
			children: [
				{
					path: "/dashboard",
					element: <DashboardLayout />,
					children: [
						{ element: <Navigate to="/dashboard/app" />, index: true },
						{ path: "app", element: <DashboardAppPage /> },
						{ path: "user", element: <UserPage /> },
						{ path: "employee", element: <EmployeePage /> },
						{ path: "employee/add", element: <EmployeeAddPage /> },
						{ path: "employee/edit/:id", element: <EmployeeEditPage /> },
						{ path: "leave-config", element: <LeaveConfigPage /> },
						{ path: "leave/apply", element: <LeaveApplyPage /> },
						{ path: "custom-attributes", element: <CustomAttributesPage /> },
						{ path: "reports", element: <ReportsPage /> },
						{ path: "department", element: <DepartmentPage /> },
						{ path: "organization", element: <OrganizationInfoPage /> },
						{ path: "change-password", element: <ChangePassword /> },
						{ path: "personal-info", element: <PersonalInfo /> },
					],
				},
			],
		},

		{
			path: "login",
			element: <LoginPage />,
		},
	]);

	return routes;
}
