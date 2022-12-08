import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
	Box,
	Link,
	Button,
	Drawer,
	Typography,
	Avatar,
	Stack,
} from "@mui/material";
// mock
import account_temp from "../../../_mock/account";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func,
};

export default function Nav({ userData, openNav, onCloseNav }) {
	const { pathname } = useLocation();

	const isDesktop = useResponsive("up", "lg");

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

	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				"& .simplebar-content": {
					height: 1,
					display: "flex",
					flexDirection: "column",
				},
			}}
		>
			<Box
				sx={{
					mb: 1,
					pb: 2,
					pt: 3,
					mx: 2.5,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Logo sx={{ mx: 2 }} />
			</Box>

			<Box sx={{ mb: 3, py: 1, mx: 2.5 }}>
				<Link underline="none">
					<StyledAccount>
						<Avatar src={account.photoURL} alt="photoURL" />

						<Box sx={{ ml: 2 }}>
							<Typography variant="subtitle2" sx={{ color: "text.primary" }}>
								{account.displayName}
							</Typography>

							<Typography
								variant="subtitle4"
								sx={{ color: "text.secondary", fontSize: "0.8em" }}
							>
								{account.role}
							</Typography>
						</Box>
					</StyledAccount>
				</Link>
			</Box>

			<NavSection data={navConfig} />

			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV_WIDTH },
			}}
		>
			{isDesktop ? (
				<Drawer
					open
					variant="permanent"
					PaperProps={{
						sx: {
							width: NAV_WIDTH,
							bgcolor: "background.default",
							borderRightStyle: "dashed",
						},
					}}
				>
					{renderContent}
				</Drawer>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: { width: NAV_WIDTH },
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}
