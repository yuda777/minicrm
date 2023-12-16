ALTER TABLE "customer" ADD COLUMN "customer_name" varchar(50);--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "position" DROP COLUMN IF EXISTS "color_code";