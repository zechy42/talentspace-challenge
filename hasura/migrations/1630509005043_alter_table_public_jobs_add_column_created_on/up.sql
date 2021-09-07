ALTER TABLE "public"."jobs" ADD COLUMN "created_on" timestamptz NULL DEFAULT now();
