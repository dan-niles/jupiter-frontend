import { useState, createContext } from "react";

const UserContext = createContext({ setData: () => {} });

export const UserContextProvider = (props) => {
	const user_data = JSON.parse(sessionStorage.getItem("user-data"));

	const [userData, setUserData] = useState(user_data);

	function setData(data) {
		setUserData(data);
	}

	return (
		<UserContext.Provider value={{ userData, setData }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContext;
