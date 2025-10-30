import {port} from "./config/config"
import app from './app';

app.listen(port, (err) => {
  if (!err) {
    console.log(
      "Server is Succesfully Running and App is Listening on port " + port + " http://localhost:8080/" 
    );
  }else{
    console.error("Error Starting Server: " + err)
  }
});
