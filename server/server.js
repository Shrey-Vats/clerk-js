import mongoose from 'mongoose';

import app from './app.js';



async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
        console.log("✅✅✅ Successfully connected to database");

        app.listen(process.env.PORT, () => {
            console.log("✅✅✅ Server is running on port", process.env.PORT);
        })
    } catch (error) {
        console.log("❌❌❌ Error connecting to database", error);
    }
}

ConnectDB()