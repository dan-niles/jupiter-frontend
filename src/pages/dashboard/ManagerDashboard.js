import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// sections
import {
	AppWebsiteVisits,
	AppLeaveSummary,
	AppCurrentSubject,
	AppNotifications,
	AppButtons,
} from "../../sections/@dashboard/app";
import { faker } from "@faker-js/faker";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

export default function UserDashboard() {
	const theme = useTheme();

	const { state } = useLocation();

	useEffect(() => {
		if (
			state != null &&
			state.showToast !== undefined &&
			state.showToast === true
		) {
			toast.error(state.toastMessage);
		}
	}, []);

	return (
		<>
			<Helmet>
				<title> Dashboard | Jupiter HRM </title>
			</Helmet>

			<Toaster position="top-right" reverseOrder={true} />

			<Container maxWidth="xl">
				<Typography variant="h4" sx={{ mb: 5 }}>
					Dashboard
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppLeaveSummary
							title="Annual"
							type="annual"
							balance={10}
							total={14}
							color="warning"
							icon={"ant-design:calendar-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppLeaveSummary
							title="Casual"
							type="casual"
							balance={8}
							total={12}
							color="success"
							icon={"ant-design:home-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppLeaveSummary
							title="Maternity"
							type="maternity"
							balance={10}
							total={10}
							color="info"
							icon={"ant-design:usergroup-add-outlined"}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppLeaveSummary
							title="No Pay"
							type="no_pay"
							balance={32}
							total={50}
							icon={"ant-design:fullscreen-exit-outlined"}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppNotifications title="Notifications" list={[]} />
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppButtons title="Actions" />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
