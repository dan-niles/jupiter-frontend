// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
);

const navConfig = [
	{
		title: "dashboard",
		path: "/dashboard/app",
		icon: icon("ic_analytics"),
	},
	{
		title: "users",
		path: "/dashboard/user",
		icon: icon("ic_user"),
	},
	{
		title: "employees",
		path: "/dashboard/employee",
		icon: icon("ic_cart"),
	},
	{
		title: "organization info",
		path: "/dashboard/organization",
		icon: icon("ic_blog"),
	},
	{
		title: "branches",
		path: "/dashboard/branch",
		icon: icon("ic_blog"),
	},
	{
		title: "departments",
		path: "/dashboard/department",
		icon: icon("ic_blog"),
	},
	{
		title: "reports",
		path: "/dashboard/reports",
		icon: icon("ic_blog"),
	},
];

export default navConfig;
