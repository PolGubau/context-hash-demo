import { useState } from "react";
import { db } from "../db";

type AddContextFormProps = {
	defaultAge?: number;
};

export function AddContextForm({ defaultAge = 18 }: AddContextFormProps) {
	const [name, setName] = useState("");
	const [age, setAge] = useState(defaultAge);
	const [status, setStatus] = useState("");

	async function addContext() {
		try {
			// Add the new context to the list!
			const id = await db.contexts.add({
				name,
				age,
				email: `${name}@example.com`,
			});

			setStatus(`Friend ${name} successfully added. Got id ${id}`);
			setName("");
			setAge(defaultAge);
		} catch (error) {
			setStatus(`Failed to add ${name}: ${error}`);
		}
	}

	return (
		<div style={{ border: "1px solid black", padding: "1em" }}>
			<h2>Add a new friend</h2>
			<p>{status}</p>
			Name:
			<input
				type="text"
				value={name}
				onChange={(ev) => setName(ev.target.value)}
			/>
			Age:
			<input
				type="number"
				value={age}
				onChange={(ev) => setAge(Number(ev.target.value))}
			/>
			<button type="button" onClick={addContext}>
				Add
			</button>
		</div>
	);
}
