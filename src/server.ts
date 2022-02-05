import App from './app';
import { AuthRoutes, UsersRoute } from './routes';

const app = new App([UsersRoute(), AuthRoutes()]);
app.listen();
