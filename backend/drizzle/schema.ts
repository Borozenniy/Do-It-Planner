import { pgTable, unique, uuid, varchar, timestamp, foreignKey, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	auth0Id: varchar("auth0_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("user_email_unique").on(table.email),
	unique("user_auth0_id_unique").on(table.auth0Id),
]);

export const goal = pgTable("goal", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	progressBar: boolean("progress_bar").default(false),
	highPriority: boolean("high_priority").default(false),
	mode: varchar({ length: 100 }).default('none'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "goal_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const subgoal = pgTable("subgoal", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	goalId: uuid("goal_id"),
	title: varchar({ length: 255 }).notNull(),
	priority: varchar({ length: 100 }).default('no priority'),
	phase: varchar({ length: 100 }).default('to do'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.goalId],
			foreignColumns: [goal.id],
			name: "subgoal_goal_id_goal_id_fk"
		}).onDelete("cascade"),
]);
