import { useContext } from "react";
import UserContext from "../context/user-context";
import AdminDashboard from "./dashboard/AdminDashboard";
import UserDashboard from "./dashboard/UserDashboard";

// ----------------------------------------------------------------------

export default function DashboardAppPage({ userData }) {
	const userContext = useContext(UserContext);

	let toRender = null;
	if (userContext.userData.role === "admin") {
		toRender = <AdminDashboard />;
	} else {
		toRender = <UserDashboard />;
	}

	return <>{toRender}</>;
}
