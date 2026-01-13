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
  const prompt: string = `Объясни как решить ${formula}`;

  const openRouterResponse = await fetch(Deno.env.get("OPENROUTER_URL") ?? "", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek/deepseek-r1-0528:free"
    })
  })

  if (!openRouterResponse.ok) {
    throw new Error(`OpenRouter error ${await openRouterResponse.text()}`)
  }

  const openRouterResponseBody = await openRouterResponse.json();
  const llmReply: string = openRouterResponseBody.choices[0].message.content;

  return new Response(
    JSON.stringify({ llmReply }),
    { headers: { "Content-Type": "application/json" } }
  );
});
