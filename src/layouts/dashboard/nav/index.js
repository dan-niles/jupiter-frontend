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
import navAdminConfig from "./config-admin";
import navUserConfig from "./config-user";
import navManagerConfig from "./config-manager";
import { useAuth } from "../../../context/auth-context";

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

export default function Nav({ openNav, onCloseNav }) {
	const { pathname } = useLocation();

	const isDesktop = useResponsive("up", "lg");

	const { user } = useAuth();
	let account = {};

	if (user != null) {
		account = {
			displayName: user.first_name + " " + user.last_name,
			email: user.email,
			photoURL: "/assets/images/avatars/avatar_default.png",
			role: user.job_title,
		};

		if (user.role === "admin") {
			account.role = "Administrator";
		}
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
			className="no-print"
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
				className="no-print"
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

			<Box className="no-print" sx={{ mb: 3, py: 1, mx: 2.5 }}>
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

			<NavSection
				className="no-print"
				data={
					user.role === "admin"
						? navAdminConfig
						: user.role === "manager"
						? navManagerConfig
						: navUserConfig
				}
			/>

			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<Box
			className="no-print"
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV_WIDTH },
			}}
		>
			{isDesktop ? (
				<Drawer
					className="no-print"
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
					className="no-print"
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
