import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../../context/auth-context";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "Dashboard",
		icon: "eva:home-fill",
		link: "/dashboard/app",
	},
	{
		label: "Change Password",
		icon: "eva:person-fill",
		link: "/dashboard/change-password",
	},
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const [open, setOpen] = useState(null);
	const navigate = useNavigate();

	const { user, logout } = useAuth();
	let account = {};

	if (user != null) {
		account = {
			displayName: user.first_name + " " + user.last_name,
			email: user.email,
			photoURL: "/assets/images/avatars/avatar_default.png",
			role: user.job_title,
		};
	} else {
		account = account_temp;
	}

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const handleLogout = () => {
		handleClose();
		sessionStorage.removeItem("user-data");
		sessionStorage.removeItem("access-token");
		logout()
		navigate("/login");
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
						<MenuItem
							key={option.label}
							onClick={handleClose}
							component={RouterLink}
							to={option.link}
						>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: "dashed" }} />

				<MenuItem onClick={handleLogout} sx={{ m: 1 }}>
					Logout
				</MenuItem>
			</Popover>
		</>
	);
}
