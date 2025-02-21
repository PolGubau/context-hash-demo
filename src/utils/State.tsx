import type { Context } from "../types";
import { dbAction } from "./db-interactions";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "default_secret";

async function deriveKey(secret: string) {
	const encoder = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "PBKDF2" },
		false,
		["deriveKey"],
	);

	return crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: encoder.encode("some_salt"), // Usa una sal fija para mantener consistencia
			iterations: 100000,
			hash: "SHA-256",
		},
		keyMaterial,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"],
	);
}

async function encryptData(data: string): Promise<string> {
	const key = await deriveKey(SECRET_KEY);
	const encoder = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12)); // IV aleatorio
	const encrypted = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv },
		key,
		encoder.encode(data),
	);

	// Concatenamos el IV con el texto cifrado
	const encryptedData = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
	return btoa(String.fromCharCode(...encryptedData)); // Convertimos a base64
}

async function decryptData(encryptedData: string): Promise<string> {
	const key = await deriveKey(SECRET_KEY);
	const encryptedArray = Uint8Array.from(atob(encryptedData), (c) =>
		c.charCodeAt(0),
	);

	const iv = encryptedArray.slice(0, 12); // Extraemos el IV
	const encryptedContent = encryptedArray.slice(12);

	const decrypted = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv },
		key,
		encryptedContent,
	);

	return new TextDecoder().decode(decrypted);
}

async function updateDB(hash: string, data: string): Promise<void> {
	await dbAction.put({ hash, data });
}

async function prepareState(ctx: Context) {
	const valuesToHash = JSON.stringify({
		name: ctx.name,
		age: ctx.age,
		email: ctx.email,
	});
	const stringified = JSON.stringify(ctx);

	const hash = await calculateHash(valuesToHash);
	const encryptedValue = await encryptData(stringified);
	await updateDB(hash, encryptedValue);
	return hash;
}

async function retrieveState(hash: string): Promise<Context | null> {
	const storedData = await dbAction.get(hash);
	if (storedData) {
		const decryptedData = await decryptData(storedData.data);
		return JSON.parse(decryptedData) as Context;
	}
	return null;
}

async function calculateHash(input: string): Promise<string> {
	const encoder = new TextEncoder();
	const normalizedInput = JSON.stringify(input, Object.keys(input).sort());
	const data = encoder.encode(normalizedInput);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export { prepareState, retrieveState };
