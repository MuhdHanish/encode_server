import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUsernameOrEmailAndPassword: (usernameOrEmail: string, password: string) => Promise<User | null>;
  create: (user: User) => Promise<User | null>;
  getUsers: () => Promise<User[] | null>;
  getUsersCount: () => Promise<number | null>;
  getUsersByRole: (role: string) => Promise<User[] | null>;
  getUsersCountByRole: (role:string) => Promise<number | null>;
  blockUser: (userId: string) => Promise<User | null>;
  unBlockUser: (userId: string) => Promise<User | null>;
  googleUserCreate: (user: User) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {
  const findByUsernameAndEmail = async (username: string, email: string): Promise<User | null> => {
    try {
      const user = await userModel.findOne({ $or: [{ username }, { email }] }).exec();
      return user !== null ? user.toObject() : null;
    } catch (error) {
      console.error("Error finding user by username and email:", error);
      return null;
    }
  };

  const findByUsernameOrEmailAndPassword = async (
    usernameOrEmail: string,
    password: string
  ): Promise<User | null> => {
    try {
      const user = await userModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      }).exec();
      if (user) {
        const passwordMatch = bcrypt.compareSync(password, user.password as string);
        if (passwordMatch) {
          if (user.role === "admin") {
            const { _id, role, status, profile } = user.toObject();
            return { _id, role, status, profile };
          } else {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Error finding user by username or email and password:", error);
      return null;
    }
  };

  const create = async (userDetails: User): Promise<User | null> => {
    try {
      const hashPass: string = bcrypt.hashSync(userDetails.password as string, 12);
      const userData: User = {
        username: userDetails.username,
        email: userDetails.email,
        password: hashPass,
        role: userDetails.role,
        isGoogle: false,
      };
      const createdUser = (await userModel.create(userData)).toObject();
      if (createdUser) {
        const { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  const getUsers = async (): Promise<User[] | null> => {
    try {
      const users = await userModel.find({role:{$ne:"admin"}},{password:0});
      if (users) {
        return users;
      }
      return null;
    } catch (error) {
      console.error("Error get users:", error);
      return null;
    }
  };

  const getUsersCount = async (): Promise<number | null> => {
    try {
      const count = await userModel.find({role:{$ne:"admin"}}).countDocuments();
      if (count) {
        return count;
      }
      return null;
    } catch (error) {
      console.error("Error get users count:", error);
      return null;
    }
  };

  const getUsersByRole = async (role: string): Promise<User[] | null> => {
    try {
      const users = await userModel.find({ role },{password:0});
      if (users) {
        return users;
      }
      return null;
    } catch (error) {
      console.error("Error get users by role:", error);
      return null;
    }
  };

  const getUsersCountByRole = async (role:string): Promise<number | null> => {
    try {
      const count = await userModel.find({role}).countDocuments();
      if (count) {
        return count;
      }
      return null;
    } catch (error) {
      console.error("Error get users count by role:", error);
      return null;
    }
  };

  const blockUser = async (userId: string): Promise<User | null> => {
    try {
      const user = await userModel.findByIdAndUpdate(userId, { $set: { status: false } }, { new: true });
      const { password, ...userWthOutPassword} = user?.toObject() as User;
      return userWthOutPassword ? userWthOutPassword : null;
    } catch (error) {
      console.error("Error block user:", error);
      return null;
    }
  }

  const unBlockUser = async (userId: string): Promise<User | null> => {
    try {
      const user = await userModel.findByIdAndUpdate(userId, { $set: { status: true } }, { new: true });
     const { password, ...userWthOutPassword } = user?.toObject() as User;
     return userWthOutPassword ? userWthOutPassword : null;
    } catch (error) {
      console.error("Error un block:", error);
      return null;
    }
  }

  const googleUserCreate = async (userDetails: User): Promise<User | null> => {
    try {
      const hashPass: string = bcrypt.hashSync(userDetails.email as string, 12);
      const userData: User = {
        username: userDetails.username,
        email: userDetails.email,
        password: hashPass,
        role: userDetails.role,
        profile: userDetails.profile,
        isGoogle: true,
      };
      const createdUser = (await userModel.create(userData)).toObject();
      if (createdUser) {
        const { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      console.error("Error creating Google user:", error);
      return null;
    }
  };

  return {
    create,
    findByUsernameAndEmail,
    findByUsernameOrEmailAndPassword,
    getUsersByRole,
    getUsers,
    getUsersCount,
    blockUser,
    unBlockUser,
    getUsersCountByRole,
    googleUserCreate,
  };
};