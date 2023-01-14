import { useContext } from "react";
import UserContext from "../context/user-context";
import AdminDashboard from "./dashboard/AdminDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import axios from "axios";

// ----------------------------------------------------------------------

export default function DashboardAppPage({ userData }) {
	const userContext = useContext(UserContext);

	axios
		.get(
			process.env.REACT_APP_BACKEND_URL +
				"/api/user/supervisor/" +
				userContext.userData.emp_id
		)
		.then((res) => {
			if (res.data.length > 0) {
				sessionStorage.setItem("is-supervisor", true);
			} else {
				sessionStorage.setItem("is-supervisor", false);
			}
		});

	let toRender = null;
	if (userContext.userData.role === "admin") {
		toRender = <AdminDashboard />;
	} else if (userContext.userData.role === "manager") {
		toRender = <UserDashboard />;
	} else {
		toRender = <UserDashboard />;
	}

	return <>{toRender}</>;
}
