import { useHash } from "./hooks/useHash";
import { retrieveState } from "./utils/State";

function Page1() {
	const { hash } = useHash();
	const data = retrieveState(hash);
	return (
		<div>
			<h1>Page 1: List or smt</h1>

			{data ? (
				<p>
					Retrieved Data from hash:
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</p>
			) : (
				<p>No data found for the given hash.</p>
			)}

			<h2> Some thoughts about the context thing</h2>

			<details>
				<summary>The misunderstanding</summary>
				<p>
					This is cool, we have our common hash that searches in the{" "}
					<b>local storage</b> for the data. Works fine but because we are
					retrieving exactly the same data we want to see.{" "}
					<em>Will always be like that?</em>
				</p>
				<p>
					The misunderstanding from Matthias vs pol+francesco was that we
					thought that all the context thing was like a complex "redux" state
					that evolves with your flow in the app.
				</p>
			</details>

			<details>
				<summary>Context idea</summary>
				<p>
					We get the cool part of the hash as "it does not matter" where you
					open the new page (if you already have this hash in the local
					storage).
				</p>
				<p>
					Now as I get (@pol), the contexts are a "history" of possible context
					combinations, we will be saving them in localstorage/indexdb
					(eventually sending them to the backend or deleting the old ones to
					save space)
				</p>
			</details>

			<details>
				<summary>Still Doubts</summary>
				<ul>
					<li>When and how will we call the backend</li>
					<li>Will the backend be as a "more complete" source of context?</li>
					<li>
						What if we never saved that object and the data from the api is not
						what we want in the context
					</li>
					<li>
						What if the server has no idea about the hash we have in the url
					</li>
				</ul>
			</details>
		</div>
	);
}

export default Page1;
