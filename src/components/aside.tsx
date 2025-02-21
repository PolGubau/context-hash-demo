import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FROM_API } from "../constants/defaultContext";
import { useHash } from "../hooks/useHash";
import { prepareState } from "../utils/State";

type Thing = {
	name: string;
	hash: string;
};

async function getThings() {
	const parsedContexts: Thing[] = await Promise.all(
		FROM_API.map(async (thing) => ({
			name: thing.name,
			hash: await prepareState(thing),
		})),
	);

	return parsedContexts;
}
export const Aside = () => {
	const { hash, updateHash } = useHash();

	const [things, setThings] = useState<Thing[]>([]);
	useEffect(() => {
		getThings().then((myThings) => {
			setThings(myThings);
		});
	}, []);
	return (
		<aside className="h-full bg-neutral-200 border-l-2 border-neutral-500 p-4 gap-2 relative prose grid grid-rows-[1fr_auto]">
			<button
				className="absolute top-2 right-2 w-10 h-10 rounded-full bg-neutral-500 text-white"
				type="button"
				onClick={() => {
					alert("Cmon I'm just a demo");
				}}
			>
				X
			</button>
			<header>
				<h2>Contexts:</h2>
				<ul>
					{things.map((thing) => (
						<li key={thing.hash}>
							<Link
								to={`#${thing.hash}`}
								className={`${
									hash === thing.hash ? "text-red-800" : "text-black"
								}`}
								onClick={() => updateHash(thing.hash)}
							>
								{thing.name}
							</Link>
						</li>
					))}
				</ul>
			</header>
			<footer className="not-prose">
				<button
					onClick={() => updateHash("")}
					type="button"
					className="p-2 bg-neutral-300 w-full text-neutral-800 hover:bg-neutral-400"
				>
					Clear hash (idk why you would do that)
				</button>
			</footer>
		</aside>
	);
};
