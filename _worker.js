export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    // Post a new message
    if (req.method === "POST" && url.pathname === "/message") {
      const { text } = await req.json();
      if (!text) return new Response("Missing text", { status: 400 });

      const id = Date.now().toString(); // use timestamp as key
      await env.MESSAGES_KV.put(id, text);

      return new Response("OK", { status: 200 });
    }

    // Get all messages
    if (req.method === "GET" && url.pathname === "/messages") {
      const list = await env.MESSAGES_KV.list();
      const messages = await Promise.all(
        list.keys
          .sort((a, b) => b.name.localeCompare(a.name)) // newest first
          .map(async k => ({ id: k.name, text: await env.MESSAGES_KV.get(k.name) }))
      );

      return new Response(JSON.stringify(messages), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
}
