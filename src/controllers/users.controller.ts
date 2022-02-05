import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services';

export function UserController() {
  const userService = new UserService();
  return {
    async create(req: FastifyRequest<any>, res: FastifyReply) {
      const user = await userService.createUser(req.body);
      res.send(user);
    },
    async addShoppingPreference(req: FastifyRequest<any>, res: FastifyReply) {
      const shop = await userService.addShoppingPreference(req.params.id, req.body);
      res.send(shop);
    },
    async getById(req: FastifyRequest<any>, res: FastifyReply) {
      const user = await userService.findById(req.params.id);
      if (!user) {
        throw new Error('Invalid user id');
      }
      res.send(user);
    },
  };
}
