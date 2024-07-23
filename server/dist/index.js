"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const main_controller_1 = require("./controllers/main.controller");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
dotenv_1.default.config();
const port = process.env.PORT;
console.log(port);
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json({ limit: "5000mb" }));
app.post("/insertusers", main_controller_1.insertUsers);
app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
