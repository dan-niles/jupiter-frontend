import { AuthProvider } from "./context/auth-context";
import { UserContextProvider } from "./context/user-context";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
	return (
		<UserContextProvider>
			<ThemeProvider>
				<Router />
			</ThemeProvider>
		</UserContextProvider>
	);
}

export default App;
