/**
 * Google Gemini API Service for Justiva Legal Intelligence
 * Uses correct, current Gemini model names
 */

export async function callGeminiApi({ prompt, systemInstruction, apiKey }) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) return null;

  // Correct, current Gemini model names in order of preference
  const models = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest'
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1500,
          topP: 0.9
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 20) {
          console.log(`✅ Gemini responded successfully using model: ${model}`);
          return { text: text.trim(), model };
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn(`Gemini model ${model} returned ${response.status}:`, errData?.error?.message || '');
      }
    } catch (err) {
      console.warn(`Gemini model ${model} attempt failed:`, err.message);
    }
  }

  console.warn('⚠️ All Gemini models failed. Falling back to built-in legal engine.');
  return null;
}
