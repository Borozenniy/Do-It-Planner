import { relations } from "drizzle-orm/relations";
import { user, goal, subgoal } from "./schema";

export const goalRelations = relations(goal, ({one, many}) => ({
	user: one(user, {
		fields: [goal.userId],
		references: [user.id]
	}),
	subgoals: many(subgoal),
}));

export const userRelations = relations(user, ({many}) => ({
	goals: many(goal),
}));

export const subgoalRelations = relations(subgoal, ({one}) => ({
	goal: one(goal, {
		fields: [subgoal.goalId],
		references: [goal.id]
	}),
}));