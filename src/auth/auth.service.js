import User from "./user.model.js";

export class AuthService {
  async createUSer(data) {
    return await User.create(data);
  }
}
