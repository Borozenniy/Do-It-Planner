import {
  pgTable,
  uuid,
  varchar,
  boolean,
  pgEnum,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const modeEnum = pgEnum('mode_enum', ['none', 'kanban', 'eisenhower']);
const phaseEnum = pgEnum('phase_enum', ['to do', 'in progress', 'done']);
const priorityEnum = pgEnum('priority_enum', [
  'no priority',
  'low',
  'medium',
  'high',
]);

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  auth0Id: varchar('auth0_id', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const goals = pgTable('goal', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  name: varchar('name', { length: 100 }).notNull(),
  progressBar: boolean('progress_bar').default(false),
  highPriority: boolean('high_priority').default(false),
  mode: varchar('mode', { length: 100 }).default('none'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const subgoals = pgTable('subgoal', {
  id: uuid('id').primaryKey().defaultRandom(),
  goalId: uuid('goal_id').references(() => goals.id, {
    onDelete: 'cascade',
  }),
  title: varchar('title', { length: 255 }).notNull(),
  priority: varchar('priority', { length: 100 }).default('no priority'),
  phase: varchar('phase', { length: 100 }).default('to do'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
}));

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
  subgoals: many(subgoals),
}));

export const subgoalsRelations = relations(subgoals, ({ one }) => ({
  goal: one(goals, {
    fields: [subgoals.goalId],
    references: [goals.id],
  }),
}));
