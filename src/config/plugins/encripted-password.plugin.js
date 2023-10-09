import bcrypt from "bcrypt";

export const encriptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(password, salt);
};
