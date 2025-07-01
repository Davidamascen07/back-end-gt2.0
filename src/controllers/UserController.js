const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class UserController {
  // GET /v1/user/:id - Obter usuário por ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // POST /v1/user - Criar usuário
  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { firstname, surname, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({
          error: 'As senhas não coincidem'
        });
      }

      const user = await User.create({
        firstname,
        surname,
        email,
        password
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  // PUT /v1/user/:id - Atualizar usuário
  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const { firstname, surname, email } = req.body;

      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      await user.update({
        firstname,
        surname,
        email
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // DELETE /v1/user/:id - Deletar usuário
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      await user.destroy();
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // POST /v1/user/token - Gerar token JWT
  async generateToken(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(400).json({
          error: 'Credenciais inválidas'
        });
      }

      const isValidPassword = await user.checkPassword(password);
      
      if (!isValidPassword) {
        return res.status(400).json({
          error: 'Credenciais inválidas'
        });
      }

      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
