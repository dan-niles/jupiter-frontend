import { Helmet } from "react-helmet-async";
// @mui
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import axios from "axios";
// sections
import {
	AppWebsiteVisits,
	AppWidgetSummary,
	AppCurrentSubject,
} from "../../sections/@dashboard/app";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function AdminDashboard() {
	const theme = useTheme();
	const [departmentCount, setDepartmentCount] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const [employeeCount, setEmployeeCount] = useState(0);
	const [branchCount, setBranchCount] = useState(0);

	useEffect(() => {
		axios
			.post(window.configs.backendUrl + "/api/department/count", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data[0][0]["count(*)"]);
				setDepartmentCount(res.data[0][0]["count(*)"]);
			});

		axios
			.post(window.configs.backendUrl + "/api/branch/count", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data[0][0]["count(*)"]);
				setBranchCount(res.data[0][0]["count(*)"]);
			});

		axios
			.post(window.configs.backendUrl + "/api/user/count", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data[0][0]["count(*)"]);
				setUserCount(res.data[0][0]["count(*)"]);
			});

		axios
			.post(window.configs.backendUrl + "/api/employee/count", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data[0][0]["count(*)"]);
				setEmployeeCount(res.data[0][0]["count(*)"]);
			});
	}, []);

	return (
		<>
			<Helmet>
				<title> Dashboard | Jupiter HRM </title>
			</Helmet>

			<Container maxWidth="xl">
				<Typography variant="h4" sx={{ mb: 5 }}>
					Dashboard
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title="Branches"
							total={branchCount}
							icon={"ant-design:cluster-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title="Departments"
							total={departmentCount}
							color="info"
							icon={"ant-design:appstore-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title="Employees"
							total={employeeCount}
							color="success"
							icon={"ant-design:team-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title="Users"
							total={userCount}
							color="warning"
							icon={"ant-design:user-outlined"}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppWebsiteVisits
							title="System Usage"
							subheader="(+43%) than last year"
							chartLabels={[
								"01/01/2003",
								"02/01/2003",
								"03/01/2003",
								"04/01/2003",
								"05/01/2003",
								"06/01/2003",
								"07/01/2003",
								"08/01/2003",
								"09/01/2003",
								"10/01/2003",
								"11/01/2003",
							]}
							chartData={[
								{
									name: "Dept. A",
									type: "column",
									fill: "solid",
									data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
								},
								{
									name: "Dept. B",
									type: "area",
									fill: "gradient",
									data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
								},
								{
									name: "Dept. C",
									type: "line",
									fill: "solid",
									data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
								},
							]}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppCurrentSubject
							title="Employee Distribution"
							chartLabels={[
								"Dept. A",
								"Dept. B",
								"Dept. C",
								"Dept. D",
								"Dept. E",
								"Dept. F",
							]}
							chartData={[
								{ name: "Sri Lanka", data: [80, 50, 30, 40, 100, 20] },
								{ name: "India", data: [20, 30, 40, 80, 20, 80] },
								{ name: "Pakistan", data: [44, 76, 78, 13, 43, 10] },
							]}
							chartColors={[...Array(6)].map(
								() => theme.palette.text.secondary
							)}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
