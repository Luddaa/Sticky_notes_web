import app from "./app";
import mongoose from "mongoose";





const port = process.env.PORT;

//connect to mongoose
mongoose.connect(process.env.MONGO_STRING!)
    .then(() => {
        console.log("Connected to Mongoose");
        app.listen(port, () => {
            console.log("Server started on port " + port);
        });
    })
    .catch(console.error);