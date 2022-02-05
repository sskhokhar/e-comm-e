import { PrismaClient } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';
export class UserService {
  private prismaClient = new PrismaClient();
  private userModel = this.prismaClient.user;
  private shoppingPreferenceModel = this.prismaClient.shoppingPreferenceList;
  constructor() {}

  async findByEmail(email: string) {
    const user = await this.userModel.findFirst({ where: { email } });
    return user;
  }
  async createUser(userData: User) {
    const password = await bcrypt.hash(userData.password, 10);
    const user = await this.userModel.create({ data: { ...userData, password } });
    return { ...user, password };
  }
  async addShoppingPreference(userId: string, data: { name: string }) {
    const shop = await this.shoppingPreferenceModel.create({
      data: {
        name: data.name,
        userId,
      },
    });
    return shop;
  }
  async findById(id: string) {
    return await this.userModel.findUnique({ where: { id }, include: { shoppingPreferenceList: true } });
  }
}
