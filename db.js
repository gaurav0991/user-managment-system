import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MONGO CONNECTED", cnn.connection.host.cyan.underline);
  } catch (error) {}
};

export default connectDb;
