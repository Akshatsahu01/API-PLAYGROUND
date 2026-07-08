import app from "./app.js"
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});
console.log(process.cwd())
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})