// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

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
		title: "approve leaves",
		path: "/dashboard/approve-leaves",
		icon: <PlaylistAddCheckIcon />,
	},
	{
		title: "leave history",
		path: "/dashboard/leave-history",
		icon: <HistoryIcon />,
	},
	{
		title: "change password",
		path: "/dashboard/change-password",
		icon: <KeyIcon />,
	},
];

export default navConfig;
