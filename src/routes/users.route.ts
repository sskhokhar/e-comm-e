import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers';
import { AddShoppingPreferenceDTO, UserCreateDTO } from '../dtos';
import { RouteClass } from '../interfaces';
import { ValidateRequest } from '../utils';

const UsersRoute = (): RouteClass => {
  const userController = UserController();
  const tags = ['User'];
  return {
    path: '/users',
    initializeRoutes: async (fastify: any) => {
      fastify.post(
        '/',
        {
          ...ValidateRequest(UserCreateDTO, 'body'),

          schema: {
            tags,
            body: {
              type: 'object',
              properties: {
                fullName: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                dob: { type: 'string' },
              },
            },
          },
        },
        userController.create,
      );
      fastify.post(
        '/:id/shopping-preferences',
        {
          ...ValidateRequest(AddShoppingPreferenceDTO, 'body'),
          preValidation: fastify.auth([fastify.verifyJWT]),
          schema: {
            tags,
            params: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
              },
            },
            body: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
            },
          },
        },
        userController.addShoppingPreference,
      );
      fastify.get(
        '/:id',
        {
          preValidation: fastify.auth([fastify.verifyJWT]),
          schema: {
            tags,
            params: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'user id',
                },
              },
            },
          },
        },
        userController.getById,
      );
    },
  };
};
export { UsersRoute };
