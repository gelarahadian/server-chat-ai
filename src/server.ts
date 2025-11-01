import {port} from "./config/config"
import app from './app';
import connectDB from "./config/db";

app.listen(port, async (err) => {
  if (!err) {
    console.log(
      "Server is Succesfully Running and App is Listening on port " +
        port +
        " http://localhost:8080/"
    );
    // await connectDB();
  } else {
    console.error("Error Starting Server: " + err);
  }
});
