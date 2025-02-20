import Dexie, { type EntityTable } from "dexie";

interface ContextMap {
	hash: string;
	name: string;
	age: number;
	email: string;
}

const db = new Dexie("FriendsDatabase") as Dexie & {
	contexts: EntityTable<
		ContextMap,
		"hash" // primary key "hash" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	contexts: "++hash, name, age, email", // primary key "hash" (for the runtime!)
});

export type { ContextMap };
export { db };
