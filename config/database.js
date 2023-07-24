import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI).then((con) => {
    console.log(`MongoDB Database connected with host: ${con.connection.host}`);
  });
};

export default connectDatabase;
