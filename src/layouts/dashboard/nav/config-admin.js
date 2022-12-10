// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

// ----------------------------------------------------------------------

const navConfig = [
	{
		title: "dashboard",
		path: "/dashboard/app",
		icon: <DashboardIcon />,
	},
	{
		title: "users",
		path: "/dashboard/user",
		icon: <GroupIcon />,
	},
	{
		title: "employees",
		path: "/dashboard/employee",
		icon: <AssignmentIndIcon />,
	},
	{
		title: "organization info",
		path: "/dashboard/organization",
		icon: <InfoIcon />,
	},
	{
		title: "branches",
		path: "/dashboard/branch",
		icon: <BusinessIcon />,
	},
	{
		title: "departments",
		path: "/dashboard/department",
		icon: <ViewModuleIcon />,
	},
	{
		title: "custom attributes",
		path: "/dashboard/custom-attributes",
		icon: <DynamicFeedIcon />,
	},
	{
		title: "leave config",
		path: "/dashboard/leave-config",
		icon: <EventRepeatIcon />,
	},
	{
		title: "reports",
		path: "/dashboard/reports",
		icon: <AssessmentIcon />,
	},
];

export default navConfig;
