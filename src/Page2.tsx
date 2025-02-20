import { useHash } from "./hooks/useHash";
import { retrieveState } from "./utils/State";

function Page2() {
	const { hash } = useHash();
	const data = retrieveState(hash);
	return (
		<div>
			<h1>Page 2: Details or smt from hash</h1>
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

export default Page2;
