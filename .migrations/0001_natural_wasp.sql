CREATE TABLE IF NOT EXISTS "participants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"is_confirmed" boolean DEFAULT false NOT NULL,
	"is_owner" boolean DEFAULT false NOT NULL,
	"trip_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "destination" SET DATA TYPE varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
