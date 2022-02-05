import { UserService } from './';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
export class AuthService {
  private userService = new UserService();
  constructor() {}
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    if (await bcrypt.compare(password, user.password)) {
      if (!user.isActive) {
        // throw new Error('User is not active');
      }
      const payload = {
        user,
      };
      const token = await this.signPayload(payload);
      const sanitized = { ...user } as Partial<User>;
      delete sanitized.password;
      return { user: sanitized, token };
    } else {
      throw new Error('Invalid email or password');
    }
  }
  private async signPayload(payload: any) {
    return sign(payload, process.env.JWT_SECRET || 'SOME_SECRET', { expiresIn: '7d' });
  }
}
