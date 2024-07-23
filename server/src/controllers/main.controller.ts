import Database from "../service/mysqldb.service";
import { tryCatchFn } from "../helpers/tryCatch";
import { Migration } from "../service/migrate.service"; import { Request, Response } from "express";
import { getDBName } from "../service/constants";
type AnyObject = { [key: string]: any };

export const insertUsers = tryCatchFn(async (req: Request, res: Response) => {

    console.log("Req")

    let { user, platform, filename } = req.body;
    const lowerCaseObject = convertKeysToLowerCase(user);
    console.log(lowerCaseObject);
    Database.getInstance(getDBName(platform)).query(`SELECT id FROM users WHERE email = ? OR mobile = ?`, [lowerCaseObject.username, lowerCaseObject.mobile]).then(async (result: any) => {


        if (result.length == 1) {
            return res.status(200).json({ status: true })
        }
        let migration = new Migration(lowerCaseObject, platform, filename);

        let response = await migration.createUser();

        console.log(response);

        return res.status(200).json({ status: true })



    }).catch((err) => {
        console.log(err)
    });






});

function convertKeysToLowerCase<T extends AnyObject>(obj: T): { [K in Lowercase<keyof T & string>]: T[keyof T] } {
    return Object.keys(obj).reduce((acc, key) => {
        const lowerCaseKey = key.toLowerCase() as Lowercase<typeof key>;
        (acc as AnyObject)[lowerCaseKey] = obj[key];
        return acc;
    }, {} as { [K in Lowercase<keyof T & string>]: T[keyof T] });
}