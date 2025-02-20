import { useEffect, useState } from "react";

export const useHash = () => {
	const [hash, setHash] = useState(() => window.location.hash.slice(1));

	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash.slice(1)); // Eliminamos el `#` inicial
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const updateHash = (newHash: string) => {
		window.location.hash = newHash;
	};

	return { hash, updateHash };
};
