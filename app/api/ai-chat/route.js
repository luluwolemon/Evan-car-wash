import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `
You are a helpful assistant for Luc & Evan Car Wash in Surrey BC.

Business info:
Location: Surrey BC
Phone: 236-982-2823
Hours: 8am - 7pm daily

Services:
Basic Wash $10
Interior Clean $15
Full Wash $25

Answer customer questions about:
- pricing
- booking
- location
- services
- hours

Customer question:
${message}
`,
  });

  return Response.json({
    reply: response.output_text,
  });
}