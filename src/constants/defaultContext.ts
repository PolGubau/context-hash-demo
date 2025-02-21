import type { Context } from "../types";

export const FROM_API: Context[] = [
	{
		hash: "ded987654320",
		name: "Alice",
		age: 20,
		email: "alice@random.com",
		lastEdit: new Date("2021-10-10"),
	},
	{
		hash: "xyz987654321",
		name: "Bob",
		age: 22,
		email: "bob@random.com",
		lastEdit: new Date("2021-10-11"),
	},
	{
		hash: "abc987654322",
		name: "Manuel",
		age: 45,
		email: "Manuel@almato.com",
		lastEdit: new Date("2021-10-12"),
	},
	{
		hash: "mno987654323",
		name: "Tamir",
		age: 42,
		email: "tamir@meona.com",
		lastEdit: new Date("2021-10-13"),
	},
];
