CREATE TABLE "goal" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" varchar(100) NOT NULL,
	"progressbar" boolean DEFAULT false,
	"high_priority" boolean DEFAULT false,
	"mode" varchar(100) DEFAULT 'none'
);
--> statement-breakpoint
CREATE TABLE "subgoal" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"goal_id" varchar(50),
	"title" varchar(255) NOT NULL,
	"priority" varchar(100) DEFAULT 'no priority',
	"phase" varchar(100) DEFAULT 'to do'
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "goal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subgoal" ADD CONSTRAINT "subgoal_goal_id_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goal"("id") ON DELETE cascade ON UPDATE no action;