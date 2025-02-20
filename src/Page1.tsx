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
		</div>
	);
}

export default Page1;
