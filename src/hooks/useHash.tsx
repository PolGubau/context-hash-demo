import { useEffect, useState } from "react";
import { retrieveState } from "../utils/State";

export const useHash = () => {
	const [hash, setHash] = useState(() => window.location.hash.slice(1));

	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash.slice(1)); // Deleting the initial `#`
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const updateHash = (newHash: string) => {
		window.location.hash = newHash;
	};

	const data = retrieveState(hash);

	return { hash, updateHash, data };
};
