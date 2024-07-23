import { getDBName } from "./constants";
import Database from "./mysqldb.service";
import DatabaseHLS from "./db.service";


export class Migration {
    user: any;
    platfrom: string
    filename:string

    constructor(user: any, platfrom: string,filename:string) {
        this.user = user;
        this.platfrom = platfrom;
        this.filename =filename
    }

    async createUser() {
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

        console.log("")

        Database.getInstance(getDBName(this.platfrom)).query(query, values).then((result: any) => {
            console.log("Migrated" + result);
            console.dir(result);
            if (new Date(this.user.activesubscriptionenddate).getTime() < new Date().getTime()) {
                this.createuserPayment(
                    result.insertId
                )
                this.migrationLog(result.insertId)

            }
        }).catch((err) => {
            console.log(err)
        });



    }

    createuserPayment(userId: number) {

        const query = `INSERT INTO user_payments ( subscription_id, user_id, order_id, payment_id, is_current, subscription_amount, amount, payment_mode, expiry_date, status, is_confirm,coupon_code,coupon_amount,from_auto_renewed,reason_auto_renewal_cancel,is_cancelled,is_coupon_applied,coupon_reason,reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [
            1, userId, this.user.order_id, 'migrated plan', 0, this.user.price, this.user.orderamount, this.user.paymentgateway, this.user.activesubscriptionenddate, 1, 1,'',0,0,'',0,0,'',''
        ];
        Database.getInstance(getDBName(this.platfrom)).query(query, values).then((result: any) => {
            console.log("Plan" + result);


        }).catch((err) => {
            console.log(err)
        });

    }

    migrationLog(userId:number){
        const query = `INSERT INTO user_migration (user_id, migration_id, filename,platform) VALUES (?,?,?,?)`;
        const values = [
            userId,0,this.filename,this.platfrom
        ];
        DatabaseHLS.query(query,values)
        
    } 
}