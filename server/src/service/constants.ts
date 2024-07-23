

export const dbnames = {
  bebutest:"bebu_test_admin",
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

}

export const getDBName = (key: string): string => {
    switch (key) {
      

      case 'bebutest':
        return dbnames.bebutest;
    
      case 'bebu':
        return dbnames.bebu;
      case 'abethu':
        return dbnames.abethu;
      case 'bhoju':
        return dbnames.bhoju;
      case 'chorchuri':
        return dbnames.chorchuri;
      case 'cineuns':
        return dbnames.cineuns;
      case 'kannadaflix':
        return dbnames.kannadaflix;
      case 'keeflix':
        return dbnames.keeflix;
      case 'kidullan':
        return dbnames.kidullan;
      case 'kooku':
        return dbnames.kooku;
      case 'olaple':
        return dbnames.olaple;
      case 'rokkt':
        return dbnames.rokkt;
      case 'sonadoll':
        return dbnames.sonadoll;
      case 'ubeetu':
        return dbnames.ubeetu;
      default:
        throw new Error(`Database name not found for key: ${key}`);
    }
  };







export const getMediaURL = (key: string): string => {
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
