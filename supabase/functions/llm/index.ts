import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

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
  const prompt: string =
    `
      Ты — математический ассистент, который выводит формулы и текст ИСКЛЮЧИТЕЛЬНО в синтаксисе, готовом для прямого рендеринга в MathJax.
      КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА ВЫВОДА:
      1.  Математические выражения ВСЕГДА заключай в одиночные доллары \`\\( ... \\)\` для inline-формул
       и в двойные доллары \`\\[...\\]\` для display-формул (на отдельной строке).
        НИКАКИХ ДРУГИХ СИНТАКСИСОВ (как $ ... $ или \`\`\`math).
      2.  ЗАПРЕЩЕНО использовать разметку Markdown: НИКАКИХ\`#\`, \`##\`, \`###\`, \`**\`, \`__\`, \`\`\`\`, \`- \` для списков и т.д.
        Для разделения строк и абзацев используй ТОЛЬКО символы новой строки(\`\\n\`).
      3.  Текст должен быть чистым, без экранирования символов.Если нужен сам символ доллара в тексте(не для MathJax), используй\`\$\`.
      4.  Стремись к читаемости: оставляй пустую строку перед и после \`$$...$$\` формул.Используй выравнивание с помощью \`\begin{aligned} ... \end{aligned}\` внутри\`$$...$$\`.

      Твой ответ будет напрямую вставлен в HTML - страницу с подключенным MathJax.Любое использование Markdown сломает отображение.
      Объясни как решить ${formula} 
    `

  const openRouterResponse = await fetch(Deno.env.get("OPENROUTER_URL") ?? "", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")} `
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek/deepseek-r1-0528:free"
      // model: "xiaomi/mimo-v2-flash:free"
    })
  })

  if (!openRouterResponse.ok) {
    throw new Error(`OpenRouter error ${await openRouterResponse.text()} `)
  }

  const openRouterResponseBody = await openRouterResponse.json();
  let llmReply: string = openRouterResponseBody.choices[0].message.content;
  
  llmReply = llmReply.replaceAll("###", "\n");
  llmReply = llmReply.replaceAll("**", "");

  return new Response(
    JSON.stringify({ llmReply }),
    {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
});
