import type { EncryptedContext } from "../types";
import { db } from "./db";

/**
 * Function to add or edit a context in the database.
 */
const put = async (
	context: EncryptedContext,
): Promise<EncryptedContext | null> => {
	try {
		await db.contexts.put(context);
		console.log("Context edited successfully.");
		return context;
	} catch (error) {
		console.error("Failed to edit context:", error);
		return null;
	}
};

const get = async (hash: string): Promise<EncryptedContext | null> => {
	try {
		const context = await db.contexts.get(hash);
		return context || null;
	} catch (error) {
		console.error("Error fetching context:", error);
		return null;
	}
};

export const getAll = async (): Promise<EncryptedContext[]> => {
	return db.contexts.toArray();
};

export const dbAction = {
	put,
	get,
	getAll,
};
