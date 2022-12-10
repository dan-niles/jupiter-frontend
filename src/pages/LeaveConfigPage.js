import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";
// @mui
import {
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TextField,
	TableHead,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ----------------------------------------------------------------------

function createData(paygrade, annual, casual, maternity, nopay) {
	return { paygrade, annual, casual, maternity, nopay };
}

const rows = [
	createData("Level 1", 14, 12, 10, 50),
	createData("Level 2", 14, 12, 10, 50),
	createData("Level 3", 14, 12, 10, 50),
	createData("Level 4", 14, 12, 10, 50),
];

export default function EmployeePage() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Helmet>
				<title> Leave Configuration | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Leave Configuration
					</Typography>
					<Button
						variant="contained"
						startIcon={<RestartAltIcon icon="eva:plus-fill" />}
					>
						Yearly Reset
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Paygrade</TableCell>
										<TableCell align="right">Annual Leave</TableCell>
										<TableCell align="right">Casual Leave</TableCell>
										<TableCell align="right">Maternity Leave</TableCell>
										<TableCell align="right">No Pay Leave</TableCell>
										<TableCell align="center">Edit</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.paygrade}
											</TableCell>
											<TableCell align="right">{row.annual}</TableCell>
											<TableCell align="right">{row.casual}</TableCell>
											<TableCell align="right">{row.maternity}</TableCell>
											<TableCell align="right">{row.nopay}</TableCell>
											<TableCell align="center">
												<IconButton aria-label="edit" onClick={handleClickOpen}>
													<EditIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the number of days for each leave type
					</DialogContentText>
					<Stack spacing={1} direction="column" sx={{ mt: 2 }}>
						<TextField
							id="annual"
							label="Annual Leave"
							type="number"
							fullWidth
							variant="standard"
							value={14}
						/>
						<TextField
							id="casual"
							label="Casual Leave"
							type="number"
							fullWidth
							variant="standard"
							value={12}
						/>
						<TextField
							id="maternity"
							label="Maternity Leave"
							type="number"
							fullWidth
							variant="standard"
							value={10}
						/>
						<TextField
							id="annual"
							label="No Pay"
							type="number"
							fullWidth
							variant="standard"
							value={50}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
