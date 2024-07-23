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
exports.Migration = void 0;
const constants_1 = require("./constants");
const mysqldb_service_1 = __importDefault(require("./mysqldb.service"));
const db_service_1 = __importDefault(require("./db.service"));
class Migration {
    constructor(user, platfrom, filename) {
        this.user = user;
        this.platfrom = platfrom;
        this.filename = filename;
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO users (name, email, password, picture,  gender, age, ip, countryName, regionName, cityName, platform, device, device_model, mobile)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const values = [
                this.user.name,
                this.user.username,
                '',
                'http://18.130.99.164/placeholder.png',
                'male',
                18,
                this.user.ip,
                this.user.country,
                this.user.state,
                this.user.city,
                this.user.platform,
                this.user.device_brand,
                this.user.device_model,
                this.user.mobile,
            ];
            console.log("");
            mysqldb_service_1.default.getInstance((0, constants_1.getDBName)(this.platfrom)).query(query, values).then((result) => {
                console.log("Migrated" + result);
                console.dir(result);
                if (new Date(this.user.activesubscriptionenddate).getTime() < new Date().getTime()) {
                    this.createuserPayment(result.insertId);
                    this.migrationLog(result.insertId);
                }
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    createuserPayment(userId) {
        const query = `INSERT INTO user_payments ( subscription_id, user_id, order_id, payment_id, is_current, subscription_amount, amount, payment_mode, expiry_date, status, is_confirm,coupon_code,coupon_amount,from_auto_renewed,reason_auto_renewal_cancel,is_cancelled,is_coupon_applied,coupon_reason,reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [
            1, userId, this.user.order_id, 'migrated plan', 0, this.user.price, this.user.orderamount, this.user.paymentgateway, this.user.activesubscriptionenddate, 1, 1, '', 0, 0, '', 0, 0, '', ''
        ];
        mysqldb_service_1.default.getInstance((0, constants_1.getDBName)(this.platfrom)).query(query, values).then((result) => {
            console.log("Plan" + result);
        }).catch((err) => {
            console.log(err);
        });
    }
    migrationLog(userId) {
        const query = `INSERT INTO user_migration (user_id, migration_id, filename,platform) VALUES (?,?,?,?)`;
        const values = [
            userId, 0, this.filename, this.platfrom
        ];
        db_service_1.default.query(query, values);
    }
}
exports.Migration = Migration;
