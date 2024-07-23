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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUsers = void 0;
const tryCatch_1 = require("../helpers/tryCatch");
const migrate_service_1 = require("../service/migrate.service");
exports.insertUsers = (0, tryCatch_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Req");
    let { user, platform, filename } = req.body;
    const lowerCaseObject = convertKeysToLowerCase(user);
    console.log(lowerCaseObject);
    let migration = new migrate_service_1.Migration(lowerCaseObject, platform, filename);
    let response = yield migration.createUser();
    console.log(response);
    return res.status(200).json({ status: true });
}));
function convertKeysToLowerCase(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const lowerCaseKey = key.toLowerCase();
        acc[lowerCaseKey] = obj[key];
        return acc;
    }, {});
}
