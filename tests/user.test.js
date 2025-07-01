const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');

describe('User Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /v1/user', () => {
    it('should create a new user', async () => {
      const userData = {
        firstname: 'João',
        surname: 'Silva',
        email: 'joao@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      const response = await request(app)
        .post('/v1/user')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return validation error for invalid data', async () => {
      const userData = {
        firstname: '',
        surname: 'Silva',
        email: 'invalid-email',
        password: '123',
        confirmPassword: '456'
      };

      const response = await request(app)
        .post('/v1/user')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /v1/user/token', () => {
    it('should generate JWT token for valid credentials', async () => {
      // Primeiro criar um usuário
      const userData = {
        firstname: 'Maria',
        surname: 'Santos',
        email: 'maria@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      await request(app)
        .post('/v1/user')
        .send(userData);

      // Tentar fazer login
      const loginData = {
        email: 'maria@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/v1/user/token')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'nonexistent@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/v1/user/token')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /v1/user/:id', () => {
    let userId;

    beforeAll(async () => {
      const userData = {
        firstname: 'Pedro',
        surname: 'Oliveira',
        email: 'pedro@test.com',
        password: '123456',
        confirmPassword: '123456'
      };

      const response = await request(app)
        .post('/v1/user')
        .send(userData);

      userId = response.body.id;
    });

    it('should return user by ID', async () => {
      const response = await request(app)
        .get(`/v1/user/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('email', 'pedro@test.com');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/v1/user/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
