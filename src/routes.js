import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
// Pages
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserPage from "./pages/UserPage";
import UserAddPage from "./pages/UserAddPage";
import UserEditPage from "./pages/UserEditPage";

import EmployeePage from "./pages/EmployeePage";
import EmployeeAddPage from "./pages/EmployeeAddPage";
import EmployeeEditPage from "./pages/EmployeeEditPage";

import LeaveApplyPage from "./pages/LeaveApplyPage";

import LeaveConfigPage from "./pages/LeaveConfigPage";
import CustomAttributesPage from "./pages/CustomAttributesPage";
import CustomAttributesAddPage from "./pages/CustomAttributesAddPage";
import ReportsPage from "./pages/ReportsPage";

import PrivateRoutes from "./utils/PrivateRoutes";
import DepartmentPage from "./pages/DepartmentPage";
import DepartmentAddPage from "./pages/DepartmentAddPage";
import OrganizationInfoPage from "./pages/OrganizationInfoPage";
import BranchesPage from "./pages/BranchesPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import LeaveHistoryPage from "./pages/LeaveHistoryPage";

import ApproveLeavesPage from "./pages/ApproveLeavesPage";

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
						{ path: "user/add", element: <UserAddPage /> },
						{ path: "user/edit/:id", element: <UserEditPage /> },
						{ path: "employee", element: <EmployeePage /> },
						{ path: "employee/add", element: <EmployeeAddPage /> },
						{ path: "employee/edit/:id", element: <EmployeeEditPage /> },
						{ path: "leave-config", element: <LeaveConfigPage /> },
						{ path: "leave/apply", element: <LeaveApplyPage /> },
						{ path: "custom-attributes", element: <CustomAttributesPage /> },
						{
							path: "custom-attributes/add",
							element: <CustomAttributesAddPage />,
						},
						{ path: "reports", element: <ReportsPage /> },
						{ path: "department", element: <DepartmentPage /> },
						{ path: "department/add", element: <DepartmentAddPage /> },
						{ path: "organization", element: <OrganizationInfoPage /> },
						{ path: "branches", element: <BranchesPage /> },
						{ path: "change-password", element: <ChangePasswordPage /> },
						{ path: "personal-info", element: <PersonalInfoPage /> },
						{ path: "leave-history", element: <LeaveHistoryPage /> },
						{ path: "approve-leaves", element: <ApproveLeavesPage /> },
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
