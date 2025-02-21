import { useHash } from "./hooks/useHash";

function Page2() {
	const { data } = useHash();
	return (
		<div>
			<h1>Page 2: Details or smt</h1>
			{data ? (
				<div>
					Retrieved Data from hash:
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			) : (
				<p>No data found for the given hash.</p>
			)}
		</div>
	);
}

export default Page2;
