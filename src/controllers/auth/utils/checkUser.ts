import User from "../../../models/user";

const checkUser = async (email: string) => {
  try {
    const user = await User.findOne({ email: email }).exec();

    if (user) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default checkUser;
