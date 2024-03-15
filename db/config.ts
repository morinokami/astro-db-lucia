import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		username: column.text({ unique: true }),
		password: column.text(),
	},
});

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.number({ name: "expires_at" }),
		userId: column.text({
			name: "user_id",
			references: () => User.columns.id,
		}),
	},
});

// https://astro.build/db/config
export default defineDb({
	tables: {
		User,
		Session,
	},
});
