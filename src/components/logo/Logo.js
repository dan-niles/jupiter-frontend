import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
	const theme = useTheme();

	const logo = (
		<Box
			ref={ref}
			component="div"
			sx={{
				width: "11em",
				display: "inline-flex",
				...sx,
			}}
			{...other}
		>
			<img
				src="/assets/images/logo-text-blue.png"
				alt="login"
				// style={{ width: "13em", display: "flex" }}
			/>
		</Box>
	);

	if (disabledLink) {
		return <>{logo}</>;
	}

	return (
		<Link to="/" component={RouterLink} sx={{ display: "contents" }}>
			{logo}
		</Link>
	);
});

Logo.propTypes = {
	sx: PropTypes.object,
	disabledLink: PropTypes.bool,
};

export default Logo;
