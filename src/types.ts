export interface Context {
	hash: string;
	name: string;
	age: number;
	lastEdit: Date;
	email: string;
}
export interface EncryptedContext {
	hash: string;
	data: string;
}
