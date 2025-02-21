import Dexie, { type EntityTable } from "dexie";
import type { EncryptedContext } from "../types";

const db = new Dexie("mesalvo") as Dexie & {
	contexts: EntityTable<EncryptedContext, "hash">;
};

db.version(1).stores({
	contexts: "hash, data",
});

export { db };
