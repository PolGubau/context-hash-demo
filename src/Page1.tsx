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

			<div className="outline">
				This is cool, we have our common hash that searches in the local storage
				for the data. Works fine but because we are retrieving exactly the same
				data we want to see. Will always be like that?
			</div>
		</div>
	);
}

export default Page1;
