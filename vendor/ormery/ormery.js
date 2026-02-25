import {
  SqlFragment as SqlFragment_1476, SqlBuilder as SqlBuilder_1514
} from "./sql.js";
import {
  SafeHtmlBuilder as SafeHtmlBuilder_1629, SafeHtml as SafeHtml_1630
} from "./html.js";
import {
  globalConsole as globalConsole__1189, type as type__1232, cmpString as cmpString__1510, listedMap as listedMap_1209, listedJoin as listedJoin_1212, listedGet as listedGet_1258, mapBuilderConstructor as mapBuilderConstructor_1295, mapBuilderSet as mapBuilderSet_1301, mappedGetOr as mappedGetOr_1306, mappedToMapBuilder as mappedToMapBuilder_1308, mappedToMap as mappedToMap_1310, listBuilderAdd as listBuilderAdd_1313, listBuilderToList as listBuilderToList_1318, mappedGet as mappedGet_1339, stringToInt32 as stringToInt32_1348, mappedToListWith as mappedToListWith_1354, panic as panic_1408, cmpGeneric as cmpGeneric_1449, listedFilter as listedFilter_1462, listedSorted as listedSorted_1468, listedSlice as listedSlice_1472, stringGet as stringGet_1646, stringNext as stringNext_1648, listBuilderAddAll as listBuilderAddAll_1653, pairConstructor as pairConstructor_1812, mapConstructor as mapConstructor_1811, stringSplit as stringSplit_1974
} from "@temperlang/core";
/** @type {Console_1190} */
const console_1188 = globalConsole__1189;
export class DemoController extends type__1232() {
  /** @type {Schema} */
  #schema_1191;
  /** @type {InMemoryStore} */
  #store_1192;
  /** @type {number} */
  #queryCount_1193;
  /**
   * @param {{
   *   schema: Schema, store: InMemoryStore
   * }}
   * props
   * @returns {DemoController}
   */
  static["new"](props) {
    return new DemoController(props.schema, props.store);
  }
  /**
   * @param {Schema} schema_1194
   * @param {InMemoryStore} store_1195
   */
  constructor(schema_1194, store_1195) {
    super ();
    this.#schema_1191 = schema_1194;
    this.#store_1192 = store_1195;
    this.#queryCount_1193 = 0;
    return;
  }
  /** @returns {number} */
  getRecordCount() {
    let t_1197 = this.#schema_1191.tableName;
    return this.#store_1192.count(t_1197);
  }
  /** @returns {number} */
  getAdultCount() {
    return new Query(this.#schema_1191, this.#store_1192).where("age", ">=", "18").all().length;
  }
  /** @returns {number} */
  getQueryCount() {
    return this.#queryCount_1193;
  }
  #incrementQueryCount_1201() {
    const t_1202 = this.#queryCount_1193 + 1 | 0;
    this.#queryCount_1193 = t_1202;
    return;
  }
  /**
   * @param {Array<Record>} records_1205
   * @returns {string}
   */
  #formatRecords_1204(records_1205) {
    function fn_1206(record_1207) {
      return "  " + record_1207.describe();
    }
    const lines_1208 = listedMap_1209(records_1205, fn_1206);
    function fn_1210(s_1211) {
      return s_1211;
    }
    return listedJoin_1212(lines_1208, "\n", fn_1210);
  }
  /** @returns {string} */
  runDemo1() {
    this.#incrementQueryCount_1201();
    const results_1214 = new Query(this.#schema_1191, this.#store_1192).all();
    const formatted_1215 = this.#formatRecords_1204(results_1214);
    return "=== Demo 1: All Users ===" + "\n" + "\n" + "Query: new Query(userSchema, store).all()" + "\n" + "\n" + "Results:" + "\n" + formatted_1215 + "\n" + "\n" + "Total: " + results_1214.length.toString() + " records";
  }
  /** @returns {string} */
  runDemo2() {
    this.#incrementQueryCount_1201();
    const results_1217 = new Query(this.#schema_1191, this.#store_1192).where("age", ">=", "18").all();
    const formatted_1218 = this.#formatRecords_1204(results_1217);
    return "=== Demo 2: Filter Adults ===" + "\n" + "\n" + "Query: new Query(userSchema, store)" + "\n" + "  .where(" + '"' + "age" + '"' + ", " + '"' + ">=" + '"' + ", " + '"' + "18" + '"' + ")" + "\n" + "  .all()" + "\n" + "\n" + "Results:" + "\n" + formatted_1218 + "\n" + "\n" + "Total: " + results_1217.length.toString() + " adults found";
  }
  /** @returns {string} */
  runDemo3() {
    this.#incrementQueryCount_1201();
    const results_1220 = new Query(this.#schema_1191, this.#store_1192).orderBy("age", "desc").all();
    const formatted_1221 = this.#formatRecords_1204(results_1220);
    return "=== Demo 3: Sort by Age (Descending) ===" + "\n" + "\n" + "Query: new Query(userSchema, store)" + "\n" + "  .orderBy(" + '"' + "age" + '"' + ", " + '"' + "desc" + '"' + ")" + "\n" + "  .all()" + "\n" + "\n" + "Results (ordered by age, oldest first):" + "\n" + formatted_1221;
  }
  /** @returns {string} */
  runDemo4() {
    this.#incrementQueryCount_1201();
    const page1_1223 = new Query(this.#schema_1191, this.#store_1192).orderBy("id", "asc").limit(2).all();
    const page2_1224 = new Query(this.#schema_1191, this.#store_1192).orderBy("id", "asc").offset(2).limit(2).all();
    const formatted1_1225 = this.#formatRecords_1204(page1_1223);
    const formatted2_1226 = this.#formatRecords_1204(page2_1224);
    return "=== Demo 4: Pagination ===" + "\n" + "\n" + "Page 1: .orderBy(" + '"' + "id" + '"' + ", " + '"' + "asc" + '"' + ").limit(2)" + "\n" + "\n" + formatted1_1225 + "\n" + "\n" + "Page 2: .orderBy(" + '"' + "id" + '"' + ", " + '"' + "asc" + '"' + ").offset(2).limit(2)" + "\n" + "\n" + formatted2_1226;
  }
  /** @returns {string} */
  runDemo5() {
    this.#incrementQueryCount_1201();
    const results_1228 = new Query(this.#schema_1191, this.#store_1192).where("age", ">=", "18").where("email", "!=", "").orderBy("age", "desc").select(Object.freeze(["name", "age"])).limit(2).all();
    const formatted_1229 = this.#formatRecords_1204(results_1228);
    return "=== Demo 5: Complex Query ===" + "\n" + "\n" + "Query: new Query(userSchema, store)" + "\n" + "  .where(" + '"' + "age" + '"' + ", " + '"' + ">=" + '"' + ", " + '"' + "18" + '"' + ")" + "\n" + "  .where(" + '"' + "email" + '"' + ", " + '"' + "!=" + '"' + ", " + '"' + '"' + ")" + "\n" + "  .orderBy(" + '"' + "age" + '"' + ", " + '"' + "desc" + '"' + ")" + "\n" + "  .select([" + '"' + "name" + '"' + ", " + '"' + "age" + '"' + "])" + "\n" + "  .limit(2)" + "\n" + "  .all()" + "\n" + "\n" + "Results (adults with email, showing name/age only, oldest first, max 2):" + "\n" + formatted_1229;
  }
  /** @returns {Schema} */
  get schema() {
    return this.#schema_1191;
  }
  /** @returns {InMemoryStore} */
  get store() {
    return this.#store_1192;
  }
};
export class Field extends type__1232() {
  /** @type {string} */
  #name_1233;
  /** @type {string} */
  #fieldType_1234;
  /** @type {boolean} */
  #primaryKey_1235;
  /** @type {boolean} */
  #nullable_1236;
  /** @returns {string} */
  get description() {
    let pk_1238;
    if (this.#primaryKey_1235) {
      pk_1238 = " (PK)";
    } else {
      pk_1238 = "";
    }
    let null_1239;
    if (this.#nullable_1236) {
      null_1239 = " (nullable)";
    } else {
      null_1239 = "";
    }
    return String(this.#name_1233) + ": " + this.#fieldType_1234 + pk_1238 + null_1239;
  }
  /**
   * @param {{
   *   name: string, fieldType: string, primaryKey: boolean, nullable: boolean
   * }}
   * props
   * @returns {Field}
   */
  static["new"](props) {
    return new Field(props.name, props.fieldType, props.primaryKey, props.nullable);
  }
  /**
   * @param {string} name_1240
   * @param {string} fieldType_1241
   * @param {boolean} primaryKey_1242
   * @param {boolean} nullable_1243
   */
  constructor(name_1240, fieldType_1241, primaryKey_1242, nullable_1243) {
    super ();
    this.#name_1233 = name_1240;
    this.#fieldType_1234 = fieldType_1241;
    this.#primaryKey_1235 = primaryKey_1242;
    this.#nullable_1236 = nullable_1243;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_1233;
  }
  /** @returns {string} */
  get fieldType() {
    return this.#fieldType_1234;
  }
  /** @returns {boolean} */
  get primaryKey() {
    return this.#primaryKey_1235;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_1236;
  }
};
export class Schema extends type__1232() {
  /** @type {string} */
  #tableName_1248;
  /** @type {Array<Field>} */
  #fields_1249;
  /**
   * @param {string} name_1251
   * @returns {Field}
   */
  getField(name_1251) {
    let return_1252;
    fn_1253: {
      const this_1254 = this.#fields_1249;
      const n_1255 = this_1254.length;
      let i_1256 = 0;
      while (i_1256 < n_1255) {
        const el_1257 = listedGet_1258(this_1254, i_1256);
        i_1256 = i_1256 + 1 | 0;
        const field_1259 = el_1257;
        if (field_1259.name === name_1251) {
          return_1252 = field_1259;
          break fn_1253;
        }
      }
      throw Error();
    }
    return return_1252;
  }
  /**
   * @param {string} name_1261
   * @returns {boolean}
   */
  hasField(name_1261) {
    let return_1262;
    fn_1263: {
      const this_1264 = this.#fields_1249;
      const n_1265 = this_1264.length;
      let i_1266 = 0;
      while (i_1266 < n_1265) {
        const el_1267 = listedGet_1258(this_1264, i_1266);
        i_1266 = i_1266 + 1 | 0;
        const field_1268 = el_1267;
        if (field_1268.name === name_1261) {
          return_1262 = true;
          break fn_1263;
        }
      }
      return_1262 = false;
    }
    return return_1262;
  }
  /** @returns {Field} */
  get primaryKeyField() {
    let return_1270;
    fn_1271: {
      const this_1272 = this.#fields_1249;
      const n_1273 = this_1272.length;
      let i_1274 = 0;
      while (i_1274 < n_1273) {
        const el_1275 = listedGet_1258(this_1272, i_1274);
        i_1274 = i_1274 + 1 | 0;
        const field_1276 = el_1275;
        if (field_1276.primaryKey) {
          return_1270 = field_1276;
          break fn_1271;
        }
      }
      throw Error();
    }
    return return_1270;
  }
  /** @returns {Array<string>} */
  get fieldNames() {
    function fn_1278(f_1279) {
      return f_1279.name;
    }
    return listedMap_1209(this.#fields_1249, fn_1278);
  }
  /** @returns {string} */
  describe() {
    const header_1281 = "Schema: " + this.#tableName_1248 + "\n";
    function fn_1282(f_1283) {
      return "  - " + f_1283.description;
    }
    let t_1284 = listedMap_1209(this.#fields_1249, fn_1282);
    function fn_1285(s_1286) {
      return s_1286;
    }
    const fieldList_1287 = listedJoin_1212(t_1284, "\n", fn_1285);
    return String(header_1281) + fieldList_1287;
  }
  /**
   * @param {{
   *   tableName: string, fields: Array<Field>
   * }}
   * props
   * @returns {Schema}
   */
  static["new"](props) {
    return new Schema(props.tableName, props.fields);
  }
  /**
   * @param {string} tableName_1288
   * @param {Array<Field>} fields_1289
   */
  constructor(tableName_1288, fields_1289) {
    super ();
    this.#tableName_1248 = tableName_1288;
    this.#fields_1249 = fields_1289;
    return;
  }
  /** @returns {string} */
  get tableName() {
    return this.#tableName_1248;
  }
  /** @returns {Array<Field>} */
  get fields() {
    return this.#fields_1249;
  }
};
export class InMemoryStore extends type__1232() {
  /** @type {Map<string, Array<Record>>} */
  #tables_1292;
  /** @type {Map<string, number>} */
  #nextIds_1293;
  constructor() {
    super ();
    let t_1294 = mapBuilderConstructor_1295();
    this.#tables_1292 = t_1294;
    let t_1296 = mapBuilderConstructor_1295();
    this.#nextIds_1293 = t_1296;
    return;
  }
  /** @param {string} tableName_1299 */
  #ensureTable_1298(tableName_1299) {
    let t_1300;
    if (! this.#tables_1292.has(tableName_1299)) {
      t_1300 = [];
      mapBuilderSet_1301(this.#tables_1292, tableName_1299, t_1300);
      mapBuilderSet_1301(this.#nextIds_1293, tableName_1299, 1);
    }
    return;
  }
  /**
   * @param {string} tableName_1303
   * @param {Map<string, string>} data_1304
   * @returns {Record}
   */
  insert(tableName_1303, data_1304) {
    this.#ensureTable_1298(tableName_1303);
    const id_1305 = mappedGetOr_1306(this.#nextIds_1293, tableName_1303, 1);
    mapBuilderSet_1301(this.#nextIds_1293, tableName_1303, id_1305 + 1 | 0);
    const dataBuilder_1307 = mappedToMapBuilder_1308(data_1304);
    mapBuilderSet_1301(dataBuilder_1307, "id", id_1305.toString());
    const record_1309 = new Record(mappedToMap_1310(dataBuilder_1307));
    let t_1311 = [];
    const table_1312 = mappedGetOr_1306(this.#tables_1292, tableName_1303, t_1311);
    listBuilderAdd_1313(table_1312, record_1309);
    return record_1309;
  }
  /**
   * @param {string} tableName_1315
   * @returns {Array<Record>}
   */
  all(tableName_1315) {
    this.#ensureTable_1298(tableName_1315);
    let t_1316 = [];
    const table_1317 = mappedGetOr_1306(this.#tables_1292, tableName_1315, t_1316);
    return listBuilderToList_1318(table_1317);
  }
  /**
   * @param {string} tableName_1320
   * @param {number} id_1321
   * @returns {Record}
   */
  get(tableName_1320, id_1321) {
    let return_1322;
    let t_1323;
    fn_1324: {
      this.#ensureTable_1298(tableName_1320);
      t_1323 = [];
      const table_1325 = mappedGetOr_1306(this.#tables_1292, tableName_1320, t_1323);
      const this_1326 = listBuilderToList_1318(table_1325);
      const n_1327 = this_1326.length;
      let i_1328 = 0;
      while (i_1328 < n_1327) {
        const el_1329 = listedGet_1258(this_1326, i_1328);
        i_1328 = i_1328 + 1 | 0;
        const record_1330 = el_1329;
        let recordId_1331;
        try {
          recordId_1331 = record_1330.id;
        } catch {
          throw Error();
        }
        if (recordId_1331 === id_1321) {
          return_1322 = record_1330;
          break fn_1324;
        }
      }
      throw Error();
    }
    return return_1322;
  }
  /**
   * @param {string} tableName_1333
   * @returns {number}
   */
  count(tableName_1333) {
    this.#ensureTable_1298(tableName_1333);
    let t_1334 = [];
    const table_1335 = mappedGetOr_1306(this.#tables_1292, tableName_1333, t_1334);
    return table_1335.length;
  }
};
export class Record extends type__1232() {
  /** @type {Map<string, string>} */
  #data_1336;
  /**
   * @param {string} field_1338
   * @returns {string}
   */
  get(field_1338) {
    return mappedGet_1339(this.#data_1336, field_1338);
  }
  /**
   * @param {string} field_1341
   * @param {string} fallback_1342
   * @returns {string}
   */
  getOr(field_1341, fallback_1342) {
    return mappedGetOr_1306(this.#data_1336, field_1341, fallback_1342);
  }
  /**
   * @param {string} field_1344
   * @returns {boolean}
   */
  has(field_1344) {
    return this.#data_1336.has(field_1344);
  }
  /** @returns {number} */
  get id() {
    let return_1346;
    let idStr_1347;
    idStr_1347 = mappedGet_1339(this.#data_1336, "id");
    try {
      return_1346 = stringToInt32_1348(idStr_1347);
    } catch {
      throw Error();
    }
    return return_1346;
  }
  /** @returns {string} */
  describe() {
    function fn_1350(k_1351, v_1352) {
      return String(k_1351) + ": " + v_1352;
    }
    const pairs_1353 = mappedToListWith_1354(this.#data_1336, fn_1350);
    function fn_1355(s_1356) {
      return s_1356;
    }
    return listedJoin_1212(pairs_1353, ", ", fn_1355);
  }
  /** @param {Map<string, string>} data_1357 */
  constructor(data_1357) {
    super ();
    this.#data_1336 = data_1357;
    return;
  }
  /** @returns {Map<string, string>} */
  get data() {
    return this.#data_1336;
  }
};
export class Query extends type__1232() {
  /** @type {Schema} */
  #schema_1359;
  /** @type {InMemoryStore} */
  #store_1360;
  /** @type {Array<WhereClause>} */
  #whereClauses_1361;
  /** @type {Array<string>} */
  #selectFields_1362;
  /** @type {Array<OrderClause>} */
  #orderByClauses_1363;
  /** @type {number} */
  #limitValue_1364;
  /** @type {number} */
  #offsetValue_1365;
  /**
   * @param {{
   *   schema: Schema, store: InMemoryStore
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.schema, props.store);
  }
  /**
   * @param {Schema} schema_1366
   * @param {InMemoryStore} store_1367
   */
  constructor(schema_1366, store_1367) {
    super ();
    this.#schema_1359 = schema_1366;
    this.#store_1360 = store_1367;
    let t_1368 = [];
    this.#whereClauses_1361 = t_1368;
    let t_1369 = Object.freeze([]);
    this.#selectFields_1362 = t_1369;
    let t_1370 = [];
    this.#orderByClauses_1363 = t_1370;
    this.#limitValue_1364 = -1;
    this.#offsetValue_1365 = 0;
    return;
  }
  /**
   * @param {string} field_1372
   * @param {string} operator_1373
   * @param {string} value_1374
   * @returns {Query}
   */
  where(field_1372, operator_1373, value_1374) {
    let t_1375 = new WhereClause(field_1372, operator_1373, value_1374);
    listBuilderAdd_1313(this.#whereClauses_1361, t_1375);
    return this;
  }
  /**
   * @param {Array<string>} fields_1377
   * @returns {Query}
   */
  select(fields_1377) {
    this.#selectFields_1362 = fields_1377;
    return this;
  }
  /**
   * @param {string} field_1379
   * @param {string} direction_1380
   * @returns {Query}
   */
  orderBy(field_1379, direction_1380) {
    let t_1381 = new OrderClause(field_1379, direction_1380);
    listBuilderAdd_1313(this.#orderByClauses_1363, t_1381);
    return this;
  }
  /**
   * @param {number} n_1383
   * @returns {Query}
   */
  limit(n_1383) {
    let t_1384;
    if (n_1383 < 0) {
      t_1384 = 0;
    } else {
      t_1384 = n_1383;
    }
    this.#limitValue_1364 = t_1384;
    return this;
  }
  /**
   * @param {number} n_1386
   * @returns {Query}
   */
  offset(n_1386) {
    this.#offsetValue_1365 = n_1386;
    return this;
  }
  /**
   * @param {Record} record_1389
   * @returns {boolean}
   */
  #matchesWhere_1388(record_1389) {
    let return_1390;
    let t_1391;
    let t_1392;
    let t_1393;
    let t_1394;
    let t_1395;
    let t_1396;
    let t_1397;
    let t_1398;
    fn_1399: {
      const this_1400 = listBuilderToList_1318(this.#whereClauses_1361);
      const n_1401 = this_1400.length;
      let i_1402 = 0;
      while (i_1402 < n_1401) {
        const el_1403 = listedGet_1258(this_1400, i_1402);
        i_1402 = i_1402 + 1 | 0;
        const clause_1404 = el_1403;
        let t_1405;
        t_1391 = clause_1404.field;
        const recordValue_1406 = record_1389.getOr(t_1391, "");
        t_1392 = clause_1404.field;
        if (! this.#schema_1359.hasField(t_1392)) {
          return_1390 = false;
          break fn_1399;
        }
        let fieldInfo_1407;
        try {
          t_1393 = clause_1404.field;
          t_1405 = this.#schema_1359.getField(t_1393);
          fieldInfo_1407 = t_1405;
        } catch {
          fieldInfo_1407 = panic_1408();
        }
        const fieldType_1409 = fieldInfo_1407.fieldType;
        let matches_1410;
        if (fieldType_1409 === "Int") {
          t_1394 = clause_1404.operator;
          t_1395 = clause_1404.value;
          t_1396 = compareInt_1411(recordValue_1406, t_1394, t_1395);
          matches_1410 = t_1396;
        } else if (fieldType_1409 === "String") {
          t_1397 = clause_1404.operator;
          t_1398 = clause_1404.value;
          matches_1410 = compareString_1412(recordValue_1406, t_1397, t_1398);
        } else {
          matches_1410 = false;
        }
        if (! matches_1410) {
          return_1390 = false;
          break fn_1399;
        }
      }
      return_1390 = true;
    }
    return return_1390;
  }
  /**
   * @param {Record} record_1415
   * @returns {Record}
   */
  #projectRecord_1414(record_1415) {
    let return_1416;
    let t_1417;
    fn_1418: {
      if (this.#selectFields_1362.length === 0) {
        return_1416 = record_1415;
        break fn_1418;
      }
      const builder_1419 = mapBuilderConstructor_1295();
      function fn_1420(fieldName_1421) {
        const value_1422 = record_1415.getOr(fieldName_1421, "");
        mapBuilderSet_1301(builder_1419, fieldName_1421, value_1422);
        return;
      }
      this.#selectFields_1362.forEach(fn_1420);
      t_1417 = mappedToMap_1310(builder_1419);
      return_1416 = new Record(t_1417);
    }
    return return_1416;
  }
  /**
   * @param {Record} a_1425
   * @param {Record} b_1426
   * @param {Array<OrderClause>} orderClauses_1427
   * @returns {number}
   */
  #compareRecords_1424(a_1425, b_1426, orderClauses_1427) {
    let return_1428;
    let t_1429;
    let t_1430;
    let t_1431;
    let t_1432;
    fn_1433: {
      const this_1434 = orderClauses_1427;
      const n_1435 = this_1434.length;
      let i_1436 = 0;
      while (i_1436 < n_1435) {
        const el_1437 = listedGet_1258(this_1434, i_1436);
        i_1436 = i_1436 + 1 | 0;
        const clause_1438 = el_1437;
        let t_1439;
        let t_1440;
        let t_1441;
        t_1429 = clause_1438.field;
        const aVal_1442 = a_1425.getOr(t_1429, "");
        t_1430 = clause_1438.field;
        const bVal_1443 = b_1426.getOr(t_1430, "");
        t_1431 = clause_1438.field;
        if (! this.#schema_1359.hasField(t_1431)) {
          continue;
        }
        let fieldInfo_1444;
        try {
          t_1432 = clause_1438.field;
          t_1439 = this.#schema_1359.getField(t_1432);
          fieldInfo_1444 = t_1439;
        } catch {
          fieldInfo_1444 = panic_1408();
        }
        const fieldType_1445 = fieldInfo_1444.fieldType;
        let cmp_1446;
        if (fieldType_1445 === "Int") {
          let aInt_1447;
          try {
            t_1440 = stringToInt32_1348(aVal_1442);
            aInt_1447 = t_1440;
          } catch {
            aInt_1447 = 0;
          }
          let bInt_1448;
          try {
            t_1441 = stringToInt32_1348(bVal_1443);
            bInt_1448 = t_1441;
          } catch {
            bInt_1448 = 0;
          }
          cmp_1446 = cmpGeneric_1449(aInt_1447, bInt_1448);
        } else if (fieldType_1445 === "String") {
          cmp_1446 = cmpGeneric_1449(aVal_1442, bVal_1443);
        } else {
          cmp_1446 = 0;
        }
        if (cmp_1446 !== 0) {
          if (clause_1438.direction === "desc") {
            return_1428 = - cmp_1446 | 0;
          } else {
            return_1428 = cmp_1446;
          }
          break fn_1433;
        }
      }
      return_1428 = 0;
    }
    return return_1428;
  }
  /** @returns {Array<Record>} */
  all() {
    const this1460 = this;
    let t_1451;
    let t_1452;
    let t_1453;
    let t_1454;
    let t_1455;
    let t_1456 = this.#schema_1359.tableName;
    const allRecords_1457 = this.#store_1360.all(t_1456);
    function fn_1458(r_1459) {
      return this1460.#matchesWhere_1388(r_1459);
    }
    const filtered_1461 = listedFilter_1462(allRecords_1457, fn_1458);
    let sorted_1463;
    if (this.#orderByClauses_1363.length > 0) {
      const clauses_1464 = listBuilderToList_1318(this.#orderByClauses_1363);
      function fn_1465(a_1466, b_1467) {
        return this1460.#compareRecords_1424(a_1466, b_1467, clauses_1464);
      }
      t_1451 = listedSorted_1468(filtered_1461, fn_1465);
      sorted_1463 = t_1451;
    } else {
      sorted_1463 = filtered_1461;
    }
    let sliced_1469;
    if (this.#limitValue_1364 >= 0) {
      const start_1470 = this.#offsetValue_1365;
      const end_1471 = this.#offsetValue_1365 + this.#limitValue_1364 | 0;
      t_1452 = listedSlice_1472(sorted_1463, start_1470, end_1471);
      sliced_1469 = t_1452;
    } else if (this.#offsetValue_1365 > 0) {
      t_1454 = this.#offsetValue_1365;
      t_1453 = sorted_1463.length;
      t_1455 = listedSlice_1472(sorted_1463, t_1454, t_1453);
      sliced_1469 = t_1455;
    } else {
      sliced_1469 = sorted_1463;
    }
    function fn_1473(r_1474) {
      return this1460.#projectRecord_1414(r_1474);
    }
    return listedMap_1209(sliced_1469, fn_1473);
  }
  /** @returns {SqlFragment_1476} */
  toSql() {
    return toSqlQuery(this.#schema_1359, this.#selectFields_1362, listBuilderToList_1318(this.#whereClauses_1361), listBuilderToList_1318(this.#orderByClauses_1363), this.#limitValue_1364, this.#offsetValue_1365);
  }
  /** @returns {Schema} */
  get schema() {
    return this.#schema_1359;
  }
  /** @returns {InMemoryStore} */
  get store() {
    return this.#store_1360;
  }
};
export class WhereClause extends type__1232() {
  /** @type {string} */
  #field_1479;
  /** @type {string} */
  #operator_1480;
  /** @type {string} */
  #value_1481;
  /** @returns {string} */
  describe() {
    return String(this.#field_1479) + " " + this.#operator_1480 + " " + this.#value_1481;
  }
  /**
   * @param {{
   *   field: string, operator: string, value: string
   * }}
   * props
   * @returns {WhereClause}
   */
  static["new"](props) {
    return new WhereClause(props.field, props.operator, props.value);
  }
  /**
   * @param {string} field_1483
   * @param {string} operator_1484
   * @param {string} value_1485
   */
  constructor(field_1483, operator_1484, value_1485) {
    super ();
    this.#field_1479 = field_1483;
    this.#operator_1480 = operator_1484;
    this.#value_1481 = value_1485;
    return;
  }
  /** @returns {string} */
  get field() {
    return this.#field_1479;
  }
  /** @returns {string} */
  get operator() {
    return this.#operator_1480;
  }
  /** @returns {string} */
  get value() {
    return this.#value_1481;
  }
};
export class OrderClause extends type__1232() {
  /** @type {string} */
  #field_1489;
  /** @type {string} */
  #direction_1490;
  /** @returns {string} */
  describe() {
    return String(this.#field_1489) + " " + this.#direction_1490;
  }
  /**
   * @param {{
   *   field: string, direction: string
   * }}
   * props
   * @returns {OrderClause}
   */
  static["new"](props) {
    return new OrderClause(props.field, props.direction);
  }
  /**
   * @param {string} field_1492
   * @param {string} direction_1493
   */
  constructor(field_1492, direction_1493) {
    super ();
    this.#field_1489 = field_1492;
    this.#direction_1490 = direction_1493;
    return;
  }
  /** @returns {string} */
  get field() {
    return this.#field_1489;
  }
  /** @returns {string} */
  get direction() {
    return this.#direction_1490;
  }
};
/**
 * @param {string} recordValue_1496
 * @param {string} operator_1497
 * @param {string} clauseValue_1498
 * @returns {boolean}
 */
function compareInt_1411(recordValue_1496, operator_1497, clauseValue_1498) {
  let return_1499;
  let t_1500;
  let t_1501;
  let t_1502;
  fn_1503: {
    let rv_1504;
    try {
      t_1501 = stringToInt32_1348(recordValue_1496);
      rv_1504 = t_1501;
    } catch {
      rv_1504 = 0;
    }
    let cv_1505;
    try {
      t_1502 = stringToInt32_1348(clauseValue_1498);
      cv_1505 = t_1502;
    } catch {
      cv_1505 = 0;
    }
    t_1500 = cv_1505.toString();
    if (clauseValue_1498 !== t_1500) {
      return_1499 = false;
      break fn_1503;
    }
    if (operator_1497 === "==") {
      return_1499 = rv_1504 === cv_1505;
    } else if (operator_1497 === "!=") {
      return_1499 = rv_1504 !== cv_1505;
    } else if (operator_1497 === ">") {
      return_1499 = rv_1504 > cv_1505;
    } else if (operator_1497 === "<") {
      return_1499 = rv_1504 < cv_1505;
    } else if (operator_1497 === ">=") {
      return_1499 = rv_1504 >= cv_1505;
    } else if (operator_1497 === "<=") {
      return_1499 = rv_1504 <= cv_1505;
    } else {
      return_1499 = false;
    }
  }
  return return_1499;
}
/**
 * @param {string} recordValue_1506
 * @param {string} operator_1507
 * @param {string} clauseValue_1508
 * @returns {boolean}
 */
function compareString_1412(recordValue_1506, operator_1507, clauseValue_1508) {
  let return_1509;
  if (operator_1507 === "==") {
    return_1509 = recordValue_1506 === clauseValue_1508;
  } else if (operator_1507 === "!=") {
    return_1509 = recordValue_1506 !== clauseValue_1508;
  } else if (operator_1507 === ">") {
    return_1509 = cmpString__1510(recordValue_1506, clauseValue_1508) > 0;
  } else if (operator_1507 === "<") {
    return_1509 = cmpString__1510(recordValue_1506, clauseValue_1508) < 0;
  } else if (operator_1507 === ">=") {
    return_1509 = cmpString__1510(recordValue_1506, clauseValue_1508) >= 0;
  } else if (operator_1507 === "<=") {
    return_1509 = cmpString__1510(recordValue_1506, clauseValue_1508) <= 0;
  } else {
    return_1509 = false;
  }
  return return_1509;
}
/**
 * @param {string} trusted_1512
 * @returns {SqlFragment_1476}
 */
function safeSql_1511(trusted_1512) {
  const b_1513 = new SqlBuilder_1514();
  b_1513.appendSafe(trusted_1512);
  return b_1513.accumulated;
}
/**
 * @param {Array<string>} selectFields_1516
 * @returns {SqlFragment_1476}
 */
function columnListSql_1515(selectFields_1516) {
  let return_1517;
  let t_1518;
  let t_1519;
  let t_1520;
  let t_1521;
  let t_1522;
  let t_1523;
  let t_1524;
  let t_1525;
  if (selectFields_1516.length === 0) {
    t_1518 = new SqlBuilder_1514();
    t_1518.appendSafe("*");
    return_1517 = t_1518.accumulated;
  } else {
    t_1519 = listedGet_1258(selectFields_1516, 0);
    const first_1526 = safeSql_1511(t_1519);
    t_1520 = new SqlBuilder_1514();
    t_1520.appendFragment(first_1526);
    t_1521 = t_1520.accumulated;
    let result_1527 = t_1521;
    let i_1528 = 1;
    while (true) {
      t_1522 = selectFields_1516.length;
      if (!(i_1528 < t_1522)) {
        break;
      }
      t_1523 = listedGet_1258(selectFields_1516, i_1528);
      const col_1529 = safeSql_1511(t_1523);
      t_1524 = new SqlBuilder_1514();
      t_1524.appendFragment(result_1527);
      t_1524.appendSafe(", ");
      t_1524.appendFragment(col_1529);
      t_1525 = t_1524.accumulated;
      result_1527 = t_1525;
      i_1528 = i_1528 + 1 | 0;
    }
    return_1517 = result_1527;
  }
  return return_1517;
}
/**
 * @param {string} op_1531
 * @returns {string}
 */
function validOperator_1530(op_1531) {
  let return_1532;
  if (op_1531 === "=") {
    return_1532 = "=";
  } else if (op_1531 === "==") {
    return_1532 = "=";
  } else if (op_1531 === "!=") {
    return_1532 = "!=";
  } else if (op_1531 === "<>") {
    return_1532 = "<>";
  } else if (op_1531 === ">") {
    return_1532 = ">";
  } else if (op_1531 === "<") {
    return_1532 = "<";
  } else if (op_1531 === ">=") {
    return_1532 = ">=";
  } else if (op_1531 === "<=") {
    return_1532 = "<=";
  } else {
    return_1532 = "=";
  }
  return return_1532;
}
/**
 * @param {WhereClause} clause_1534
 * @param {Schema} schema_1535
 * @returns {SqlFragment_1476}
 */
function whereConditionSql_1533(clause_1534, schema_1535) {
  let return_1536;
  let t_1537;
  let t_1538;
  let t_1539;
  let t_1540;
  let t_1541;
  let t_1542;
  let t_1543 = clause_1534.field;
  const col_1544 = safeSql_1511(t_1543);
  let t_1545 = clause_1534.operator;
  const op_1546 = safeSql_1511(validOperator_1530(t_1545));
  let fieldInfo_1547;
  try {
    t_1537 = clause_1534.field;
    t_1541 = schema_1535.getField(t_1537);
    fieldInfo_1547 = t_1541;
  } catch {
    fieldInfo_1547 = panic_1408();
  }
  if (fieldInfo_1547.fieldType === "Int") {
    let intVal_1548;
    try {
      t_1542 = stringToInt32_1348(clause_1534.value);
      intVal_1548 = t_1542;
    } catch {
      intVal_1548 = 0;
    }
    if (clause_1534.value !== intVal_1548.toString()) {
      t_1538 = new SqlBuilder_1514();
      t_1538.appendSafe("1 = 0");
      return_1536 = t_1538.accumulated;
    } else {
      t_1539 = new SqlBuilder_1514();
      t_1539.appendFragment(col_1544);
      t_1539.appendSafe(" ");
      t_1539.appendFragment(op_1546);
      t_1539.appendSafe(" ");
      t_1539.appendInt32(intVal_1548);
      return_1536 = t_1539.accumulated;
    }
  } else {
    const strVal_1549 = clause_1534.value;
    t_1540 = new SqlBuilder_1514();
    t_1540.appendFragment(col_1544);
    t_1540.appendSafe(" ");
    t_1540.appendFragment(op_1546);
    t_1540.appendSafe(" ");
    t_1540.appendString(strVal_1549);
    return_1536 = t_1540.accumulated;
  }
  return return_1536;
}
/**
 * @param {Array<OrderClause>} clauses_1551
 * @returns {SqlFragment_1476}
 */
function orderBySql_1550(clauses_1551) {
  let t_1552;
  let t_1553;
  let t_1554;
  let t_1555;
  let t_1556;
  let t_1557;
  let t_1558;
  let t_1559;
  let t_1560;
  let t_1561 = listedGet_1258(clauses_1551, 0).field;
  const first_1562 = safeSql_1511(t_1561);
  let firstDir_1563;
  if (listedGet_1258(clauses_1551, 0).direction === "desc") {
    t_1552 = safeSql_1511(" DESC");
    firstDir_1563 = t_1552;
  } else {
    t_1553 = safeSql_1511(" ASC");
    firstDir_1563 = t_1553;
  }
  let t_1564 = new SqlBuilder_1514();
  t_1564.appendFragment(first_1562);
  t_1564.appendFragment(firstDir_1563);
  let t_1565 = t_1564.accumulated;
  let result_1566 = t_1565;
  let i_1567 = 1;
  while (true) {
    t_1554 = clauses_1551.length;
    if (!(i_1567 < t_1554)) {
      break;
    }
    t_1555 = listedGet_1258(clauses_1551, i_1567).field;
    const col_1568 = safeSql_1511(t_1555);
    if (listedGet_1258(clauses_1551, i_1567).direction === "desc") {
      t_1556 = safeSql_1511(" DESC");
      t_1560 = t_1556;
    } else {
      t_1557 = safeSql_1511(" ASC");
      t_1560 = t_1557;
    }
    const dir_1569 = t_1560;
    t_1558 = new SqlBuilder_1514();
    t_1558.appendFragment(result_1566);
    t_1558.appendSafe(", ");
    t_1558.appendFragment(col_1568);
    t_1558.appendFragment(dir_1569);
    t_1559 = t_1558.accumulated;
    result_1566 = t_1559;
    i_1567 = i_1567 + 1 | 0;
  }
  return result_1566;
}
/**
 * @param {Schema} schema_1570
 * @param {Array<string>} selectFields_1571
 * @param {Array<WhereClause>} whereClauses_1572
 * @param {Array<OrderClause>} orderClauses_1573
 * @param {number} limitValue_1574
 * @param {number} offsetValue_1575
 * @returns {SqlFragment_1476}
 */
export function toSqlQuery(schema_1570, selectFields_1571, whereClauses_1572, orderClauses_1573, limitValue_1574, offsetValue_1575) {
  let t_1576;
  let t_1577;
  let t_1578;
  let t_1579;
  let t_1580;
  let t_1581;
  let t_1582;
  let t_1583;
  let t_1584;
  let t_1585;
  let t_1586;
  let t_1587;
  let t_1588;
  let t_1589;
  function fn_1590(f_1591) {
    return schema_1570.hasField(f_1591);
  }
  const validSelect_1592 = listedFilter_1462(selectFields_1571, fn_1590);
  function fn_1593(c_1594) {
    let t_1595 = c_1594.field;
    return schema_1570.hasField(t_1595);
  }
  const validWhere_1596 = listedFilter_1462(whereClauses_1572, fn_1593);
  function fn_1597(c_1598) {
    let t_1599 = c_1598.field;
    return schema_1570.hasField(t_1599);
  }
  const validOrder_1600 = listedFilter_1462(orderClauses_1573, fn_1597);
  let t_1601 = schema_1570.tableName;
  const table_1602 = safeSql_1511(t_1601);
  const cols_1603 = columnListSql_1515(validSelect_1592);
  let t_1604 = new SqlBuilder_1514();
  t_1604.appendSafe("SELECT ");
  t_1604.appendFragment(cols_1603);
  t_1604.appendSafe(" FROM ");
  t_1604.appendFragment(table_1602);
  let t_1605 = t_1604.accumulated;
  let result_1606 = t_1605;
  if (validWhere_1596.length > 0) {
    t_1576 = listedGet_1258(validWhere_1596, 0);
    t_1577 = whereConditionSql_1533(t_1576, schema_1570);
    let conditions_1607 = t_1577;
    let i_1608 = 1;
    while (true) {
      t_1578 = validWhere_1596.length;
      if (!(i_1608 < t_1578)) {
        break;
      }
      t_1579 = listedGet_1258(validWhere_1596, i_1608);
      const next_1609 = whereConditionSql_1533(t_1579, schema_1570);
      t_1580 = new SqlBuilder_1514();
      t_1580.appendFragment(conditions_1607);
      t_1580.appendSafe(" AND ");
      t_1580.appendFragment(next_1609);
      t_1581 = t_1580.accumulated;
      conditions_1607 = t_1581;
      i_1608 = i_1608 + 1 | 0;
    }
    t_1582 = new SqlBuilder_1514();
    t_1582.appendFragment(result_1606);
    t_1582.appendSafe(" WHERE ");
    t_1582.appendFragment(conditions_1607);
    t_1583 = t_1582.accumulated;
    result_1606 = t_1583;
  }
  if (validOrder_1600.length > 0) {
    const ordering_1610 = orderBySql_1550(validOrder_1600);
    t_1584 = new SqlBuilder_1514();
    t_1584.appendFragment(result_1606);
    t_1584.appendSafe(" ORDER BY ");
    t_1584.appendFragment(ordering_1610);
    t_1585 = t_1584.accumulated;
    result_1606 = t_1585;
  }
  if (limitValue_1574 >= 0) {
    t_1586 = new SqlBuilder_1514();
    t_1586.appendFragment(result_1606);
    t_1586.appendSafe(" LIMIT ");
    t_1586.appendInt32(limitValue_1574);
    t_1587 = t_1586.accumulated;
    result_1606 = t_1587;
  }
  if (offsetValue_1575 > 0) {
    t_1588 = new SqlBuilder_1514();
    t_1588.appendFragment(result_1606);
    t_1588.appendSafe(" OFFSET ");
    t_1588.appendInt32(offsetValue_1575);
    t_1589 = t_1588.accumulated;
    result_1606 = t_1589;
  }
  return result_1606;
};
export class TokenType extends type__1232() {
  /** @type {string} */
  #name_1611;
  /** @returns {boolean} */
  get isKeyword() {
    return this.#name_1611 === "keyword";
  }
  /** @returns {boolean} */
  get isType() {
    return this.#name_1611 === "type";
  }
  /** @returns {boolean} */
  get isString() {
    return this.#name_1611 === "string";
  }
  /** @returns {boolean} */
  get isNumber() {
    return this.#name_1611 === "number";
  }
  /** @returns {boolean} */
  get isComment() {
    return this.#name_1611 === "comment";
  }
  /** @returns {boolean} */
  get isOperator() {
    return this.#name_1611 === "operator";
  }
  /** @returns {boolean} */
  get isIdentifier() {
    return this.#name_1611 === "identifier";
  }
  /** @param {string} name_1619 */
  constructor(name_1619) {
    super ();
    this.#name_1611 = name_1619;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_1611;
  }
};
export class Token extends type__1232() {
  /** @type {TokenType} */
  #tokenType_1621;
  /** @type {string} */
  #value_1622;
  /** @returns {string} */
  cssClass() {
    let return_1624;
    const name_1625 = this.#tokenType_1621.name;
    if (name_1625 === "keyword") {
      return_1624 = "kw";
    } else if (name_1625 === "type") {
      return_1624 = "typ";
    } else if (name_1625 === "string") {
      return_1624 = "str";
    } else if (name_1625 === "number") {
      return_1624 = "num";
    } else if (name_1625 === "comment") {
      return_1624 = "cmt";
    } else if (name_1625 === "operator") {
      return_1624 = "op";
    } else {
      return_1624 = "id";
    }
    return return_1624;
  }
  /** @returns {SafeHtml_1630} */
  toHtml() {
    const cls_1627 = this.cssClass();
    let t_1628 = new SafeHtmlBuilder_1629();
    t_1628.appendSafe("<span class='");
    t_1628.appendString(cls_1627);
    t_1628.appendSafe("'>");
    t_1628.appendString(this.#value_1622);
    t_1628.appendSafe("<\/span>");
    return t_1628.accumulated;
  }
  /**
   * @param {{
   *   tokenType: TokenType, value: string
   * }}
   * props
   * @returns {Token}
   */
  static["new"](props) {
    return new Token(props.tokenType, props.value);
  }
  /**
   * @param {TokenType} tokenType_1631
   * @param {string} value_1632
   */
  constructor(tokenType_1631, value_1632) {
    super ();
    this.#tokenType_1621 = tokenType_1631;
    this.#value_1622 = value_1632;
    return;
  }
  /** @returns {TokenType} */
  get tokenType() {
    return this.#tokenType_1621;
  }
  /** @returns {string} */
  get value() {
    return this.#value_1622;
  }
};
/**
 * @param {string} name_1635
 * @param {string} fieldType_1636
 * @param {boolean} primaryKey_1637
 * @param {boolean} nullable_1638
 * @returns {Field}
 */
export function field(name_1635, fieldType_1636, primaryKey_1637, nullable_1638) {
  return new Field(name_1635, fieldType_1636, primaryKey_1637, nullable_1638);
};
/**
 * @param {string} name_1639
 * @returns {boolean}
 */
export function isValidIdentifier(name_1639) {
  let return_1640;
  let t_1641;
  fn_1642: {
    if (! name_1639) {
      return_1640 = false;
      break fn_1642;
    }
    const this_1643 = name_1639;
    let index_1644 = 0;
    while (true) {
      if (!(this_1643.length > index_1644)) {
        break;
      }
      const codePoint_1645 = stringGet_1646(this_1643, index_1644);
      const c_1647 = codePoint_1645;
      if (c_1647 !== 95) {
        if (c_1647 >= 97) {
          if (c_1647 > 122) {
            return_1640 = false;
            break fn_1642;
          }
        } else if (c_1647 >= 65) {
          if (c_1647 > 90) {
            return_1640 = false;
            break fn_1642;
          }
        } else if (c_1647 >= 48) {
          if (c_1647 > 57) {
            return_1640 = false;
            break fn_1642;
          }
        } else {
          return_1640 = false;
          break fn_1642;
        }
      }
      t_1641 = stringNext_1648(this_1643, index_1644);
      index_1644 = t_1641;
    }
    return_1640 = true;
  }
  return return_1640;
};
/**
 * @param {string} tableName_1649
 * @param {Array<Field>} fields_1650
 * @returns {Schema}
 */
export function schema(tableName_1649, fields_1650) {
  if (! isValidIdentifier(tableName_1649)) {
    throw Error();
  }
  const idField_1651 = new Field("id", "Int", true, false);
  const allFields_1652 = [];
  listBuilderAdd_1313(allFields_1652, idField_1651);
  listBuilderAddAll_1653(allFields_1652, fields_1650);
  let t_1654 = listBuilderToList_1318(allFields_1652);
  return new Schema(tableName_1649, t_1654);
};
/**
 * @param {Schema} schema_1655
 * @param {Map<string, string>} values_1656
 * @returns {SqlFragment_1476}
 */
export function toInsertSql(schema_1655, values_1656) {
  let return_1657;
  let t_1658;
  let t_1659;
  let t_1660;
  let t_1661;
  let t_1662;
  let t_1663;
  let t_1664;
  let t_1665;
  let t_1666;
  let t_1667;
  let t_1668;
  let t_1669;
  let t_1670;
  let t_1671;
  let t_1672;
  let t_1673;
  let t_1674;
  let t_1675;
  let t_1676;
  let t_1677;
  fn_1678: {
    t_1658 = schema_1655.tableName;
    const table_1679 = safeSql_1511(t_1658);
    t_1659 = schema_1655.fields;
    function fn_1680(f_1681) {
      let t_1682 = f_1681.name;
      return values_1656.has(t_1682);
    }
    const fieldList_1683 = listedFilter_1462(t_1659, fn_1680);
    if (fieldList_1683.length === 0) {
      t_1660 = new SqlBuilder_1514();
      return_1657 = t_1660.accumulated;
      break fn_1678;
    }
    function fn_1684(f_1685) {
      return f_1685.name;
    }
    t_1661 = listedMap_1209(fieldList_1683, fn_1684);
    const colNames_1686 = columnListSql_1515(t_1661);
    t_1662 = listedGet_1258(fieldList_1683, 0).name;
    const firstVal_1687 = mappedGetOr_1306(values_1656, t_1662, "");
    if (listedGet_1258(fieldList_1683, 0).fieldType === "Int") {
      let iv_1688;
      try {
        t_1674 = stringToInt32_1348(firstVal_1687);
        iv_1688 = t_1674;
      } catch {
        iv_1688 = 0;
      }
      t_1663 = new SqlBuilder_1514();
      t_1663.appendInt32(iv_1688);
      t_1664 = t_1663.accumulated;
      t_1675 = t_1664;
    } else {
      t_1665 = new SqlBuilder_1514();
      t_1665.appendString(firstVal_1687);
      t_1666 = t_1665.accumulated;
      t_1675 = t_1666;
    }
    let vals_1689 = t_1675;
    let i_1690 = 1;
    while (true) {
      t_1667 = fieldList_1683.length;
      if (!(i_1690 < t_1667)) {
        break;
      }
      t_1668 = listedGet_1258(fieldList_1683, i_1690).name;
      const val_1691 = mappedGetOr_1306(values_1656, t_1668, "");
      if (listedGet_1258(fieldList_1683, i_1690).fieldType === "Int") {
        try {
          t_1676 = stringToInt32_1348(val_1691);
          t_1677 = t_1676;
        } catch {
          t_1677 = 0;
        }
        const iv_1692 = t_1677;
        t_1669 = new SqlBuilder_1514();
        t_1669.appendFragment(vals_1689);
        t_1669.appendSafe(", ");
        t_1669.appendInt32(iv_1692);
        t_1670 = t_1669.accumulated;
        vals_1689 = t_1670;
      } else {
        t_1671 = new SqlBuilder_1514();
        t_1671.appendFragment(vals_1689);
        t_1671.appendSafe(", ");
        t_1671.appendString(val_1691);
        t_1672 = t_1671.accumulated;
        vals_1689 = t_1672;
      }
      i_1690 = i_1690 + 1 | 0;
    }
    t_1673 = new SqlBuilder_1514();
    t_1673.appendSafe("INSERT INTO ");
    t_1673.appendFragment(table_1679);
    t_1673.appendSafe(" (");
    t_1673.appendFragment(colNames_1686);
    t_1673.appendSafe(") VALUES (");
    t_1673.appendFragment(vals_1689);
    t_1673.appendSafe(")");
    return_1657 = t_1673.accumulated;
  }
  return return_1657;
};
export function main() {
  console_1188.log("=== ORMery Demo ===\n");
  const userFields_1917 = Object.freeze([field("name", "String", false, false), field("age", "Int", false, false), field("email", "String", false, true)]);
  const userSchema_1918 = schema("users", userFields_1917);
  let t_1919 = userSchema_1918.describe();
  console_1188.log(t_1919);
  console_1188.log("");
  const store_1920 = new InMemoryStore();
  const rec1_1921 = store_1920.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Alice"), pairConstructor_1812("age", "25"), pairConstructor_1812("email", "alice@example.com")])));
  const rec2_1922 = store_1920.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Bob"), pairConstructor_1812("age", "30"), pairConstructor_1812("email", "bob@example.com")])));
  const rec3_1923 = store_1920.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Charlie"), pairConstructor_1812("age", "17"), pairConstructor_1812("email", "charlie@example.com")])));
  console_1188.log("Inserted 3 users:");
  let t_1924 = rec1_1921.describe();
  console_1188.log("  " + t_1924);
  let t_1925 = rec2_1922.describe();
  console_1188.log("  " + t_1925);
  let t_1926 = rec3_1923.describe();
  console_1188.log("  " + t_1926);
  console_1188.log("");
  console_1188.log("=== In-Memory Queries ===\n");
  console_1188.log("All users:");
  const allUsers_1927 = new Query(userSchema_1918, store_1920).all();
  function fn_1928(u_1929) {
    let t_1930 = u_1929.describe();
    console_1188.log("  " + t_1930);
    return;
  }
  allUsers_1927.forEach(fn_1928);
  console_1188.log("");
  console_1188.log("Adults (age >= 18):");
  const adults_1931 = new Query(userSchema_1918, store_1920).where("age", ">=", "18").all();
  function fn_1932(u_1933) {
    let t_1934 = u_1933.describe();
    console_1188.log("  " + t_1934);
    return;
  }
  adults_1931.forEach(fn_1932);
  console_1188.log("");
  console_1188.log("=== SQL Generation (secure-composition) ===\n");
  const q1_1935 = new Query(userSchema_1918, store_1920);
  let t_1936 = q1_1935.toSql().toString();
  console_1188.log("SELECT all: " + t_1936);
  const q2_1937 = new Query(userSchema_1918, store_1920).select(Object.freeze(["name", "age"])).where("age", ">=", "18").orderBy("age", "desc").limit(10);
  let t_1938 = q2_1937.toSql().toString();
  console_1188.log("Complex:    " + t_1938);
  const bobby_1939 = "Robert'); DROP TABLE users;--";
  const q3_1940 = new Query(userSchema_1918, store_1920).where("name", "=", "Robert'); DROP TABLE users;--");
  let t_1941 = q3_1940.toSql().toString();
  console_1188.log("Injection:  " + t_1941);
  const insertVals_1942 = mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "O'Malley"), pairConstructor_1812("age", "42")]));
  let t_1943 = toInsertSql(userSchema_1918, insertVals_1942).toString();
  console_1188.log("INSERT:     " + t_1943);
  console_1188.log("\n=== Demo Complete ===");
  return;
};
/** @type {Array<string>} */
const temperKeywords_1944 = Object.freeze(["if", "else", "for", "while", "do", "when", "break", "continue", "return", "let", "var", "class", "export", "import", "public", "private", "protected", "throws", "new", "this", "get", "set", "static", "extends", "implements", "true", "false", "null", "bubble", "orelse", "of"]);
/** @type {Array<string>} */
const temperTypes_1945 = Object.freeze(["String", "Int", "Boolean", "List", "Map", "Bubble", "Pair", "Float", "Double", "Byte", "Short", "Long", "Char", "Void", "Record", "Schema", "Field", "Query", "InMemoryStore", "ListBuilder", "MapBuilder", "WhereClause", "OrderClause"]);
/**
 * @param {string} word_1946
 * @returns {TokenType}
 */
export function classifyWord(word_1946) {
  let return_1947;
  fn_1948: {
    const this_1949 = temperKeywords_1944;
    const n_1950 = this_1949.length;
    let i_1951 = 0;
    while (i_1951 < n_1950) {
      const el_1952 = listedGet_1258(this_1949, i_1951);
      i_1951 = i_1951 + 1 | 0;
      const kw_1953 = el_1952;
      if (kw_1953 === word_1946) {
        return_1947 = new TokenType("keyword");
        break fn_1948;
      }
    }
    const this_1954 = temperTypes_1945;
    const n_1955 = this_1954.length;
    let i_1956 = 0;
    while (i_1956 < n_1955) {
      const el_1957 = listedGet_1258(this_1954, i_1956);
      i_1956 = i_1956 + 1 | 0;
      const tp_1958 = el_1957;
      if (tp_1958 === word_1946) {
        return_1947 = new TokenType("type");
        break fn_1948;
      }
    }
    return_1947 = new TokenType("identifier");
  }
  return return_1947;
};
/**
 * @param {string} word_1959
 * @returns {SafeHtml_1630}
 */
export function highlightWord(word_1959) {
  let return_1960;
  let t_1961;
  fn_1962: {
    if (word_1959 === "") {
      t_1961 = new SafeHtmlBuilder_1629();
      return_1960 = t_1961.accumulated;
      break fn_1962;
    }
    const tokenType_1963 = classifyWord(word_1959);
    const token_1964 = new Token(tokenType_1963, word_1959);
    return_1960 = token_1964.toHtml();
  }
  return return_1960;
};
/**
 * @param {string} line_1965
 * @returns {SafeHtml_1630}
 */
export function highlightLine(line_1965) {
  let return_1966;
  let t_1967;
  let t_1968;
  let t_1969;
  let t_1970;
  let t_1971;
  fn_1972: {
    const words_1973 = stringSplit_1974(line_1965, " ");
    if (words_1973.length === 0) {
      t_1967 = new SafeHtmlBuilder_1629();
      return_1966 = t_1967.accumulated;
      break fn_1972;
    }
    t_1968 = highlightWord(listedGet_1258(words_1973, 0));
    let result_1975 = t_1968;
    let i_1976 = 1;
    while (true) {
      t_1969 = words_1973.length;
      if (!(i_1976 < t_1969)) {
        break;
      }
      const word_1977 = highlightWord(listedGet_1258(words_1973, i_1976));
      t_1970 = new SafeHtmlBuilder_1629();
      t_1970.appendSafeHtml(result_1975);
      t_1970.appendSafe(" ");
      t_1970.appendSafeHtml(word_1977);
      t_1971 = t_1970.accumulated;
      result_1975 = t_1971;
      i_1976 = i_1976 + 1 | 0;
    }
    return_1966 = result_1975;
  }
  return return_1966;
};
/**
 * @param {string} source_1978
 * @returns {SafeHtml_1630}
 */
export function highlightSource(source_1978) {
  let return_1979;
  let t_1980;
  let t_1981;
  let t_1982;
  let t_1983;
  let t_1984;
  fn_1985: {
    const lines_1986 = stringSplit_1974(source_1978, "\n");
    if (lines_1986.length === 0) {
      t_1980 = new SafeHtmlBuilder_1629();
      return_1979 = t_1980.accumulated;
      break fn_1985;
    }
    t_1981 = highlightLine(listedGet_1258(lines_1986, 0));
    let result_1987 = t_1981;
    let i_1988 = 1;
    while (true) {
      t_1982 = lines_1986.length;
      if (!(i_1988 < t_1982)) {
        break;
      }
      const line_1989 = highlightLine(listedGet_1258(lines_1986, i_1988));
      t_1983 = new SafeHtmlBuilder_1629();
      t_1983.appendSafeHtml(result_1987);
      t_1983.appendSafe("\\n");
      t_1983.appendSafeHtml(line_1989);
      t_1984 = t_1983.accumulated;
      result_1987 = t_1984;
      i_1988 = i_1988 + 1 | 0;
    }
    return_1979 = result_1987;
  }
  return return_1979;
};
/**
 * @param {string} source_1990
 * @returns {SafeHtml_1630}
 */
export function highlightBlock(source_1990) {
  const highlighted_1991 = highlightSource(source_1990);
  let t_1992 = new SafeHtmlBuilder_1629();
  t_1992.appendSafe("<pre class='temper-code'><code>");
  t_1992.appendSafeHtml(highlighted_1991);
  t_1992.appendSafe("<\/code><\/pre>");
  return t_1992.accumulated;
};
