const as = require("./abs-scrapper.js")

const postcodes = 
// THESE DONT EXIST HTTP 404
[
    // "0200","0801","0804","0811","0813","0814","0815","0821","0831","0851","0861","0871","0881","0906","0907","0909","1001","1002","1003","1004","1005","1006","1007","1008","1009","1010","1020","1021","1022",
    // "1023","1025","1026","1027","1028","1029","1030","1031","1032","1033","1034","1035","1036","1037","1038","1039","1040","1041","1042","1043","1044","1045","1046","1100","1101","1105","1106","1107","1108",
    // "1109","1110","1112","1113","1114","1115","1116","1117","1118","1119","1120","1121","1122","1123","1124","1125","1126","1127","1128","1129","1130","1131","1132","1133","1134","1135","1136","1137","1138",
    // "1139","1140","1141","1142","1143","1144","1145","1146","1147","1148","1149","1150","1151","1152","1153","1154","1155","1156","1157","1158","1159","1160","1161","1162","1163","1164","1165","1166","1167",
    // "1168","1169","1170","1171","1172","1173","1174","1175","1176","1177","1178","1179","1180","1181","1182","1183","1184","1185","1186","1187","1188","1189","1190","1191","1192","1193","1194","1195","1196",
    // "1197","1198","1199","1201","1202","1203","1205","1207","1208","1209","1210","1211","1212","1213","1214","1215","1216","1217","1218","1219","1220","1221","1222","1223","1224","1225","1226","1227","1228",
    // "1229","1230","1231","1232","1233","1234","1235","1236","1237","1238","1239","1240","1291","1292","1293","1294","1295","1296","1297","1298","1299","1300","1314","1335","1340","1350","1355","1360","1401",
    // "1419","1420","1422","1423","1424","1425","1426","1427","1428","1429","1430","1435","1440","1441","1445","1450","1455","1460","1465","1466","1470","1475","1476","1480","1481","1484","1485","1490","1493",
    // "1495","1499","1515","1560","1565","1570","1585","1590","1595","1597","1602","1630","1635","1639","1640","1655","1658","1660","1670","1675","1680","1685","1700","1710","1715","1730","1740","1741","1750",
    // "1755","1765","1771","1781","1790","1800","1805","1811","1819","1825","1830","1831","1835","1851","1860","1871","1875","1885","1888","1890","1891","2001","2002","2004","2006","2012","2013","2052","2055",
    // "2057","2058","2059","2091","2109","2123","2124","2129","2139","2252","2309","2310","2314","2348","2351","2442","2520","2522","2608","2610","2616","2708","2751","2755","2890","2891","2901","3001","3005",
    // "3010","3050","3086","3164","3176","3353","3354","3399","3402","3502","3552","3554","3619","3632","3643","3661","3671","3676","3689","3694","3724","3736","3800","3841","3853","3989","4001","4002","4003",
    // "4004","4029","4072","4219","4222","4229","4230","4271","4345","4471","4475","4801","4803","4813","4857","5001","5005","5071","5606","5800","5810","5839","5942","6001","6231","6331","6332","6433","6435",
    // "6531","6711","6723","6731","6733","6761","6800","6803","6809","6817","6820","6827","6830","6831","6832","6837","6838","6839","6840","6841","6842","6843","6844","6845","6846","6847","6848","6849","6850",
    // "6865","6872","6892","6900","6901","6902","6903","6904","6905","6906","6907","6909","6910","6911","6912","6913","6914","6915","6916","6917","6918","6919","6920","6921","6922","6923","6924","6925","6926",
    // "6929","6931","6932","6933","6934","6935","6936","6937","6938","6939","6940","6941","6942","6943","6944","6945","6946","6947","6951","6952","6953","6954","6955","6956","6957","6958","6959","6960","6961",
    // "6963","6964","6965","6966","6967","6968","6969","6970","6979","6980","6981","6982","6983","6984","6985","6986","6987","6988","6989","6990","6991","6992","6997","7001","7002","7006","7051","7151","8001",
    // "8002","8003","8004","8005","8006","8007","8008","8009","8010","8011","8012","8045","8051","8066","8069","8070","8071","8102","8107","8111","8120","8205","8785","9000","9001","9002","9005","9007","9009",
    // "9010","9013","9015","9464","9726","9999"
];

const runners = [
    { name: "populationByPostCode", observations: [0, 1], url: "https://api.data.abs.gov.au/data/ABS,C21_G04_POA,1.0.0/GE100+95_99+90_94+85_89+80_84+75_79+70_74+65_69+60_64+55_59+50_54+45_49+40_44+35_39+30_34+25_29+20_24+15_19+10_14+5_9+0_4..${postcode}..?startPeriod=2021&dimensionAtObservation=AllDimensions&format=jsondata" },
    { name: "averagesByPostCode", observations: [0], url: "https://api.data.abs.gov.au/data/ABS,C21_G02_POA,1.0.0/.${postcode}..?startPeriod=2021&dimensionAtObservation=AllDimensions&format=jsondata" },
    { name: "maritalStatus", observations: [2], url: "https://api.data.abs.gov.au/data/ABS,C21_G05_POA,1.0.0/3._T..${postcode}..?startPeriod=2021&dimensionAtObservation=AllDimensions&format=jsondata" },
    { name: "houseHoldTypes", observations: [0], url: "https://api.data.abs.gov.au/data/ABS,C21_G37_POA,1.0.0/._T.${postcode}..?startPeriod=2021&dimensionAtObservation=AllDimensions&format=jsondata" }
]

const runAll = async (postcode) => {
    runners.forEach(async r => await as.absScrapper(
        r.url.replace("${postcode}", postcode),
        postcode,
        r.name,
        r.observations
    ));
}

postcodes.map(p => runAll(p));

