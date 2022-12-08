// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";

// ----------------------------------------------------------------------

const navConfig = [
	{
		title: "dashboard",
		path: "/dashboard/app",
		icon: <DashboardIcon />,
	},
	{
		title: "personal info",
		path: "/dashboard/personal-info",
		icon: <InfoIcon />,
	},
	{
		title: "change password",
		path: "/dashboard/change-password",
		icon: <KeyIcon />,
	},
];

export default navConfig;
