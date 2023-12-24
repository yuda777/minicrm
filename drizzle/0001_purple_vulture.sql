ALTER TABLE "users" DROP CONSTRAINT "users_position_id_fkey";
--> statement-breakpoint
ALTER TABLE "batch_upload" DROP CONSTRAINT "batch_upload_upload_mapping_id_upload_mapping_upload_mapping_id";
--> statement-breakpoint
ALTER TABLE "customer" DROP CONSTRAINT "customer_status_id_fkey";
--> statement-breakpoint
ALTER TABLE "customer" DROP CONSTRAINT "customer_batch_upload_id_fkey";
--> statement-breakpoint
ALTER TABLE "customer_status" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "customer_status" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_position_id_position_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "position"("position_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_upload" ADD CONSTRAINT "batch_upload_upload_mapping_id_upload_mapping_upload_mapping_id_fk" FOREIGN KEY ("upload_mapping_id") REFERENCES "upload_mapping"("upload_mapping_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_status_id_customer_status_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "customer_status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_batch_upload_id_batch_upload_batch_upload_id_fk" FOREIGN KEY ("batch_upload_id") REFERENCES "batch_upload"("batch_upload_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
