"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaURL = exports.getDBName = exports.dbnames = void 0;
exports.dbnames = {
    bebutest: "bebu_test_admin",
    bebu: "bebu_admin",
    abethu: "abethu_admin",
    bhoju: "bhoju_admin",
    chorchuri: "chorchuri_admin",
    cineuns: "cineuns_admin",
    kannadaflix: "kannadaflix_admin",
    keeflix: "keeflix_admin",
    kidullan: "kidullan_admin",
    kooku: "kooku_admin",
    olaple: "olaple_admin",
    rokkt: "rokkt_admin",
    sonadoll: "sonadoll_admin",
    ubeetu: "ubeetu_admin",
};
const getDBName = (key) => {
    switch (key) {
        case 'bebutest':
            return exports.dbnames.bebutest;
        case 'bebu':
            return exports.dbnames.bebu;
        case 'abethu':
            return exports.dbnames.abethu;
        case 'bhoju':
            return exports.dbnames.bhoju;
        case 'chorchuri':
            return exports.dbnames.chorchuri;
        case 'cineuns':
            return exports.dbnames.cineuns;
        case 'kannadaflix':
            return exports.dbnames.kannadaflix;
        case 'keeflix':
            return exports.dbnames.keeflix;
        case 'kidullan':
            return exports.dbnames.kidullan;
        case 'kooku':
            return exports.dbnames.kooku;
        case 'olaple':
            return exports.dbnames.olaple;
        case 'rokkt':
            return exports.dbnames.rokkt;
        case 'sonadoll':
            return exports.dbnames.sonadoll;
        case 'ubeetu':
            return exports.dbnames.ubeetu;
        default:
            throw new Error(`Database name not found for key: ${key}`);
    }
};
exports.getDBName = getDBName;
const getMediaURL = (key) => {
    let url = `https://media1.${key}`;
    switch (key) {
        case "bebu":
            url += ".app";
            break;
        case "bhoju":
            url += ".app";
            break;
        case "rokkt":
            url += ".tv";
            break;
        case "kooku":
            url += "online";
            break;
        default:
            url += ".com";
            break;
    }
    return url;
};
exports.getMediaURL = getMediaURL;
