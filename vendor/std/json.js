const {
  imul: imul__514
} = globalThis.Math;
import {
  type as type__95, requireInstanceOf as requireInstanceOf__309, clampInt64 as clampInt64__696, cmpFloat as cmpFloat__708, mappedGetOr as mappedGetOr_127, listedGet as listedGet_129, mappedForEach as mappedForEach_141, int64ToInt32 as int64ToInt32_181, int64ToFloat64 as int64ToFloat64_184, float64ToString as float64ToString_191, float64ToInt32 as float64ToInt32_193, float64ToInt64 as float64ToInt64_195, stringToInt32 as stringToInt32_207, stringToFloat64 as stringToFloat64_208, stringToInt64 as stringToInt64_213, listBuilderAdd as listBuilderAdd_225, listedGetOr as listedGetOr_229, listBuilderSet as listBuilderSet_237, listBuilderRemoveLast as listBuilderRemoveLast_242, mapBuilderConstructor as mapBuilderConstructor_303, panic as panic_310, mappedGet as mappedGet_315, mapBuilderSet as mapBuilderSet_316, listBuilderToList as listBuilderToList_322, mappedToMap as mappedToMap_323, stringGet as stringGet_372, stringNext as stringNext_480, stringHasAtLeast as stringHasAtLeast_551, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_556, requireStringIndex as requireStringIndex_585, int64ToInt32Unsafe as int64ToInt32Unsafe_705
} from "@temperlang/core";
export class InterchangeContext extends type__95() {
  /**
   * @param {string} headerName_94
   * @returns {string | null}
   */
  getHeader(headerName_94) {
    null;
  }
};
export class NullInterchangeContext extends type__95(InterchangeContext) {
  /**
   * @param {string} headerName_97
   * @returns {string | null}
   */
  getHeader(headerName_97) {
    return null;
  }
  /** @type {NullInterchangeContext} */
  static #instance_98 = new NullInterchangeContext();
  /** @returns {NullInterchangeContext} */
  static get instance() {
    return this.#instance_98;
  }
  constructor() {
    super ();
    return;
  }
};
export class JsonProducer extends type__95() {
  startObject() {
    null;
  }
  endObject() {
    null;
  }
  /** @param {string} key_103 */
  objectKey(key_103) {
    null;
  }
  startArray() {
    null;
  }
  endArray() {
    null;
  }
  nullValue() {
    null;
  }
  /** @param {boolean} x_108 */
  booleanValue(x_108) {
    null;
  }
  /** @param {number} x_110 */
  int32Value(x_110) {
    null;
  }
  /** @param {bigint} x_112 */
  int64Value(x_112) {
    null;
  }
  /** @param {number} x_114 */
  float64Value(x_114) {
    null;
  }
  /** @param {string} x_116 */
  numericTokenValue(x_116) {
    null;
  }
  /** @param {string} x_118 */
  stringValue(x_118) {
    null;
  }
  /** @returns {JsonParseErrorReceiver | null} */
  get parseErrorReceiver() {
    return null;
  }
};
export class JsonSyntaxTree extends type__95() {
  /** @param {JsonProducer} p_121 */
  produce(p_121) {
    null;
  }
};
export class JsonObject extends type__95(JsonSyntaxTree) {
  /** @type {Map<string, Array<JsonSyntaxTree>>} */
  #properties_122;
  /**
   * @param {string} propertyKey_124
   * @returns {JsonSyntaxTree | null}
   */
  propertyValueOrNull(propertyKey_124) {
    let return_125;
    const treeList_126 = mappedGetOr_127(this.#properties_122, propertyKey_124, Object.freeze([]));
    const lastIndex_128 = treeList_126.length - 1 | 0;
    if (lastIndex_128 >= 0) {
      return_125 = listedGet_129(treeList_126, lastIndex_128);
    } else {
      return_125 = null;
    }
    return return_125;
  }
  /**
   * @param {string} propertyKey_131
   * @returns {JsonSyntaxTree}
   */
  propertyValueOrBubble(propertyKey_131) {
    let return_132;
    let t_133 = this.propertyValueOrNull(propertyKey_131);
    if (t_133 == null) {
      throw Error();
    } else {
      return_132 = t_133;
    }
    return return_132;
  }
  /** @param {JsonProducer} p_135 */
  produce(p_135) {
    p_135.startObject();
    function fn_136(k_137, vs_138) {
      function fn_139(v_140) {
        p_135.objectKey(k_137);
        v_140.produce(p_135);
        return;
      }
      vs_138.forEach(fn_139);
      return;
    }
    mappedForEach_141(this.#properties_122, fn_136);
    p_135.endObject();
    return;
  }
  /** @param {Map<string, Array<JsonSyntaxTree>>} properties_142 */
  constructor(properties_142) {
    super ();
    this.#properties_122 = properties_142;
    return;
  }
  /** @returns {Map<string, Array<JsonSyntaxTree>>} */
  get properties() {
    return this.#properties_122;
  }
};
export class JsonArray extends type__95(JsonSyntaxTree) {
  /** @type {Array<JsonSyntaxTree>} */
  #elements_144;
  /** @param {JsonProducer} p_146 */
  produce(p_146) {
    p_146.startArray();
    function fn_147(v_148) {
      v_148.produce(p_146);
      return;
    }
    this.#elements_144.forEach(fn_147);
    p_146.endArray();
    return;
  }
  /** @param {Array<JsonSyntaxTree>} elements_149 */
  constructor(elements_149) {
    super ();
    this.#elements_144 = elements_149;
    return;
  }
  /** @returns {Array<JsonSyntaxTree>} */
  get elements() {
    return this.#elements_144;
  }
};
export class JsonBoolean extends type__95(JsonSyntaxTree) {
  /** @type {boolean} */
  #content_151;
  /** @param {JsonProducer} p_153 */
  produce(p_153) {
    p_153.booleanValue(this.#content_151);
    return;
  }
  /** @param {boolean} content_154 */
  constructor(content_154) {
    super ();
    this.#content_151 = content_154;
    return;
  }
  /** @returns {boolean} */
  get content() {
    return this.#content_151;
  }
};
export class JsonNull extends type__95(JsonSyntaxTree) {
  /** @param {JsonProducer} p_157 */
  produce(p_157) {
    p_157.nullValue();
    return;
  }
  constructor() {
    super ();
    return;
  }
};
export class JsonString extends type__95(JsonSyntaxTree) {
  /** @type {string} */
  #content_158;
  /** @param {JsonProducer} p_160 */
  produce(p_160) {
    p_160.stringValue(this.#content_158);
    return;
  }
  /** @param {string} content_161 */
  constructor(content_161) {
    super ();
    this.#content_158 = content_161;
    return;
  }
  /** @returns {string} */
  get content() {
    return this.#content_158;
  }
};
export class JsonNumeric extends type__95(JsonSyntaxTree) {
  /** @returns {string} */
  asJsonNumericToken() {
    null;
  }
  /** @returns {number} */
  asInt32() {
    null;
  }
  /** @returns {bigint} */
  asInt64() {
    null;
  }
  /** @returns {number} */
  asFloat64() {
    null;
  }
};
export class JsonInt32 extends type__95(JsonNumeric) {
  /** @type {number} */
  #content_167;
  /** @param {JsonProducer} p_169 */
  produce(p_169) {
    p_169.int32Value(this.#content_167);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_167.toString();
  }
  /** @returns {number} */
  asInt32() {
    return this.#content_167;
  }
  /** @returns {bigint} */
  asInt64() {
    return BigInt(this.#content_167);
  }
  /** @returns {number} */
  asFloat64() {
    return this.#content_167;
  }
  /** @param {number} content_174 */
  constructor(content_174) {
    super ();
    this.#content_167 = content_174;
    return;
  }
  /** @returns {number} */
  get content() {
    return this.#content_167;
  }
};
export class JsonInt64 extends type__95(JsonNumeric) {
  /** @type {bigint} */
  #content_176;
  /** @param {JsonProducer} p_178 */
  produce(p_178) {
    p_178.int64Value(this.#content_176);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_176.toString();
  }
  /** @returns {number} */
  asInt32() {
    return int64ToInt32_181(this.#content_176);
  }
  /** @returns {bigint} */
  asInt64() {
    return this.#content_176;
  }
  /** @returns {number} */
  asFloat64() {
    return int64ToFloat64_184(this.#content_176);
  }
  /** @param {bigint} content_185 */
  constructor(content_185) {
    super ();
    this.#content_176 = content_185;
    return;
  }
  /** @returns {bigint} */
  get content() {
    return this.#content_176;
  }
};
export class JsonFloat64 extends type__95(JsonNumeric) {
  /** @type {number} */
  #content_187;
  /** @param {JsonProducer} p_189 */
  produce(p_189) {
    p_189.float64Value(this.#content_187);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return float64ToString_191(this.#content_187);
  }
  /** @returns {number} */
  asInt32() {
    return float64ToInt32_193(this.#content_187);
  }
  /** @returns {bigint} */
  asInt64() {
    return float64ToInt64_195(this.#content_187);
  }
  /** @returns {number} */
  asFloat64() {
    return this.#content_187;
  }
  /** @param {number} content_197 */
  constructor(content_197) {
    super ();
    this.#content_187 = content_197;
    return;
  }
  /** @returns {number} */
  get content() {
    return this.#content_187;
  }
};
export class JsonNumericToken extends type__95(JsonNumeric) {
  /** @type {string} */
  #content_199;
  /** @param {JsonProducer} p_201 */
  produce(p_201) {
    p_201.numericTokenValue(this.#content_199);
    return;
  }
  /** @returns {string} */
  asJsonNumericToken() {
    return this.#content_199;
  }
  /** @returns {number} */
  asInt32() {
    let return_204;
    let t_205;
    let t_206;
    try {
      t_205 = stringToInt32_207(this.#content_199);
      return_204 = t_205;
    } catch {
      t_206 = stringToFloat64_208(this.#content_199);
      return_204 = float64ToInt32_193(t_206);
    }
    return return_204;
  }
  /** @returns {bigint} */
  asInt64() {
    let return_210;
    let t_211;
    let t_212;
    try {
      t_211 = stringToInt64_213(this.#content_199);
      return_210 = t_211;
    } catch {
      t_212 = stringToFloat64_208(this.#content_199);
      return_210 = float64ToInt64_195(t_212);
    }
    return return_210;
  }
  /** @returns {number} */
  asFloat64() {
    return stringToFloat64_208(this.#content_199);
  }
  /** @param {string} content_215 */
  constructor(content_215) {
    super ();
    this.#content_199 = content_215;
    return;
  }
  /** @returns {string} */
  get content() {
    return this.#content_199;
  }
};
export class JsonTextProducer extends type__95(JsonProducer) {
  /** @type {InterchangeContext} */
  #interchangeContext_217;
  /** @type {globalThis.Array<string>} */
  #buffer_218;
  /** @type {Array<number>} */
  #stack_219;
  /** @type {boolean} */
  #wellFormed_220;
  /** @param {InterchangeContext | null} [interchangeContext_221] */
  constructor(interchangeContext_221) {
    super ();
    let interchangeContext_222;
    if (interchangeContext_221 == null) {
      interchangeContext_222 = NullInterchangeContext.instance;
    } else {
      interchangeContext_222 = interchangeContext_221;
    }
    this.#interchangeContext_217 = interchangeContext_222;
    let t_223 = [""];
    this.#buffer_218 = t_223;
    let t_224 = [];
    this.#stack_219 = t_224;
    listBuilderAdd_225(this.#stack_219, 5);
    this.#wellFormed_220 = true;
    return;
  }
  /** @returns {number} */
  #state_227() {
    let t_228 = this.#stack_219.length;
    return listedGetOr_229(this.#stack_219, t_228 - 1 | 0, -1);
  }
  #beforeValue_231() {
    let t_232;
    let t_233;
    let t_234;
    let t_235;
    const currentState_236 = this.#state_227();
    if (currentState_236 === 3) {
      t_232 = this.#stack_219.length;
      listBuilderSet_237(this.#stack_219, t_232 - 1 | 0, 4);
    } else if (currentState_236 === 4) {
      this.#buffer_218[0] += ",";
    } else if (currentState_236 === 1) {
      t_233 = this.#stack_219.length;
      listBuilderSet_237(this.#stack_219, t_233 - 1 | 0, 2);
    } else if (currentState_236 === 5) {
      t_234 = this.#stack_219.length;
      listBuilderSet_237(this.#stack_219, t_234 - 1 | 0, 6);
    } else {
      if (currentState_236 === 6) {
        t_235 = true;
      } else {
        t_235 = currentState_236 === 2;
      }
      if (t_235) {
        this.#wellFormed_220 = false;
      }
    }
    return;
  }
  startObject() {
    this.#beforeValue_231();
    this.#buffer_218[0] += "{";
    listBuilderAdd_225(this.#stack_219, 0);
    return;
  }
  endObject() {
    let t_240;
    this.#buffer_218[0] += "}";
    const currentState_241 = this.#state_227();
    if (0 === currentState_241) {
      t_240 = true;
    } else {
      t_240 = 2 === currentState_241;
    }
    if (t_240) {
      listBuilderRemoveLast_242(this.#stack_219);
    } else {
      this.#wellFormed_220 = false;
    }
    return;
  }
  /** @param {string} key_244 */
  objectKey(key_244) {
    let t_245;
    const currentState_246 = this.#state_227();
    if (!(currentState_246 === 0)) {
      if (currentState_246 === 2) {
        this.#buffer_218[0] += ",";
      } else {
        this.#wellFormed_220 = false;
      }
    }
    encodeJsonString_247(key_244, this.#buffer_218);
    this.#buffer_218[0] += ":";
    if (currentState_246 >= 0) {
      t_245 = this.#stack_219.length;
      listBuilderSet_237(this.#stack_219, t_245 - 1 | 0, 1);
    }
    return;
  }
  startArray() {
    this.#beforeValue_231();
    this.#buffer_218[0] += "[";
    listBuilderAdd_225(this.#stack_219, 3);
    return;
  }
  endArray() {
    let t_250;
    this.#buffer_218[0] += "]";
    const currentState_251 = this.#state_227();
    if (3 === currentState_251) {
      t_250 = true;
    } else {
      t_250 = 4 === currentState_251;
    }
    if (t_250) {
      listBuilderRemoveLast_242(this.#stack_219);
    } else {
      this.#wellFormed_220 = false;
    }
    return;
  }
  nullValue() {
    this.#beforeValue_231();
    this.#buffer_218[0] += "null";
    return;
  }
  /** @param {boolean} x_254 */
  booleanValue(x_254) {
    let t_255;
    this.#beforeValue_231();
    if (x_254) {
      t_255 = "true";
    } else {
      t_255 = "false";
    }
    this.#buffer_218[0] += t_255;
    return;
  }
  /** @param {number} x_257 */
  int32Value(x_257) {
    this.#beforeValue_231();
    let t_258 = x_257.toString();
    this.#buffer_218[0] += t_258;
    return;
  }
  /** @param {bigint} x_260 */
  int64Value(x_260) {
    this.#beforeValue_231();
    let t_261 = x_260.toString();
    this.#buffer_218[0] += t_261;
    return;
  }
  /** @param {number} x_263 */
  float64Value(x_263) {
    this.#beforeValue_231();
    let t_264 = float64ToString_191(x_263);
    this.#buffer_218[0] += t_264;
    return;
  }
  /** @param {string} x_266 */
  numericTokenValue(x_266) {
    this.#beforeValue_231();
    this.#buffer_218[0] += x_266;
    return;
  }
  /** @param {string} x_268 */
  stringValue(x_268) {
    this.#beforeValue_231();
    encodeJsonString_247(x_268, this.#buffer_218);
    return;
  }
  /** @returns {string} */
  toJsonString() {
    let return_270;
    let t_271;
    let t_272;
    let t_273;
    if (this.#wellFormed_220) {
      if (this.#stack_219.length === 1) {
        t_271 = this.#state_227();
        t_272 = t_271 === 6;
      } else {
        t_272 = false;
      }
      t_273 = t_272;
    } else {
      t_273 = false;
    }
    if (t_273) {
      return_270 = this.#buffer_218[0];
    } else {
      throw Error();
    }
    return return_270;
  }
  /** @returns {InterchangeContext} */
  get interchangeContext() {
    return this.#interchangeContext_217;
  }
};
export class JsonParseErrorReceiver extends type__95() {
  /** @param {string} explanation_276 */
  explainJsonError(explanation_276) {
    null;
  }
};
export class JsonSyntaxTreeProducer extends type__95(JsonProducer, JsonParseErrorReceiver) {
  /** @type {Array<Array<JsonSyntaxTree>>} */
  #stack_277;
  /** @type {string | null} */
  #error_278;
  /** @returns {InterchangeContext} */
  get interchangeContext() {
    return NullInterchangeContext.instance;
  }
  constructor() {
    super ();
    let t_280 = [];
    this.#stack_277 = t_280;
    let t_281 = [];
    listBuilderAdd_225(this.#stack_277, t_281);
    this.#error_278 = null;
    return;
  }
  /** @param {JsonSyntaxTree} v_284 */
  #storeValue_283(v_284) {
    let t_285;
    if (! ! this.#stack_277.length) {
      t_285 = this.#stack_277.length;
      listBuilderAdd_225(listedGet_129(this.#stack_277, t_285 - 1 | 0), v_284);
    }
    return;
  }
  startObject() {
    let t_287 = [];
    listBuilderAdd_225(this.#stack_277, t_287);
    return;
  }
  endObject() {
    let return_289;
    let t_290;
    let t_291;
    let t_292;
    let t_293;
    let t_294;
    let t_295;
    let t_296;
    let t_297;
    let t_298;
    let t_299;
    fn_300: {
      if (! this.#stack_277.length) {
        return_289 = void 0;
        break fn_300;
      }
      const ls_301 = listBuilderRemoveLast_242(this.#stack_277);
      const m_302 = mapBuilderConstructor_303();
      let multis_304 = null;
      let i_305 = 0;
      let n_306 = ls_301.length & -2;
      while (i_305 < n_306) {
        const postfixReturn_307 = i_305;
        i_305 = i_305 + 1 | 0;
        const keyTree_308 = listedGet_129(ls_301, postfixReturn_307);
        if (!(keyTree_308 instanceof JsonString)) {
          break;
        }
        try {
          t_292 = requireInstanceOf__309(keyTree_308, JsonString);
          t_293 = t_292;
        } catch {
          t_293 = panic_310();
        }
        const key_311 = t_293.content;
        const postfixReturn_312 = i_305;
        i_305 = i_305 + 1 | 0;
        const value_313 = listedGet_129(ls_301, postfixReturn_312);
        if (m_302.has(key_311)) {
          if (multis_304 == null) {
            t_290 = mapBuilderConstructor_303();
            multis_304 = t_290;
          }
          try {
            if (multis_304 == null) {
              throw Error();
            } else {
              t_294 = multis_304;
            }
            t_295 = t_294;
          } catch {
            t_295 = panic_310();
          }
          const mb_314 = t_295;
          if (! mb_314.has(key_311)) {
            try {
              t_296 = mappedGet_315(m_302, key_311);
              t_297 = t_296;
            } catch {
              t_297 = panic_310();
            }
            mapBuilderSet_316(mb_314, key_311, t_297.slice());
          }
          try {
            t_298 = mappedGet_315(mb_314, key_311);
            t_299 = t_298;
          } catch {
            t_299 = panic_310();
          }
          listBuilderAdd_225(t_299, value_313);
        } else {
          mapBuilderSet_316(m_302, key_311, Object.freeze([value_313]));
        }
      }
      const multis_317 = multis_304;
      if (!(multis_317 == null)) {
        function fn_318(k_319, vs_320) {
          let t_321 = listBuilderToList_322(vs_320);
          mapBuilderSet_316(m_302, k_319, t_321);
          return;
        }
        mappedForEach_141(multis_317, fn_318);
      }
      t_291 = new JsonObject(mappedToMap_323(m_302));
      this.#storeValue_283(t_291);
      return_289 = void 0;
    }
    return return_289;
  }
  /** @param {string} key_325 */
  objectKey(key_325) {
    let t_326 = new JsonString(key_325);
    this.#storeValue_283(t_326);
    return;
  }
  startArray() {
    let t_328 = [];
    listBuilderAdd_225(this.#stack_277, t_328);
    return;
  }
  endArray() {
    let return_330;
    let t_331;
    fn_332: {
      if (! this.#stack_277.length) {
        return_330 = void 0;
        break fn_332;
      }
      const ls_333 = listBuilderRemoveLast_242(this.#stack_277);
      t_331 = new JsonArray(listBuilderToList_322(ls_333));
      this.#storeValue_283(t_331);
      return_330 = void 0;
    }
    return return_330;
  }
  nullValue() {
    let t_335 = new JsonNull();
    this.#storeValue_283(t_335);
    return;
  }
  /** @param {boolean} x_337 */
  booleanValue(x_337) {
    let t_338 = new JsonBoolean(x_337);
    this.#storeValue_283(t_338);
    return;
  }
  /** @param {number} x_340 */
  int32Value(x_340) {
    let t_341 = new JsonInt32(x_340);
    this.#storeValue_283(t_341);
    return;
  }
  /** @param {bigint} x_343 */
  int64Value(x_343) {
    let t_344 = new JsonInt64(x_343);
    this.#storeValue_283(t_344);
    return;
  }
  /** @param {number} x_346 */
  float64Value(x_346) {
    let t_347 = new JsonFloat64(x_346);
    this.#storeValue_283(t_347);
    return;
  }
  /** @param {string} x_349 */
  numericTokenValue(x_349) {
    let t_350 = new JsonNumericToken(x_349);
    this.#storeValue_283(t_350);
    return;
  }
  /** @param {string} x_352 */
  stringValue(x_352) {
    let t_353 = new JsonString(x_352);
    this.#storeValue_283(t_353);
    return;
  }
  /** @returns {JsonSyntaxTree} */
  toJsonSyntaxTree() {
    let t_355;
    if (this.#stack_277.length !== 1) {
      t_355 = true;
    } else {
      t_355 = !(this.#error_278 == null);
    }
    if (t_355) {
      throw Error();
    }
    const ls_356 = listedGet_129(this.#stack_277, 0);
    if (ls_356.length !== 1) {
      throw Error();
    }
    return listedGet_129(ls_356, 0);
  }
  /** @returns {string | null} */
  get jsonError() {
    return this.#error_278;
  }
  /** @returns {JsonParseErrorReceiver} */
  get parseErrorReceiver() {
    return this;
  }
  /** @param {string} error_360 */
  explainJsonError(error_360) {
    this.#error_278 = error_360;
    return;
  }
};
/**
 * @param {string} sourceText_362
 * @param {globalThis.number} i_363
 * @param {JsonProducer} out_364
 * @returns {globalThis.number}
 */
function parseJsonValue_361(sourceText_362, i_363, out_364) {
  let return_365;
  let t_366;
  let t_367;
  let t_368;
  fn_369: {
    t_366 = skipJsonSpaces_370(sourceText_362, i_363);
    i_363 = t_366;
    if (!(sourceText_362.length > i_363)) {
      expectedTokenError_371(sourceText_362, i_363, out_364, "JSON value");
      return_365 = -1;
      break fn_369;
    }
    t_367 = stringGet_372(sourceText_362, i_363);
    if (t_367 === 123) {
      return_365 = parseJsonObject_373(sourceText_362, i_363, out_364);
    } else if (t_367 === 91) {
      return_365 = parseJsonArray_374(sourceText_362, i_363, out_364);
    } else if (t_367 === 34) {
      return_365 = parseJsonString_375(sourceText_362, i_363, out_364);
    } else {
      if (t_367 === 116) {
        t_368 = true;
      } else {
        t_368 = t_367 === 102;
      }
      if (t_368) {
        return_365 = parseJsonBoolean_376(sourceText_362, i_363, out_364);
      } else if (t_367 === 110) {
        return_365 = parseJsonNull_377(sourceText_362, i_363, out_364);
      } else {
        return_365 = parseJsonNumber_378(sourceText_362, i_363, out_364);
      }
    }
  }
  return return_365;
}
/** @template T_379 */
export class JsonAdapter extends type__95() {
  /**
   * @param {T_379} x_381
   * @param {JsonProducer} p_382
   */
  encodeToJson(x_381, p_382) {
    null;
  }
  /**
   * @param {JsonSyntaxTree} t_384
   * @param {InterchangeContext} ic_385
   * @returns {T_379}
   */
  decodeFromJson(t_384, ic_385) {
    null;
  }
};
class BooleanJsonAdapter_386 extends type__95(JsonAdapter) {
  /**
   * @param {boolean} x_388
   * @param {JsonProducer} p_389
   */
  encodeToJson(x_388, p_389) {
    p_389.booleanValue(x_388);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_391
   * @param {InterchangeContext} ic_392
   * @returns {boolean}
   */
  decodeFromJson(t_391, ic_392) {
    let t_393;
    t_393 = requireInstanceOf__309(t_391, JsonBoolean);
    return t_393.content;
  }
  constructor() {
    super ();
    return;
  }
}
class Float64JsonAdapter_394 extends type__95(JsonAdapter) {
  /**
   * @param {number} x_396
   * @param {JsonProducer} p_397
   */
  encodeToJson(x_396, p_397) {
    p_397.float64Value(x_396);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_399
   * @param {InterchangeContext} ic_400
   * @returns {number}
   */
  decodeFromJson(t_399, ic_400) {
    let t_401;
    t_401 = requireInstanceOf__309(t_399, JsonNumeric);
    return t_401.asFloat64();
  }
  constructor() {
    super ();
    return;
  }
}
class Int32JsonAdapter_402 extends type__95(JsonAdapter) {
  /**
   * @param {number} x_404
   * @param {JsonProducer} p_405
   */
  encodeToJson(x_404, p_405) {
    p_405.int32Value(x_404);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_407
   * @param {InterchangeContext} ic_408
   * @returns {number}
   */
  decodeFromJson(t_407, ic_408) {
    let t_409;
    t_409 = requireInstanceOf__309(t_407, JsonNumeric);
    return t_409.asInt32();
  }
  constructor() {
    super ();
    return;
  }
}
class Int64JsonAdapter_410 extends type__95(JsonAdapter) {
  /**
   * @param {bigint} x_412
   * @param {JsonProducer} p_413
   */
  encodeToJson(x_412, p_413) {
    p_413.int64Value(x_412);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_415
   * @param {InterchangeContext} ic_416
   * @returns {bigint}
   */
  decodeFromJson(t_415, ic_416) {
    let t_417;
    t_417 = requireInstanceOf__309(t_415, JsonNumeric);
    return t_417.asInt64();
  }
  constructor() {
    super ();
    return;
  }
}
class StringJsonAdapter_418 extends type__95(JsonAdapter) {
  /**
   * @param {string} x_420
   * @param {JsonProducer} p_421
   */
  encodeToJson(x_420, p_421) {
    p_421.stringValue(x_420);
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_423
   * @param {InterchangeContext} ic_424
   * @returns {string}
   */
  decodeFromJson(t_423, ic_424) {
    let t_425;
    t_425 = requireInstanceOf__309(t_423, JsonString);
    return t_425.content;
  }
  constructor() {
    super ();
    return;
  }
}
/** @template T_427 */
class ListJsonAdapter_426 extends type__95(JsonAdapter) {
  /** @type {JsonAdapter<T_427>} */
  #adapterForT_428;
  /**
   * @param {Array<T_427>} x_430
   * @param {JsonProducer} p_431
   */
  encodeToJson(x_430, p_431) {
    const this434 = this;
    p_431.startArray();
    function fn_432(el_433) {
      this434.#adapterForT_428.encodeToJson(el_433, p_431);
      return;
    }
    x_430.forEach(fn_432);
    p_431.endArray();
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_436
   * @param {InterchangeContext} ic_437
   * @returns {Array<T_427>}
   */
  decodeFromJson(t_436, ic_437) {
    let t_438;
    const b_439 = [];
    let t_440;
    t_440 = requireInstanceOf__309(t_436, JsonArray);
    const elements_441 = t_440.elements;
    const n_442 = elements_441.length;
    let i_443 = 0;
    while (i_443 < n_442) {
      const el_444 = listedGet_129(elements_441, i_443);
      i_443 = i_443 + 1 | 0;
      t_438 = this.#adapterForT_428.decodeFromJson(el_444, ic_437);
      listBuilderAdd_225(b_439, t_438);
    }
    return listBuilderToList_322(b_439);
  }
  /** @param {JsonAdapter<T_427>} adapterForT_445 */
  constructor(adapterForT_445) {
    super ();
    this.#adapterForT_428 = adapterForT_445;
    return;
  }
}
/** @template T_446 */
export class OrNullJsonAdapter extends type__95(JsonAdapter) {
  /** @type {JsonAdapter<T_446>} */
  #adapterForT_447;
  /**
   * @param {T_446 | null} x_449
   * @param {JsonProducer} p_450
   */
  encodeToJson(x_449, p_450) {
    if (x_449 == null) {
      p_450.nullValue();
    } else {
      const x_451 = x_449;
      this.#adapterForT_447.encodeToJson(x_451, p_450);
    }
    return;
  }
  /**
   * @param {JsonSyntaxTree} t_453
   * @param {InterchangeContext} ic_454
   * @returns {T_446 | null}
   */
  decodeFromJson(t_453, ic_454) {
    let return_455;
    if (t_453 instanceof JsonNull) {
      return_455 = null;
    } else {
      return_455 = this.#adapterForT_447.decodeFromJson(t_453, ic_454);
    }
    return return_455;
  }
  /** @param {JsonAdapter<T_446>} adapterForT_456 */
  constructor(adapterForT_456) {
    super ();
    this.#adapterForT_447 = adapterForT_456;
    return;
  }
};
/** @type {Array<string>} */
const hexDigits_457 = Object.freeze(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]);
/**
 * @param {number} cp_459
 * @param {globalThis.Array<string>} buffer_460
 */
function encodeHex4_458(cp_459, buffer_460) {
  const b0_461 = (cp_459 / 4096 | 0) & 15;
  const b1_462 = (cp_459 / 256 | 0) & 15;
  const b2_463 = (cp_459 / 16 | 0) & 15;
  const b3_464 = cp_459 & 15;
  let t_465 = listedGet_129(hexDigits_457, b0_461);
  buffer_460[0] += t_465;
  let t_466 = listedGet_129(hexDigits_457, b1_462);
  buffer_460[0] += t_466;
  let t_467 = listedGet_129(hexDigits_457, b2_463);
  buffer_460[0] += t_467;
  let t_468 = listedGet_129(hexDigits_457, b3_464);
  buffer_460[0] += t_468;
  return;
}
/**
 * @param {string} x_469
 * @param {globalThis.Array<string>} buffer_470
 */
function encodeJsonString_247(x_469, buffer_470) {
  let t_471;
  let t_472;
  let t_473;
  let t_474;
  buffer_470[0] += '"';
  let i_475 = 0;
  let emitted_476 = i_475;
  while (true) {
    if (!(x_469.length > i_475)) {
      break;
    }
    const cp_477 = stringGet_372(x_469, i_475);
    if (cp_477 === 8) {
      t_474 = "\\b";
    } else if (cp_477 === 9) {
      t_474 = "\\t";
    } else if (cp_477 === 10) {
      t_474 = "\\n";
    } else if (cp_477 === 12) {
      t_474 = "\\f";
    } else if (cp_477 === 13) {
      t_474 = "\\r";
    } else if (cp_477 === 34) {
      t_474 = '\\"';
    } else if (cp_477 === 92) {
      t_474 = "\\\\";
    } else {
      if (cp_477 < 32) {
        t_472 = true;
      } else {
        if (55296 <= cp_477) {
          t_471 = cp_477 <= 57343;
        } else {
          t_471 = false;
        }
        t_472 = t_471;
      }
      if (t_472) {
        t_473 = "\\u";
      } else {
        t_473 = "";
      }
      t_474 = t_473;
    }
    const replacement_478 = t_474;
    const nextI_479 = stringNext_480(x_469, i_475);
    if (replacement_478 !== "") {
      buffer_470[0] += x_469.substring(emitted_476, i_475);
      buffer_470[0] += replacement_478;
      if (replacement_478 === "\\u") {
        encodeHex4_458(cp_477, buffer_470);
      }
      emitted_476 = nextI_479;
    }
    i_475 = nextI_479;
  }
  buffer_470[0] += x_469.substring(emitted_476, i_475);
  buffer_470[0] += '"';
  return;
}
/**
 * @param {JsonProducer} out_482
 * @param {string} explanation_483
 */
function storeJsonError_481(out_482, explanation_483) {
  let t_484 = out_482.parseErrorReceiver;
  if (!(t_484 == null)) {
    t_484.explainJsonError(explanation_483);
  }
  return;
}
/**
 * @param {string} sourceText_485
 * @param {globalThis.number} i_486
 * @param {JsonProducer} out_487
 * @param {string} shortExplanation_488
 */
function expectedTokenError_371(sourceText_485, i_486, out_487, shortExplanation_488) {
  let t_489;
  let t_490;
  let gotten_491;
  if (sourceText_485.length > i_486) {
    t_489 = sourceText_485.length;
    t_490 = sourceText_485.substring(i_486, t_489);
    gotten_491 = "`" + t_490 + "`";
  } else {
    gotten_491 = "end-of-file";
  }
  storeJsonError_481(out_487, "Expected " + shortExplanation_488 + ", but got " + gotten_491);
  return;
}
/**
 * @param {string} sourceText_492
 * @param {globalThis.number} i_493
 * @returns {globalThis.number}
 */
function skipJsonSpaces_370(sourceText_492, i_493) {
  let t_494;
  let t_495;
  let t_496;
  let t_497;
  let t_498;
  while (true) {
    if (!(sourceText_492.length > i_493)) {
      break;
    }
    t_494 = stringGet_372(sourceText_492, i_493);
    if (t_494 === 9) {
      t_498 = true;
    } else {
      if (t_494 === 10) {
        t_497 = true;
      } else {
        if (t_494 === 13) {
          t_496 = true;
        } else {
          t_496 = t_494 === 32;
        }
        t_497 = t_496;
      }
      t_498 = t_497;
    }
    if (! t_498) {
      break;
    }
    t_495 = stringNext_480(sourceText_492, i_493);
    i_493 = t_495;
  }
  return i_493;
}
/**
 * @param {string} sourceText_500
 * @param {globalThis.number} start_501
 * @param {globalThis.number} limit_502
 * @returns {number}
 */
function decodeHexUnsigned_499(sourceText_500, start_501, limit_502) {
  let return_503;
  let t_504;
  let t_505;
  let t_506;
  let t_507;
  let t_508;
  fn_509: {
    let n_510 = 0;
    let i_511 = start_501;
    while (true) {
      if (!(i_511 - limit_502 < 0)) {
        break;
      }
      const cp_512 = stringGet_372(sourceText_500, i_511);
      if (48 <= cp_512) {
        t_505 = cp_512 <= 48;
      } else {
        t_505 = false;
      }
      if (t_505) {
        t_508 = cp_512 - 48 | 0;
      } else {
        if (65 <= cp_512) {
          t_506 = cp_512 <= 70;
        } else {
          t_506 = false;
        }
        if (t_506) {
          t_508 = (cp_512 - 65 | 0) + 10 | 0;
        } else {
          if (97 <= cp_512) {
            t_507 = cp_512 <= 102;
          } else {
            t_507 = false;
          }
          if (t_507) {
            t_508 = (cp_512 - 97 | 0) + 10 | 0;
          } else {
            return_503 = -1;
            break fn_509;
          }
        }
      }
      const digit_513 = t_508;
      n_510 = imul__514(n_510, 16) + digit_513 | 0;
      t_504 = stringNext_480(sourceText_500, i_511);
      i_511 = t_504;
    }
    return_503 = n_510;
  }
  return return_503;
}
/**
 * @param {string} sourceText_516
 * @param {globalThis.number} i_517
 * @param {globalThis.Array<string>} sb_518
 * @param {JsonProducer} errOut_519
 * @returns {globalThis.number}
 */
function parseJsonStringTo_515(sourceText_516, i_517, sb_518, errOut_519) {
  let return_520;
  let t_521;
  let t_522;
  let t_523;
  let t_524;
  let t_525;
  let t_526;
  let t_527;
  let t_528;
  let t_529;
  let t_530;
  let t_531;
  let t_532;
  let t_533;
  let t_534;
  let t_535;
  let t_536;
  let t_537;
  let t_538;
  let t_539;
  let t_540;
  let t_541;
  let t_542;
  fn_543: {
    if (!(sourceText_516.length > i_517)) {
      t_532 = true;
    } else {
      t_521 = stringGet_372(sourceText_516, i_517);
      t_532 = t_521 !== 34;
    }
    if (t_532) {
      expectedTokenError_371(sourceText_516, i_517, errOut_519, '"');
      return_520 = -1;
      break fn_543;
    }
    t_522 = stringNext_480(sourceText_516, i_517);
    i_517 = t_522;
    let leadSurrogate_544 = -1;
    let consumed_545 = i_517;
    while (true) {
      if (!(sourceText_516.length > i_517)) {
        break;
      }
      const cp_546 = stringGet_372(sourceText_516, i_517);
      if (cp_546 === 34) {
        break;
      }
      t_523 = stringNext_480(sourceText_516, i_517);
      let iNext_547 = t_523;
      const end_548 = sourceText_516.length;
      let needToFlush_549 = false;
      if (cp_546 !== 92) {
        t_538 = cp_546;
      } else {
        needToFlush_549 = true;
        if (!(sourceText_516.length > iNext_547)) {
          expectedTokenError_371(sourceText_516, iNext_547, errOut_519, "escape sequence");
          return_520 = -1;
          break fn_543;
        }
        const esc0_550 = stringGet_372(sourceText_516, iNext_547);
        t_524 = stringNext_480(sourceText_516, iNext_547);
        iNext_547 = t_524;
        if (esc0_550 === 34) {
          t_534 = true;
        } else {
          if (esc0_550 === 92) {
            t_533 = true;
          } else {
            t_533 = esc0_550 === 47;
          }
          t_534 = t_533;
        }
        if (t_534) {
          t_537 = esc0_550;
        } else if (esc0_550 === 98) {
          t_537 = 8;
        } else if (esc0_550 === 102) {
          t_537 = 12;
        } else if (esc0_550 === 110) {
          t_537 = 10;
        } else if (esc0_550 === 114) {
          t_537 = 13;
        } else if (esc0_550 === 116) {
          t_537 = 9;
        } else if (esc0_550 === 117) {
          if (stringHasAtLeast_551(sourceText_516, iNext_547, end_548, 4)) {
            const startHex_552 = iNext_547;
            t_525 = stringNext_480(sourceText_516, iNext_547);
            iNext_547 = t_525;
            t_526 = stringNext_480(sourceText_516, iNext_547);
            iNext_547 = t_526;
            t_527 = stringNext_480(sourceText_516, iNext_547);
            iNext_547 = t_527;
            t_528 = stringNext_480(sourceText_516, iNext_547);
            iNext_547 = t_528;
            t_529 = decodeHexUnsigned_499(sourceText_516, startHex_552, iNext_547);
            t_535 = t_529;
          } else {
            t_535 = -1;
          }
          const hex_553 = t_535;
          if (hex_553 < 0) {
            expectedTokenError_371(sourceText_516, iNext_547, errOut_519, "four hex digits");
            return_520 = -1;
            break fn_543;
          }
          t_536 = hex_553;
          t_537 = t_536;
        } else {
          expectedTokenError_371(sourceText_516, iNext_547, errOut_519, "escape sequence");
          return_520 = -1;
          break fn_543;
        }
        t_538 = t_537;
      }
      let decodedCp_554 = t_538;
      if (leadSurrogate_544 >= 0) {
        needToFlush_549 = true;
        const lead_555 = leadSurrogate_544;
        if (56320 <= decodedCp_554) {
          t_539 = decodedCp_554 <= 57343;
        } else {
          t_539 = false;
        }
        if (t_539) {
          leadSurrogate_544 = -1;
          decodedCp_554 = 65536 +(imul__514(lead_555 - 55296 | 0, 1024) |(decodedCp_554 - 56320 | 0)) | 0;
        }
      } else {
        if (55296 <= decodedCp_554) {
          t_540 = decodedCp_554 <= 56319;
        } else {
          t_540 = false;
        }
        if (t_540) {
          needToFlush_549 = true;
        }
      }
      if (needToFlush_549) {
        sb_518[0] += sourceText_516.substring(consumed_545, i_517);
        if (leadSurrogate_544 >= 0) {
          try {
            stringBuilderAppendCodePoint_556(sb_518, leadSurrogate_544);
          } catch {
            throw Error();
          }
        }
        if (55296 <= decodedCp_554) {
          t_541 = decodedCp_554 <= 56319;
        } else {
          t_541 = false;
        }
        if (t_541) {
          leadSurrogate_544 = decodedCp_554;
        } else {
          leadSurrogate_544 = -1;
          try {
            stringBuilderAppendCodePoint_556(sb_518, decodedCp_554);
          } catch {
            throw Error();
          }
        }
        consumed_545 = iNext_547;
      }
      i_517 = iNext_547;
    }
    if (!(sourceText_516.length > i_517)) {
      t_542 = true;
    } else {
      t_530 = stringGet_372(sourceText_516, i_517);
      t_542 = t_530 !== 34;
    }
    if (t_542) {
      expectedTokenError_371(sourceText_516, i_517, errOut_519, '"');
      return_520 = -1;
    } else {
      if (leadSurrogate_544 >= 0) {
        try {
          stringBuilderAppendCodePoint_556(sb_518, leadSurrogate_544);
        } catch {
          throw Error();
        }
      } else {
        sb_518[0] += sourceText_516.substring(consumed_545, i_517);
      }
      t_531 = stringNext_480(sourceText_516, i_517);
      i_517 = t_531;
      return_520 = i_517;
    }
  }
  return return_520;
}
/**
 * @param {string} sourceText_557
 * @param {globalThis.number} i_558
 * @param {JsonProducer} out_559
 * @returns {globalThis.number}
 */
function parseJsonObject_373(sourceText_557, i_558, out_559) {
  let return_560;
  let t_561;
  let t_562;
  let t_563;
  let t_564;
  let t_565;
  let t_566;
  let t_567;
  let t_568;
  let t_569;
  let t_570;
  let t_571;
  let t_572;
  let t_573;
  let t_574;
  let t_575;
  let t_576;
  let t_577;
  let t_578;
  let t_579;
  let t_580;
  let t_581;
  fn_582: {
    try {
      if (!(sourceText_557.length > i_558)) {
        t_574 = true;
      } else {
        t_561 = stringGet_372(sourceText_557, i_558);
        t_574 = t_561 !== 123;
      }
      if (t_574) {
        expectedTokenError_371(sourceText_557, i_558, out_559, "'{'");
        return_560 = -1;
        break fn_582;
      }
      out_559.startObject();
      t_562 = stringNext_480(sourceText_557, i_558);
      t_563 = skipJsonSpaces_370(sourceText_557, t_562);
      i_558 = t_563;
      if (sourceText_557.length > i_558) {
        t_564 = stringGet_372(sourceText_557, i_558);
        t_575 = t_564 !== 125;
      } else {
        t_575 = false;
      }
      if (t_575) {
        while (true) {
          const keyBuffer_583 = [""];
          const afterKey_584 = parseJsonStringTo_515(sourceText_557, i_558, keyBuffer_583, out_559);
          if (!(afterKey_584 >= 0)) {
            return_560 = -1;
            break fn_582;
          }
          t_565 = keyBuffer_583[0];
          out_559.objectKey(t_565);
          try {
            t_576 = requireStringIndex_585(afterKey_584);
            t_577 = t_576;
          } catch {
            t_577 = panic_310();
          }
          t_566 = skipJsonSpaces_370(sourceText_557, t_577);
          i_558 = t_566;
          if (sourceText_557.length > i_558) {
            t_567 = stringGet_372(sourceText_557, i_558);
            t_578 = t_567 === 58;
          } else {
            t_578 = false;
          }
          if (t_578) {
            t_568 = stringNext_480(sourceText_557, i_558);
            i_558 = t_568;
            const afterPropertyValue_586 = parseJsonValue_361(sourceText_557, i_558, out_559);
            if (!(afterPropertyValue_586 >= 0)) {
              return_560 = -1;
              break fn_582;
            }
            t_579 = requireStringIndex_585(afterPropertyValue_586);
            i_558 = t_579;
          } else {
            expectedTokenError_371(sourceText_557, i_558, out_559, "':'");
            return_560 = -1;
            break fn_582;
          }
          t_569 = skipJsonSpaces_370(sourceText_557, i_558);
          i_558 = t_569;
          if (sourceText_557.length > i_558) {
            t_570 = stringGet_372(sourceText_557, i_558);
            t_580 = t_570 === 44;
          } else {
            t_580 = false;
          }
          if (t_580) {
            t_571 = stringNext_480(sourceText_557, i_558);
            t_572 = skipJsonSpaces_370(sourceText_557, t_571);
            i_558 = t_572;
          } else {
            break;
          }
        }
      }
      if (sourceText_557.length > i_558) {
        t_573 = stringGet_372(sourceText_557, i_558);
        t_581 = t_573 === 125;
      } else {
        t_581 = false;
      }
      if (t_581) {
        out_559.endObject();
        return_560 = stringNext_480(sourceText_557, i_558);
      } else {
        expectedTokenError_371(sourceText_557, i_558, out_559, "'}'");
        return_560 = -1;
      }
    } catch {
      return_560 = panic_310();
    }
  }
  return return_560;
}
/**
 * @param {string} sourceText_587
 * @param {globalThis.number} i_588
 * @param {JsonProducer} out_589
 * @returns {globalThis.number}
 */
function parseJsonArray_374(sourceText_587, i_588, out_589) {
  let return_590;
  let t_591;
  let t_592;
  let t_593;
  let t_594;
  let t_595;
  let t_596;
  let t_597;
  let t_598;
  let t_599;
  let t_600;
  let t_601;
  let t_602;
  let t_603;
  let t_604;
  fn_605: {
    try {
      if (!(sourceText_587.length > i_588)) {
        t_600 = true;
      } else {
        t_591 = stringGet_372(sourceText_587, i_588);
        t_600 = t_591 !== 91;
      }
      if (t_600) {
        expectedTokenError_371(sourceText_587, i_588, out_589, "'['");
        return_590 = -1;
        break fn_605;
      }
      out_589.startArray();
      t_592 = stringNext_480(sourceText_587, i_588);
      t_593 = skipJsonSpaces_370(sourceText_587, t_592);
      i_588 = t_593;
      if (sourceText_587.length > i_588) {
        t_594 = stringGet_372(sourceText_587, i_588);
        t_601 = t_594 !== 93;
      } else {
        t_601 = false;
      }
      if (t_601) {
        while (true) {
          const afterElementValue_606 = parseJsonValue_361(sourceText_587, i_588, out_589);
          if (!(afterElementValue_606 >= 0)) {
            return_590 = -1;
            break fn_605;
          }
          t_602 = requireStringIndex_585(afterElementValue_606);
          i_588 = t_602;
          t_595 = skipJsonSpaces_370(sourceText_587, i_588);
          i_588 = t_595;
          if (sourceText_587.length > i_588) {
            t_596 = stringGet_372(sourceText_587, i_588);
            t_603 = t_596 === 44;
          } else {
            t_603 = false;
          }
          if (t_603) {
            t_597 = stringNext_480(sourceText_587, i_588);
            t_598 = skipJsonSpaces_370(sourceText_587, t_597);
            i_588 = t_598;
          } else {
            break;
          }
        }
      }
      if (sourceText_587.length > i_588) {
        t_599 = stringGet_372(sourceText_587, i_588);
        t_604 = t_599 === 93;
      } else {
        t_604 = false;
      }
      if (t_604) {
        out_589.endArray();
        return_590 = stringNext_480(sourceText_587, i_588);
      } else {
        expectedTokenError_371(sourceText_587, i_588, out_589, "']'");
        return_590 = -1;
      }
    } catch {
      return_590 = panic_310();
    }
  }
  return return_590;
}
/**
 * @param {string} sourceText_607
 * @param {globalThis.number} i_608
 * @param {JsonProducer} out_609
 * @returns {globalThis.number}
 */
function parseJsonString_375(sourceText_607, i_608, out_609) {
  let t_610;
  const sb_611 = [""];
  const after_612 = parseJsonStringTo_515(sourceText_607, i_608, sb_611, out_609);
  if (after_612 >= 0) {
    t_610 = sb_611[0];
    out_609.stringValue(t_610);
  }
  return after_612;
}
/**
 * @param {string} string_614
 * @param {globalThis.number} inString_615
 * @param {string} substring_616
 * @returns {globalThis.number}
 */
function afterSubstring_613(string_614, inString_615, substring_616) {
  let return_617;
  let t_618;
  let t_619;
  fn_620: {
    let i_621 = inString_615;
    let j_622 = 0;
    while (true) {
      if (!(substring_616.length > j_622)) {
        break;
      }
      if (!(string_614.length > i_621)) {
        return_617 = -1;
        break fn_620;
      }
      if (stringGet_372(string_614, i_621) !== stringGet_372(substring_616, j_622)) {
        return_617 = -1;
        break fn_620;
      }
      t_618 = stringNext_480(string_614, i_621);
      i_621 = t_618;
      t_619 = stringNext_480(substring_616, j_622);
      j_622 = t_619;
    }
    return_617 = i_621;
  }
  return return_617;
}
/**
 * @param {string} sourceText_623
 * @param {globalThis.number} i_624
 * @param {JsonProducer} out_625
 * @returns {globalThis.number}
 */
function parseJsonBoolean_376(sourceText_623, i_624, out_625) {
  let return_626;
  let t_627;
  fn_628: {
    let ch0_629;
    if (sourceText_623.length > i_624) {
      t_627 = stringGet_372(sourceText_623, i_624);
      ch0_629 = t_627;
    } else {
      ch0_629 = 0;
    }
    const end_630 = sourceText_623.length;
    let keyword_631;
    let n_632;
    if (ch0_629 === 102) {
      keyword_631 = "false";
      n_632 = 5;
    } else if (ch0_629 === 116) {
      keyword_631 = "true";
      n_632 = 4;
    } else {
      keyword_631 = null;
      n_632 = 0;
    }
    if (!(keyword_631 == null)) {
      const keyword_633 = keyword_631;
      if (stringHasAtLeast_551(sourceText_623, i_624, end_630, n_632)) {
        const after_634 = afterSubstring_613(sourceText_623, i_624, keyword_633);
        if (after_634 >= 0) {
          return_626 = requireStringIndex_585(after_634);
          out_625.booleanValue(n_632 === 4);
          break fn_628;
        }
      }
    }
    expectedTokenError_371(sourceText_623, i_624, out_625, "`false` or `true`");
    return_626 = -1;
  }
  return return_626;
}
/**
 * @param {string} sourceText_635
 * @param {globalThis.number} i_636
 * @param {JsonProducer} out_637
 * @returns {globalThis.number}
 */
function parseJsonNull_377(sourceText_635, i_636, out_637) {
  let return_638;
  fn_639: {
    const after_640 = afterSubstring_613(sourceText_635, i_636, "null");
    if (after_640 >= 0) {
      return_638 = requireStringIndex_585(after_640);
      out_637.nullValue();
      break fn_639;
    }
    expectedTokenError_371(sourceText_635, i_636, out_637, "`null`");
    return_638 = -1;
  }
  return return_638;
}
/**
 * @param {string} sourceText_641
 * @param {globalThis.number} i_642
 * @param {JsonProducer} out_643
 * @returns {globalThis.number}
 */
function parseJsonNumber_378(sourceText_641, i_642, out_643) {
  let return_644;
  let t_645;
  let t_646;
  let t_647;
  let t_648;
  let t_649;
  let t_650;
  let t_651;
  let t_652;
  let t_653;
  let t_654;
  let t_655;
  let t_656;
  let t_657;
  let t_658;
  let t_659;
  let t_660;
  let t_661;
  let t_662;
  let t_663;
  let t_664;
  let t_665;
  let t_666;
  let t_667;
  let t_668;
  let t_669;
  let t_670;
  let t_671;
  let t_672;
  let t_673;
  let t_674;
  let t_675;
  let t_676;
  let t_677;
  let t_678;
  let t_679;
  let t_680;
  let t_681;
  let t_682;
  let t_683;
  fn_684: {
    let isNegative_685 = false;
    const startOfNumber_686 = i_642;
    if (sourceText_641.length > i_642) {
      t_645 = stringGet_372(sourceText_641, i_642);
      t_663 = t_645 === 45;
    } else {
      t_663 = false;
    }
    if (t_663) {
      isNegative_685 = true;
      t_646 = stringNext_480(sourceText_641, i_642);
      i_642 = t_646;
    }
    let digit0_687;
    if (sourceText_641.length > i_642) {
      t_647 = stringGet_372(sourceText_641, i_642);
      digit0_687 = t_647;
    } else {
      digit0_687 = -1;
    }
    if (digit0_687 < 48) {
      t_664 = true;
    } else {
      t_664 = 57 < digit0_687;
    }
    if (t_664) {
      let error_688;
      if (! isNegative_685) {
        t_665 = digit0_687 !== 46;
      } else {
        t_665 = false;
      }
      if (t_665) {
        error_688 = "JSON value";
      } else {
        error_688 = "digit";
      }
      expectedTokenError_371(sourceText_641, i_642, out_643, error_688);
      return_644 = -1;
      break fn_684;
    }
    t_648 = stringNext_480(sourceText_641, i_642);
    i_642 = t_648;
    let nDigits_689 = 1;
    t_649 = digit0_687 - 48 | 0;
    let tentativeFloat64_690 = t_649;
    t_650 = BigInt(digit0_687 - 48 | 0);
    let tentativeInt64_691 = t_650;
    let overflowInt64_692 = false;
    if (48 !== digit0_687) {
      while (true) {
        if (!(sourceText_641.length > i_642)) {
          break;
        }
        const possibleDigit_693 = stringGet_372(sourceText_641, i_642);
        if (48 <= possibleDigit_693) {
          t_666 = possibleDigit_693 <= 57;
        } else {
          t_666 = false;
        }
        if (t_666) {
          t_651 = stringNext_480(sourceText_641, i_642);
          i_642 = t_651;
          nDigits_689 = nDigits_689 + 1 | 0;
          const nextDigit_694 = possibleDigit_693 - 48 | 0;
          t_667 = tentativeFloat64_690 * 10.0;
          t_652 = nextDigit_694;
          tentativeFloat64_690 = t_667 + t_652;
          const oldInt64_695 = tentativeInt64_691;
          t_668 = clampInt64__696(tentativeInt64_691 * BigInt("10"));
          t_653 = BigInt(nextDigit_694);
          tentativeInt64_691 = clampInt64__696(t_668 + t_653);
          if (tentativeInt64_691 < oldInt64_695) {
            if (clampInt64__696(BigInt("-9223372036854775808") - oldInt64_695) === clampInt64__696(- BigInt(nextDigit_694))) {
              if (isNegative_685) {
                t_669 = oldInt64_695 > BigInt("0");
              } else {
                t_669 = false;
              }
              t_670 = t_669;
            } else {
              t_670 = false;
            }
            if (! t_670) {
              overflowInt64_692 = true;
            }
          }
        } else {
          break;
        }
      }
    }
    let nDigitsAfterPoint_697 = 0;
    if (sourceText_641.length > i_642) {
      t_654 = stringGet_372(sourceText_641, i_642);
      t_671 = 46 === t_654;
    } else {
      t_671 = false;
    }
    if (t_671) {
      t_655 = stringNext_480(sourceText_641, i_642);
      i_642 = t_655;
      const afterPoint_698 = i_642;
      while (true) {
        if (!(sourceText_641.length > i_642)) {
          break;
        }
        const possibleDigit_699 = stringGet_372(sourceText_641, i_642);
        if (48 <= possibleDigit_699) {
          t_672 = possibleDigit_699 <= 57;
        } else {
          t_672 = false;
        }
        if (t_672) {
          t_656 = stringNext_480(sourceText_641, i_642);
          i_642 = t_656;
          nDigits_689 = nDigits_689 + 1 | 0;
          nDigitsAfterPoint_697 = nDigitsAfterPoint_697 + 1 | 0;
          t_673 = tentativeFloat64_690 * 10.0;
          t_657 = possibleDigit_699 - 48 | 0;
          tentativeFloat64_690 = t_673 + t_657;
        } else {
          break;
        }
      }
      if (i_642 === afterPoint_698) {
        expectedTokenError_371(sourceText_641, i_642, out_643, "digit");
        return_644 = -1;
        break fn_684;
      }
    }
    let nExponentDigits_700 = 0;
    if (sourceText_641.length > i_642) {
      t_658 = stringGet_372(sourceText_641, i_642);
      t_674 = 101 ===(t_658 | 32);
    } else {
      t_674 = false;
    }
    if (t_674) {
      t_659 = stringNext_480(sourceText_641, i_642);
      i_642 = t_659;
      if (!(sourceText_641.length > i_642)) {
        expectedTokenError_371(sourceText_641, i_642, out_643, "sign or digit");
        return_644 = -1;
        break fn_684;
      }
      const afterE_701 = stringGet_372(sourceText_641, i_642);
      if (afterE_701 === 43) {
        t_675 = true;
      } else {
        t_675 = afterE_701 === 45;
      }
      if (t_675) {
        t_660 = stringNext_480(sourceText_641, i_642);
        i_642 = t_660;
      }
      while (true) {
        if (!(sourceText_641.length > i_642)) {
          break;
        }
        const possibleDigit_702 = stringGet_372(sourceText_641, i_642);
        if (48 <= possibleDigit_702) {
          t_676 = possibleDigit_702 <= 57;
        } else {
          t_676 = false;
        }
        if (t_676) {
          t_661 = stringNext_480(sourceText_641, i_642);
          i_642 = t_661;
          nExponentDigits_700 = nExponentDigits_700 + 1 | 0;
        } else {
          break;
        }
      }
      if (nExponentDigits_700 === 0) {
        expectedTokenError_371(sourceText_641, i_642, out_643, "exponent digit");
        return_644 = -1;
        break fn_684;
      }
    }
    const afterExponent_703 = i_642;
    if (nExponentDigits_700 === 0) {
      if (nDigitsAfterPoint_697 === 0) {
        t_677 = ! overflowInt64_692;
      } else {
        t_677 = false;
      }
      t_678 = t_677;
    } else {
      t_678 = false;
    }
    if (t_678) {
      let value_704;
      if (isNegative_685) {
        value_704 = clampInt64__696(- tentativeInt64_691);
      } else {
        value_704 = tentativeInt64_691;
      }
      if (BigInt("-2147483648") <= value_704) {
        t_679 = value_704 <= BigInt("2147483647");
      } else {
        t_679 = false;
      }
      if (t_679) {
        t_662 = int64ToInt32Unsafe_705(value_704);
        out_643.int32Value(t_662);
      } else {
        out_643.int64Value(value_704);
      }
      return_644 = i_642;
      break fn_684;
    }
    const numericTokenString_706 = sourceText_641.substring(startOfNumber_686, i_642);
    let doubleValue_707 = NaN;
    if (nExponentDigits_700 !== 0) {
      t_680 = true;
    } else {
      t_680 = nDigitsAfterPoint_697 !== 0;
    }
    if (t_680) {
      try {
        t_681 = stringToFloat64_208(numericTokenString_706);
        doubleValue_707 = t_681;
      } catch {
      }
    }
    if (cmpFloat__708(doubleValue_707, -Infinity) !== 0) {
      if (cmpFloat__708(doubleValue_707, Infinity) !== 0) {
        t_682 = cmpFloat__708(doubleValue_707, NaN) !== 0;
      } else {
        t_682 = false;
      }
      t_683 = t_682;
    } else {
      t_683 = false;
    }
    if (t_683) {
      out_643.float64Value(doubleValue_707);
    } else {
      out_643.numericTokenValue(numericTokenString_706);
    }
    return_644 = i_642;
  }
  return return_644;
}
/**
 * @param {string} sourceText_709
 * @param {JsonProducer} out_710
 */
export function parseJsonToProducer(sourceText_709, out_710) {
  let t_711;
  let t_712;
  let t_713;
  let t_714;
  let t_715;
  let t_716;
  let i_717 = 0;
  const afterValue_718 = parseJsonValue_361(sourceText_709, i_717, out_710);
  if (afterValue_718 >= 0) {
    t_716 = requireStringIndex_585(afterValue_718);
    t_711 = skipJsonSpaces_370(sourceText_709, t_716);
    i_717 = t_711;
    if (sourceText_709.length > i_717) {
      t_712 = out_710.parseErrorReceiver;
      t_715 = !(t_712 == null);
    } else {
      t_715 = false;
    }
    if (t_715) {
      t_713 = sourceText_709.length;
      t_714 = sourceText_709.substring(i_717, t_713);
      storeJsonError_481(out_710, "Extraneous JSON `" + t_714 + "`");
    }
  }
  return;
};
/**
 * @param {string} sourceText_719
 * @returns {JsonSyntaxTree}
 */
export function parseJson(sourceText_719) {
  const p_720 = new JsonSyntaxTreeProducer();
  parseJsonToProducer(sourceText_719, p_720);
  return p_720.toJsonSyntaxTree();
};
/** @returns {JsonAdapter<boolean>} */
export function booleanJsonAdapter() {
  return new BooleanJsonAdapter_386();
};
/** @returns {JsonAdapter<number>} */
export function float64JsonAdapter() {
  return new Float64JsonAdapter_394();
};
/** @returns {JsonAdapter<number>} */
export function int32JsonAdapter() {
  return new Int32JsonAdapter_402();
};
/** @returns {JsonAdapter<bigint>} */
export function int64JsonAdapter() {
  return new Int64JsonAdapter_410();
};
/** @returns {JsonAdapter<string>} */
export function stringJsonAdapter() {
  return new StringJsonAdapter_418();
};
/**
 * @template {unknown} T_722
 * @param {JsonAdapter<T_722>} adapterForT_721
 * @returns {JsonAdapter<Array<T_722>>}
 */
export function listJsonAdapter(adapterForT_721) {
  return new ListJsonAdapter_426(adapterForT_721);
};
