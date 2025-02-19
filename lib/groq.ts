import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export const AIChatSession = async (prompt: string) => {
  try {
    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "system", content: "You are an AI resume writing assistant." }, { role: "user", content: prompt }],
      temperature: 1,
      top_p: 0.95,
      response_format: { type: "json_object" }
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating text:", error);
    return "";
  }
};
