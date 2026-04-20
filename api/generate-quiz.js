export default async function handler(req, res) {
  const { theme } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Tu es une IA qui crée des quiz romance / romantasy.

Crée 5 questions au format JSON STRICT :

[
  {
    "question": "...",
    "answers": ["A","B","C","D"],
    "correct": 0,
    "type": "qcm | vrai-faux | citation"
  }
]

Thème : ${theme}
`
        }
      ]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  res.status(200).json({ quiz: JSON.parse(text) });
}
