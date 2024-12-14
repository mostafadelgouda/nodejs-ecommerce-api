
const mongoose: any = require("mongoose");

const dbConnection = (): void => {
  mongoose
    .connect(process.env.DB_URI as string, {
      autoIndex: true,
    })
    .then((conn: any) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    });
};
export default dbConnection;
