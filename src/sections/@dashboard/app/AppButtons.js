// @mui
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	Button,
	Stack,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import InfoIcon from "@mui/icons-material/Info";

// ----------------------------------------------------------------------

AppButtons.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
};

export default function AppButtons({ title, subheader, ...other }) {
	return (
		<Card {...other}>
			<CardHeader title={title} subheader={subheader} />

			<CardContent>
				<Stack spacing={1}>
					<Button
						variant="outlined"
						size="large"
						endIcon={<EventIcon />}
						component={RouterLink}
						to="/dashboard/leave/apply"
						fullWidth
					>
						Apply Leave
					</Button>
					<Button
						variant="outlined"
						size="large"
						color="error"
						endIcon={<EventBusyIcon />}
						fullWidth
					>
						Cancel Leave
					</Button>
					<Button
						variant="outlined"
						size="large"
						color="info"
						endIcon={<InfoIcon />}
					>
						Personal Info
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
}
