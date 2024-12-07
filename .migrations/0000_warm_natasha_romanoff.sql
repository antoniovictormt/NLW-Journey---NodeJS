CREATE TABLE IF NOT EXISTS "trips" (
	"id" text PRIMARY KEY NOT NULL,
	"destination" text NOT NULL,
	"is_confirmed" boolean DEFAULT false NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
