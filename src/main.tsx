import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { Layout } from "./layout";
import "./index.css";

const root = document.getElementById("root");
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(root!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Page1 />} />
				<Route path="page2" element={<Page2 />} />
				{/* <Route path="*" element={<div>404</div>} /> */}
			</Route>
		</Routes>
	</BrowserRouter>,
);
