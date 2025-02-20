import { useEffect, useState } from "react";
import type { ContextMap } from "../types";
import { prepareState } from "../utils/State";
import { Link } from "react-router";
import { useHash } from "../hooks/useHash";

type Thing = {
	name: string;
	hash: string;
};

async function getThings() {
	const fromApi: ContextMap[] = [
		{
			hash: "ded987654320",
			name: "Alice",
			age: 20,
			email: "alice@random.com",
		},
		{
			hash: "xyz987654321",
			name: "Bob",
			age: 22,
			email: "bob@random.com",
		},
		{
			hash: "abc987654322",
			name: "Manuel",
			age: 45,
			email: "Manuel@almato.com",
		},
	];

	const parsedContexts: Thing[] = await Promise.all(
		fromApi.map(async (thing) => ({
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
		<aside className="h-full bg-neutral-200 border-l-2 border-neutral-500 px-4 flex flex-col gap-2 relative prose">
			<button
				className="absolute top-2 right-2 w-10 h-10 rounded-full bg-neutral-500 text-white"
				type="button"
				onClick={() => {
					alert("Cmon I'm just a demo");
				}}
			>
				X
			</button>
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
			</ul>{" "}
		</aside>
	);
};
