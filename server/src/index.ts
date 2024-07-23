import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import cors from "cors";
import { insertUsers } from "./controllers/main.controller";
import express, { Request, Response } from 'express';



const app = express();
app.use(FileUpload());

dotenv.config();
const port = process.env.PORT;

console.log(port);

app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "5000mb" }));


app.post("/insertusers", insertUsers);

app.get('/status', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running' });
  });
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



