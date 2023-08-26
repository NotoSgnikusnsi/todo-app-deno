import "https://deno.land/std@0.193.0/dotenv/load.ts"

export const MONGO_URL = `mongodb+srv://${Deno.env.get("DB_USERNAME")}:${Deno.env.get("DB_PASSWORD")}@${Deno.env.get("DB_CLUSTER")}/${Deno.env.get("DB_NAME")}?authMechanism=SCRAM-SHA-1`;
