// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, CircularProgress, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/iconify";
import { Box, Stack } from "@mui/system";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
	margin: "auto",
	display: "flex",
	borderRadius: "50%",
	alignItems: "center",
	width: theme.spacing(8),
	height: theme.spacing(8),
	justifyContent: "center",
	marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppLeaveSummary.propTypes = {
	color: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	balance: PropTypes.number.isRequired,
	sx: PropTypes.object,
};

export default function AppLeaveSummary({
	title,
	total,
	icon,
	balance,
	color = "primary",
	sx,
	...other
}) {
	return (
		<Card
			sx={{
				py: 5,
				boxShadow: 0,
				textAlign: "center",
				color: (theme) => theme.palette[color].darker,
				bgcolor: (theme) => theme.palette[color].lighter,
				...sx,
			}}
			{...other}
		>
			<StyledIcon
				sx={{
					color: (theme) => theme.palette[color].dark,
					backgroundImage: (theme) =>
						`linear-gradient(135deg, ${alpha(
							theme.palette[color].dark,
							0
						)} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
				}}
			>
				<Box sx={{ position: "relative", display: "inline-flex" }}>
					<CircularProgress
						variant="determinate"
						value={(balance / total) * 100}
						color={color}
						size="lg"
						sx={{ width: "60px", height: "60px" }}
					/>
					<Box
						sx={{
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Iconify icon={icon} />
					</Box>
				</Box>
			</StyledIcon>

			<Stack
				direction="row"
				alignItems="baseline"
				justifyContent="center"
				spacing={1}
			>
				<Typography variant="h3">{balance}</Typography>
				<Typography variant="h5" sx={{ opacity: 0.7 }}>
					{" "}
					/ {total}
				</Typography>
			</Stack>

			<Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
				{title}
			</Typography>
		</Card>
	);
}
