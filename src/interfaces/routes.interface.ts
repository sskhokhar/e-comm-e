import { FastifyInstance } from 'fastify';

export interface RouteClass {
  path?: string;
  initializeRoutes(fastify: FastifyInstance): Promise<void>;
}
