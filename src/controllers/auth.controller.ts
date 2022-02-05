import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../services/';

export function AuthController() {
  const authService = new AuthService();
  return {
    async login(req: FastifyRequest<any>, res: FastifyReply) {
      try {
        const data = await authService.login(req.body.email, req.body.password);
        console.log('🚀 ~ file: auth.controller.ts ~ line 10 ~ login ~ data', data);
        res.send(data);
      } catch (error) {
        throw error;
      }
    },
  };
}
