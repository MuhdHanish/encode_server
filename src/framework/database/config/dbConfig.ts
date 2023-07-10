import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.MONGO_URI as string ;
const connectOptions: ConnectOptions | any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDatabase = async ():Promise<any> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, connectOptions).then(() => {
      resolve(`Database connected successfully...`);
    }).catch((error) => {
      reject(error);
    })
 })
};

export default connectDatabase;