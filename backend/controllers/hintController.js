const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateHint = async (req, res) => {
  const { title, description, tables } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
You are a SQL tutor.

STRICT RULES:
- DO NOT provide the full SQL query.
- DO NOT provide the final solution.
- Give only conceptual hints.
- Keep response under 4 sentences.
- No code blocks.

Assignment Title:
${title}

Assignment Description:
${description}

Available Tables:
${tables.map(t => `${t.name}: ${t.schemaDefinition}`).join("\n")}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let hintText = response.text();

    // Extra safety layer (very important)
    if (/select\s+/i.test(hintText)) {
      hintText = "Think about which table contains the required data and which SQL clause helps filter or aggregate it.";
    }

    res.json({
      success: true,
      hint: hintText
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to generate hint"
    });
  }
};

module.exports = { generateHint };