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

const EmpByDept = () => {
	const [departments, setDepartments] = useState([]);
	const [records, setRecords] = useState([]);

	const [deptName, setDeptName] = useState("All");

	const [showTable, setShowTable] = useState(false);

	const getDepartments = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/department/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setDepartments(res.data);
			});
	};

	useEffect(() => {
		getDepartments();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + "/api/reports/emp-by-department",
				{
					dept_name: deptName === "All" ? null : deptName,
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
									<TextField
										id="department"
										select
										label="Department"
										sx={{ width: "25ch" }}
										value={deptName}
										onChange={(e) => {
											setDeptName(e.target.value);
										}}
									>
										<MenuItem key="All" value="All">
											All
										</MenuItem>
										{departments.map((row, idx) => {
											return (
												<MenuItem key={idx} value={row.dept_name}>
													{row.dept_name}
												</MenuItem>
											);
										})}
									</TextField>
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
				Employee Report for {deptName} Department{deptName === "All" && "s"}
			</h3>

			{showTable && (
				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Department</TableCell>
										<TableCell align="left">Employee ID</TableCell>
										<TableCell align="left">Employee Name</TableCell>
										<TableCell align="left">Job Title</TableCell>
										<TableCell align="left">Contract Type</TableCell>
										<TableCell align="left">Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row) => (
										<TableRow
											key={row.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.dept_name}
											</TableCell>
											<TableCell align="left">{row.emp_id}</TableCell>
											<TableCell align="left">
												{row.first_name + " " + row.last_name}
											</TableCell>
											<TableCell align="left">{row.job_title}</TableCell>
											<TableCell align="left">{row.contract_type}</TableCell>
											<TableCell align="left">{row.status_type}</TableCell>
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

export default EmpByDept;
