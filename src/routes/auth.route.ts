import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers';
import { LoginDTO } from '../dtos';
import { RouteClass } from '../interfaces';
import { ValidateRequest } from '../utils';

const AuthRoutes = (): RouteClass => {
  const authController = AuthController();
  const tags = ['Auth'];
  return {
    path: '/auth',
    initializeRoutes: async (fastify: FastifyInstance) => {
      fastify.post(
        '/login',
        {
          ...ValidateRequest(LoginDTO, 'body'),
          schema: {
            tags,
            body: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
        authController.login,
      );
    },
  };
};
export { AuthRoutes };
