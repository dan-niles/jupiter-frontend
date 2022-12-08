import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	Avatar,
	IconButton,
	Popover,
} from "@mui/material";
// mocks_
import account_temp from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "Home",
		icon: "eva:home-fill",
	},
	{
		label: "Profile",
		icon: "eva:person-fill",
	},
	{
		label: "Settings",
		icon: "eva:settings-2-fill",
	},
];

// ----------------------------------------------------------------------

export default function AccountPopover({ userData }) {
	const [open, setOpen] = useState(null);

	const user_data = userData;
	let account = {};

	if (user_data != null) {
		account = {
			displayName: user_data.first_name + " " + user_data.last_name,
			email: user_data.email,
			photoURL: "/assets/images/avatars/avatar_default.png",
			role: user_data.job_title,
		};
	} else {
		account = account_temp;
	}

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		sessionStorage.removeItem("user-data");
		sessionStorage.removeItem("access-token");
		setOpen(null);
	};

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}
			>
				<Avatar src={account.photoURL} alt="photoURL" />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle2" noWrap>
						{account.displayName}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
						{account.email}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem key={option.label} onClick={handleClose}>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: "dashed" }} />

				<MenuItem
					component={RouterLink}
					to="/login"
					onClick={handleClose}
					sx={{ m: 1 }}
				>
					Logout
				</MenuItem>
			</Popover>
		</>
	);
}
