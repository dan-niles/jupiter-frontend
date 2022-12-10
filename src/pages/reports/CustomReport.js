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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

const CustomReport = () => {
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
							<Stack direction="row" spacing={2} alignItems="center">
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
								<FormGroup>
									<Stack direction="row" spacing={1}>
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Nationality"
										/>
										<FormControlLabel control={<Checkbox />} label="Religion" />
										<FormControlLabel
											control={<Checkbox />}
											label="Blood Group"
										/>
									</Stack>
								</FormGroup>
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
									<TableCell>Department</TableCell>
									<TableCell>Employee</TableCell>
									<TableCell align="right">Nationality</TableCell>
									<TableCell align="right">Religion</TableCell>
									<TableCell align="right">Blood Group</TableCell>
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
										<TableCell>{row.annual}</TableCell>
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

export default CustomReport;
