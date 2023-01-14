import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const accessToken = sessionStorage.getItem("access-token");

const useAccessControl = (role, access_level) => {
	const [authCheck, setAuthCheck] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + "/api/user-access/auth",
				{
					role: role,
					access_level: access_level,
				},
				{
					headers: {
						"access-token": `${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(role, access_level);
				console.log(res.data);
				if (
					res.data.length != 0 &&
					res.data[0].role === role &&
					res.data[0].access_level === access_level
				) {
					setAuthCheck(true);
				} else {
					setAuthCheck(false);
					navigate("/dashboard/app/", {
						state: {
							showToast: true,
							toastMessage: "Access Denied!",
						},
					});
				}
			});
	}, []);

	return [authCheck];
};

export default useAccessControl;
