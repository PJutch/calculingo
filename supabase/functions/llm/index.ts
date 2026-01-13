import { createClient } from "npm:@supabase/supabase-js";

Deno.serve(async (req) => {
  const { task } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data, error } = await supabase.from("tasks").select("formula").eq("id", task).single();
  if (!data) {
    throw error || new Error("Unexpected db error")
  }
  const formula: string = data.formula;

  return new Response(
    JSON.stringify({ formula }),
    { headers: { "Content-Type": "application/json" } }
  );
});
