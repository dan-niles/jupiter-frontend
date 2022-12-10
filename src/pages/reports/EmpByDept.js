import {
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	IconButton,
	TableContainer,
	TextField,
	TableHead,
	Grid,
	MenuItem,
} from "@mui/material";

import Scrollbar from "../../components/scrollbar";
import Iconify from "../../components/iconify";
import { Box } from "@mui/system";

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

const EmpByDept = () => {
	return (
		<>
			<Card sx={{ mb: 3 }}>
				<Box
					sx={{
						p: 2,
						m: 2,
					}}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Stack direction="row" spacing={2}>
								<TextField
									id="department"
									select
									label="Department"
									sx={{ width: "25ch" }}
									value={"All"}
								>
									<MenuItem key="All" value="All">
										All
									</MenuItem>
									<MenuItem key="ICT" value="ICT">
										ICT
									</MenuItem>
									<MenuItem key="HR" value="HR">
										HR
									</MenuItem>
									<MenuItem key="Finance" value="Finance">
										Finance
									</MenuItem>
								</TextField>
								<Button type="submit" variant="contained" color="secondary">
									Generate
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</Card>

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
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>
			</Card>
		</>
	);
};

export default EmpByDept;
