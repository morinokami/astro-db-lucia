import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Session, User, db } from "astro:db";
import { Lucia } from "lucia";

// @ts-expect-error
const adapter = new DrizzleSQLiteAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<typeof User, "id">;
	}
}
