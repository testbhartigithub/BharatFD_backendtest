class FAQ {
    constructor(id, question, answer, translations = {}) {
      this.id = id;
      this.question = question;
      this.answer = answer;
      this.translations = translations;
    }
  
    getTranslation(lang) {
      if (lang === 'en' || !this.translations[lang]) {
        return { question: this.question, answer: this.answer };
      }
      return this.translations[lang];
    }
  }
  
  const faqs = [];
  
  module.exports = { FAQ, faqs };