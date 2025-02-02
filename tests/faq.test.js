const request = require('supertest');
const app = require('../src/app');
const { FAQ } = require('../src/models/faq');

describe('FAQ API', () => {
  it('should create a new FAQ', async () => {
    const res = await request(app)
      .post('/api/faqs')
      .send({
        question: 'Test question?',
        answer: 'Test answer.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all FAQs', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get translated FAQs', async () => {
    const res = await request(app).get('/api/faqs?lang=hi');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('FAQ Model', () => {
  it('should return correct translation', () => {
    const faq = new FAQ(1, 'Question', 'Answer', { hi: { question: 'प्रश्न', answer: 'उत्तर' } });
    expect(faq.getTranslation('hi')).toEqual({ question: 'प्रश्न', answer: 'उत्तर' });
    expect(faq.getTranslation('en')).toEqual({ question: 'Question', answer: 'Answer' });
  });
});