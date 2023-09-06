import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.MONGO_CLOUD_URI as string || "mongodb://127.0.0.1:27017/encode"; 
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