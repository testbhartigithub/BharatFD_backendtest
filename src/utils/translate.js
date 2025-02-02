const translate = require('google-translate-api');

async function translateText(text, targetLang) {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

module.exports = { translateText };