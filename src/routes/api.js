const express = require('express');
const router = express.Router();
const { FAQ, faqs } = require('../models/faq');
const { translateText } = require('../utils/translate');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

router.get('/faqs', (req, res) => {
  const lang = req.query.lang || 'en';
  const cachedFaqs = cache.get(`faqs_${lang}`);
  
  if (cachedFaqs) {
    return res.json(cachedFaqs);
  }

  const translatedFaqs = faqs.map(faq => faq.getTranslation(lang));
  cache.set(`faqs_${lang}`, translatedFaqs);
  res.json(translatedFaqs);
});

router.post('/faqs', async (req, res) => {
  const { question, answer } = req.body;
  const newFaq = new FAQ(faqs.length + 1, question, answer);

  // Automatic translation to Hindi (as an example)
  const questionHi = await translateText(question, 'hi');
  const answerHi = await translateText(answer, 'hi');
  newFaq.translations['hi'] = { question: questionHi, answer: answerHi };

  faqs.push(newFaq);
  res.status(201).json(newFaq);
});

module.exports = router;