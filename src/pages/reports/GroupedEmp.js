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

import axios from "axios";
import { useState, useEffect } from "react";

import "../../theme/print.css";

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

const accessToken = sessionStorage.getItem("access-token");

const GroupedEmp = () => {
	const [selectedOption, setSelectedOption] = useState("Job Title");
	const [tableKey, setTableKey] = useState("");

	const [records, setRecords] = useState([]);

	const [showTable, setShowTable] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + "/api/reports/grouped-emp",
				{
					key: selectedOption,
				},
				{
					headers: {
						"access-token": `${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setRecords(res.data);
				setTableKey(selectedOption);
				setShowTable(true);
			});
	};

	return (
		<>
			<Card className="no-print" sx={{ mb: 3 }}>
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
							<form onSubmit={handleSubmit}>
								<Stack direction="row" spacing={2}>
									<FormControl>
										<FormLabel id="demo-row-radio-buttons-group-label">
											Group By
										</FormLabel>
										<RadioGroup
											row
											name="row-radio-buttons-group"
											defaultValue="Job Title"
											value={selectedOption}
											onChange={(e) => setSelectedOption(e.target.value)}
										>
											<FormControlLabel
												value="Job Title"
												control={<Radio />}
												label="Job Title"
											/>
											<FormControlLabel
												value="Pay Grade"
												control={<Radio />}
												label="Pay Grade"
											/>
											<FormControlLabel
												value="Status"
												control={<Radio />}
												label="Status"
											/>
											<FormControlLabel
												value="Contract"
												control={<Radio />}
												label="Contract"
											/>
										</RadioGroup>
									</FormControl>
									<Button type="submit" variant="contained" color="secondary">
										Generate
									</Button>
								</Stack>
							</form>
							<Stack>
								{showTable && (
									<h5 style={{ margin: 0, marginTop: "1em" }}>
										{records.length} record{records.length > 1 && "s"} found
									</h5>
								)}
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</Card>

			<h3
				style={{ textAlign: "center", marginTop: "2em", marginBottom: "1em" }}
				className="only-print"
			>
				Employee Report Grouped by {tableKey}
			</h3>

			{showTable && (
				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>{tableKey}</TableCell>
										<TableCell align="left">Employee ID</TableCell>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">Department</TableCell>
										{/* <TableCell align="left">Contract</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row, idx) => (
										<TableRow
											key={idx}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{tableKey === "Job Title"
													? row.job_title
													: tableKey === "Pay Grade"
													? row.paygrade_level
													: tableKey === "Status"
													? row.status_type
													: row.contract_type}
											</TableCell>
											<TableCell align="left">{row.emp_id}</TableCell>
											<TableCell align="left">
												{row.first_name + " " + row.last_name}
											</TableCell>
											<TableCell align="left">{row.dept_name}</TableCell>
											{/* <TableCell align="left">{row.nopay}</TableCell> */}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			)}
		</>
	);
};

export default GroupedEmp;
