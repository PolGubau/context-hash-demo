import type { ContextMap } from "../types";

async function calculateHash(input: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

const KEY = "myFriends";

function getLocalStorageMap() {
	// Retrieve the existing data from localStorage
	const storedData = localStorage.getItem(KEY);

	// Deserialize the data into a Map
	let dataMap: Map<string, string> = new Map();
	if (storedData) {
		try {
			const parsedObject = JSON.parse(storedData);
			dataMap = new Map(Object.entries(parsedObject));
		} catch (error) {
			console.error("Failed to parse localStorage data:", error);
		}
	}

	return dataMap;
}

function updateLocalStorageMap(key: string, value: string): void {
	const dataMap = getLocalStorageMap();

	// Add or update the key in the map
	dataMap.set(key, value);

	// Serialize the Map back to a JSON string and store it
	localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(dataMap)));
}

async function prepareState(ctx: ContextMap) {
	const stringified = JSON.stringify(ctx);
	const hash = await calculateHash(stringified);
	updateLocalStorageMap(hash, stringified);
	return hash;
}

function retrieveState(hash: string) {
	const storedData = getLocalStorageMap();
	const data = storedData.get(hash);
	if (data) {
		return JSON.parse(data) as ContextMap;
	}
	return null;
}

export { prepareState, retrieveState };
