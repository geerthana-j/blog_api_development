import request from 'supertest';
import app from '../src/app';

describe('Post Controller', () => {
  it('should get all posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Write more tests for other controller functions
});
