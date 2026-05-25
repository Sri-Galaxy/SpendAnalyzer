import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("❌ Failed to start server: ", error);
    process.exit(1);
});
