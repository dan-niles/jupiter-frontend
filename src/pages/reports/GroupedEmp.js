import {
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Grid,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Scrollbar from "../../components/scrollbar";
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

const GroupedEmp = () => {
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
								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">
										Group By
									</FormLabel>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
									>
										<FormControlLabel
											value="job_title"
											control={<Radio />}
											label="Job Title"
										/>
										<FormControlLabel
											value="department"
											control={<Radio />}
											label="Department"
										/>
										<FormControlLabel
											value="pay_grade"
											control={<Radio />}
											label="Pay Grade"
										/>
										<FormControlLabel
											value="status"
											control={<Radio />}
											label="Status"
										/>
										<FormControlLabel
											value="contract"
											control={<Radio />}
											label="Contract"
										/>
									</RadioGroup>
								</FormControl>
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
									<TableCell>Employee</TableCell>
									<TableCell align="right">Title</TableCell>
									<TableCell align="right">Department</TableCell>
									<TableCell align="right">Status</TableCell>
									<TableCell align="right">Contract</TableCell>
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

export default GroupedEmp;
