import User from "./user.model.js";

export class AuthService {
  async createUSer(data) {
    return await User.create(data);
  }

  async finOneUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
        status: true,
      },
    });
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async findOneUserById(id) {
    return await User.findOne({
      where: {
        id,
        status: true,
      },
    });
  }
}
