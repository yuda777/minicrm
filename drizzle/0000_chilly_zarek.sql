-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "upload_mapping" (
	"upload_mapping_id" serial PRIMARY KEY NOT NULL,
	"mapping_name" varchar(50),
	"mapping_description" text,
	"field_excel" varchar(50),
	"field_table" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batch_upload" (
	"batch_upload_id" serial PRIMARY KEY NOT NULL,
	"upload_mapping_id" integer,
	"filename" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"email" varchar(100),
	"phone" varchar(20),
	"address" varchar(255),
	"birth_date" date,
	"registration_date" timestamp DEFAULT now(),
	"batch_upload_id" integer,
	"status_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "position" (
	"position_id" serial PRIMARY KEY NOT NULL,
	"title_code" varchar(6) NOT NULL,
	"title_desc" varchar(50) NOT NULL,
	"departement_code" varchar(6),
	"departement_desc" varchar(50),
	"description" text,
	"color_code" varchar(10),
	"status_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_performance" (
	"performance_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"photo" varchar(50),
	"colorhex" varchar(6),
	"name" varchar(50),
	"performance_score" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"position_id" integer,
	"parent_id" integer,
	"photo" varchar(100),
	"email" varchar(100),
	"phone_number" varchar(15),
	"hire_date" date,
	"status_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_upload" ADD CONSTRAINT "batch_upload_upload_mapping_id_upload_mapping_upload_mapping_id" FOREIGN KEY ("upload_mapping_id") REFERENCES "upload_mapping"("upload_mapping_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_batch_upload_id_batch_upload_batch_upload_id_fk" FOREIGN KEY ("batch_upload_id") REFERENCES "batch_upload"("batch_upload_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_position_id_position_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "position"("position_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/