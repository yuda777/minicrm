ALTER TABLE "batch_upload" DROP CONSTRAINT "batch_upload_upload_mapping_id_upload_mapping_upload_mapping_id";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_upload" ADD CONSTRAINT "batch_upload_upload_mapping_id_upload_mapping_upload_mapping_id_fk" FOREIGN KEY ("upload_mapping_id") REFERENCES "upload_mapping"("upload_mapping_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
