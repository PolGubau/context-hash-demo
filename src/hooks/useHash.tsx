import { useEffect, useState } from "react";
import { retrieveState } from "../utils/State";
import type { Context } from "../types";

export const useHash = () => {
	const [hash, setHash] = useState(() => window.location.hash.slice(1));
	const [data, setData] = useState<Context | null>(null);
	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash.slice(1)); // Deleting the initial `#`
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			const data = await retrieveState(hash);
			setData(data);
		};
		fetchData();
	}, [hash]);

	const updateHash = (newHash: string) => {
		window.location.hash = newHash;
	};

	return { hash, updateHash, data };
};
