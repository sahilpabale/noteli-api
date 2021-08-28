import User from "../../../models/user";

const addUser = async (email: string, name: string, auth0Id: string) => {
  try {
    const newUser = new User({
      auth0Id,
      email,
      name,
      createdAt: new Date(),
    });
    await newUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default addUser;
