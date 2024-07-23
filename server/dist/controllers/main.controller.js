"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUsers = void 0;
const mysqldb_service_1 = __importDefault(require("../service/mysqldb.service"));
const tryCatch_1 = require("../helpers/tryCatch");
const migrate_service_1 = require("../service/migrate.service");
const constants_1 = require("../service/constants");
exports.insertUsers = (0, tryCatch_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Req");
    let { user, platform, filename } = req.body;
    const lowerCaseObject = convertKeysToLowerCase(user);
    console.log(lowerCaseObject);
    mysqldb_service_1.default.getInstance((0, constants_1.getDBName)(platform)).query(`SELECT id FROM users WHERE email = ? OR mobile = ?`, [lowerCaseObject.username, lowerCaseObject.mobile]).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result.length == 1) {
            return res.status(200).json({ status: true });
        }
        let migration = new migrate_service_1.Migration(lowerCaseObject, platform, filename);
        let response = yield migration.createUser();
        console.log(response);
        return res.status(200).json({ status: true });
    })).catch((err) => {
        console.log(err);
    });
}));
function convertKeysToLowerCase(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const lowerCaseKey = key.toLowerCase();
        acc[lowerCaseKey] = obj[key];
        return acc;
    }, {});
}
