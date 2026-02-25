import {
  globalConsole as globalConsole__225, type as type__238, listBuilderAdd as listBuilderAdd_231, listBuilderToList as listBuilderToList_236
} from "@temperlang/core";
globalConsole__225;
/** @template PART_226 */
export class Collector extends type__238() {
  /** @type {Array<Collected<PART_226>>} */
  #partsBuilder_227;
  /** @param {string} fixed_229 */
  appendSafe(fixed_229) {
    let t_230 = new CollectedFixed(fixed_229);
    listBuilderAdd_231(this.#partsBuilder_227, t_230);
    return;
  }
  /** @param {PART_226} part_233 */
  append(part_233) {
    let t_234 = new CollectedPart(part_233);
    listBuilderAdd_231(this.#partsBuilder_227, t_234);
    return;
  }
  /** @returns {Array<Collected<PART_226>>} */
  get parts() {
    return listBuilderToList_236(this.#partsBuilder_227);
  }
  constructor() {
    super ();
    let t_237 = [];
    this.#partsBuilder_227 = t_237;
    return;
  }
};
/** @template PART_239 */
export class Collected extends type__238() {
};
/** @template PART_240 */
export class CollectedFixed extends type__238(Collected) {
  /** @type {string} */
  #safeText_241;
  /** @param {string} safeText_242 */
  constructor(safeText_242) {
    super ();
    this.#safeText_241 = safeText_242;
    return;
  }
  /** @returns {string} */
  get safeText() {
    return this.#safeText_241;
  }
};
/** @template PART_244 */
export class CollectedPart extends type__238(Collected) {
  /** @type {PART_244} */
  #part_245;
  /** @param {PART_244} part_246 */
  constructor(part_246) {
    super ();
    this.#part_245 = part_246;
    return;
  }
  /** @returns {PART_244} */
  get part() {
    return this.#part_245;
  }
};
export class Context extends type__238() {
  /** @returns {string} */
  toString() {
    null;
  }
};
/** @template CONTEXT_249 */
export class AutoescState extends type__238() {
  /** @type {CONTEXT_249} */
  #context_250;
  /** @type {Subsidiary | null} */
  #subsidiary_251;
  /**
   * @template CONTEXT_249
   * @param {{
   *   context: CONTEXT_249, subsidiary: Subsidiary | null
   * }}
   * props
   * @returns {AutoescState<CONTEXT_249>}
   */
  static["new"](props) {
    return new AutoescState(props.context, props.subsidiary);
  }
  /**
   * @param {CONTEXT_249} context_252
   * @param {Subsidiary | null} subsidiary_253
   */
  constructor(context_252, subsidiary_253) {
    super ();
    this.#context_250 = context_252;
    this.#subsidiary_251 = subsidiary_253;
    return;
  }
  /** @returns {CONTEXT_249} */
  get context() {
    return this.#context_250;
  }
  /** @returns {Subsidiary | null} */
  get subsidiary() {
    return this.#subsidiary_251;
  }
};
/** @template CONTEXT_256 */
export class AfterPropagate extends type__238() {
  /** @type {string} */
  #adjustedString_257;
  /** @type {globalThis.number} */
  #consumed_258;
  /** @type {AutoescState<CONTEXT_256>} */
  #stateAfter_259;
  /**
   * @param {Delegate} delegate_261
   * @param {Codec} codec_262
   * @returns {AfterPropagate<CONTEXT_256>}
   */
  push(delegate_261, codec_262) {
    return new AfterPropagate(this.#adjustedString_257, this.#consumed_258, new AutoescState(this.#stateAfter_259.context, new Subsidiary(delegate_261, codec_262)));
  }
  /** @returns {AfterPropagate<CONTEXT_256>} */
  pop() {
    return new AfterPropagate(this.#adjustedString_257, this.#consumed_258, new AutoescState(this.#stateAfter_259.context, null));
  }
  /**
   * @param {boolean} prepareForInterp_265
   * @returns {AfterPropagate<CONTEXT_256>}
   */
  feed(prepareForInterp_265) {
    let return_266;
    const subsidiary_267 = this.#stateAfter_259.subsidiary;
    if (!(subsidiary_267 == null)) {
      const subsidiary_268 = subsidiary_267;
      const adjustedFromDelegate_269 = feedSubsidiary_270(subsidiary_268, this.#adjustedString_257, prepareForInterp_265);
      return_266 = new AfterPropagate(adjustedFromDelegate_269, this.#consumed_258, this.#stateAfter_259);
    } else {
      return_266 = this;
    }
    return return_266;
  }
  /**
   * @template CONTEXT_256
   * @param {{
   *   adjustedString: string, consumed: globalThis.number, stateAfter: AutoescState<CONTEXT_256>
   * }}
   * props
   * @returns {AfterPropagate<CONTEXT_256>}
   */
  static["new"](props) {
    return new AfterPropagate(props.adjustedString, props.consumed, props.stateAfter);
  }
  /**
   * @param {string} adjustedString_271
   * @param {globalThis.number} consumed_272
   * @param {AutoescState<CONTEXT_256>} stateAfter_273
   */
  constructor(adjustedString_271, consumed_272, stateAfter_273) {
    super ();
    this.#adjustedString_257 = adjustedString_271;
    this.#consumed_258 = consumed_272;
    this.#stateAfter_259 = stateAfter_273;
    return;
  }
  /** @returns {string} */
  get adjustedString() {
    return this.#adjustedString_257;
  }
  /** @returns {globalThis.number} */
  get consumed() {
    return this.#consumed_258;
  }
  /** @returns {AutoescState<CONTEXT_256>} */
  get stateAfter() {
    return this.#stateAfter_259;
  }
};
/** @template CONTEXT_277 */
export class ContextPropagator extends type__238() {
  /**
   * @param {AutoescState<CONTEXT_277>} before_279
   * @param {string | null} literalPart_280
   * @returns {AfterPropagate<CONTEXT_277>}
   */
  after(before_279, literalPart_280) {
    null;
  }
};
export class Delegate extends type__238() {
  /**
   * @param {string | null} fixed_282
   * @returns {string}
   */
  process(fixed_282) {
    null;
  }
};
/** @template CONTEXT_283 */
export class ContextDelegate extends type__238(Delegate) {
  /** @returns {AutoescState<CONTEXT_283>} */
  get state() {
    null;
  }
  /** @param {AutoescState<CONTEXT_283>} x_286 */
  set state(x_286) {
    null;
  }
  /** @returns {ContextPropagator<CONTEXT_283>} */
  get contextPropagator() {
    null;
  }
  /**
   * @param {string | null} known_289
   * @returns {string}
   */
  process(known_289) {
    const after_290 = propagateOver(this.contextPropagator, this.state, known_289);
    let t_291 = after_290.stateAfter;
    this.state = t_291;
    return after_290.adjustedString;
  }
};
export class Escaper extends type__238() {
};
/**
 * @template CONTEXT_292
 * @template ESC_293
 */
export class EscaperPicker extends type__238() {
  /**
   * @param {AutoescState<CONTEXT_292>} before_295
   * @returns {ESC_293}
   */
  escaperFor(before_295) {
    null;
  }
};
/**
 * @template CONTEXT_296
 * @template ESC_297
 */
export class ContextualAutoescapingAccumulator extends type__238() {
  /** @returns {AutoescState<CONTEXT_296>} */
  get state() {
    null;
  }
  /** @param {AutoescState<CONTEXT_296>} newState_300 */
  set state(newState_300) {
    null;
  }
  /** @returns {EscaperPicker<CONTEXT_296, ESC_297>} */
  get escaperPicker() {
    null;
  }
  /** @returns {ContextPropagator<CONTEXT_296>} */
  get contextPropagator() {
    null;
  }
  /** @returns {ESC_297} */
  prepareForAppend() {
    const after_304 = propagateOver(this.contextPropagator, this.state, null);
    let t_305 = after_304.stateAfter;
    this.state = t_305;
    const adjusted_306 = after_304.adjustedString;
    if (! ! adjusted_306) {
      this.collectFixed(adjusted_306);
    }
    return this.escaperPicker.escaperFor(this.state);
  }
  /** @param {string} known_308 */
  appendSafe(known_308) {
    const after_309 = propagateOver(this.contextPropagator, this.state, known_308);
    let t_310 = after_309.stateAfter;
    this.state = t_310;
    const adjusted_311 = after_309.adjustedString;
    if (! ! adjusted_311) {
      this.collectFixed(adjusted_311);
    }
    return;
  }
  /** @param {string} fixedFragment_313 */
  collectFixed(fixedFragment_313) {
    null;
  }
};
export class Codec extends type__238() {
  /**
   * @param {string} s_315
   * @returns {string}
   */
  encode(s_315) {
    null;
  }
  /**
   * @param {string} s_317
   * @returns {string}
   */
  decode(s_317) {
    null;
  }
};
export class Subsidiary extends type__238() {
  /** @type {Delegate} */
  #delegate_318;
  /** @type {Codec} */
  #codec_319;
  /**
   * @param {{
   *   delegate: Delegate, codec: Codec
   * }}
   * props
   * @returns {Subsidiary}
   */
  static["new"](props) {
    return new Subsidiary(props.delegate, props.codec);
  }
  /**
   * @param {Delegate} delegate_320
   * @param {Codec} codec_321
   */
  constructor(delegate_320, codec_321) {
    super ();
    this.#delegate_318 = delegate_320;
    this.#codec_319 = codec_321;
    return;
  }
  /** @returns {Delegate} */
  get delegate() {
    return this.#delegate_318;
  }
  /** @returns {Codec} */
  get codec() {
    return this.#codec_319;
  }
};
/**
 * @param {Subsidiary} subsidiary_324
 * @param {string} adjustedStr_325
 * @param {boolean} prepareForInterp_326
 * @returns {string}
 */
function feedSubsidiary_270(subsidiary_324, adjustedStr_325, prepareForInterp_326) {
  let t_327;
  let str_328 = adjustedStr_325;
  const delegate_329 = subsidiary_324.delegate;
  const codec_330 = subsidiary_324.codec;
  let t_331 = codec_330.decode(str_328);
  str_328 = t_331;
  let t_332 = delegate_329.process(str_328);
  str_328 = t_332;
  if (prepareForInterp_326) {
    t_327 = delegate_329.process(null);
    str_328 = String(str_328) + t_327;
  }
  let t_333 = codec_330.encode(str_328);
  str_328 = t_333;
  return str_328;
}
/**
 * @template {Context} CONTEXT_349
 * @param {ContextPropagator<CONTEXT_349>} contextPropagator_334
 * @param {AutoescState<CONTEXT_349>} before_335
 * @param {string | null} known_336
 * @returns {AfterPropagate<CONTEXT_349>}
 */
export function propagateOver(contextPropagator_334, before_335, known_336) {
  let return_337;
  let t_338;
  let t_339;
  let t_340;
  let t_341;
  let t_342;
  let t_343;
  if (known_336 == null) {
    return_337 = contextPropagator_334.after(before_335, null);
  } else {
    const known_344 = known_336;
    let state_345 = before_335;
    let remainder_346 = known_344;
    const adjusted_347 = [""];
    while (true) {
      if (! ! ! remainder_346) {
        break;
      }
      const after_348 = contextPropagator_334.after(state_345, remainder_346);
      adjusted_347[0] += after_348.adjustedString;
      t_338 = after_348.stateAfter;
      state_345 = t_338;
      t_339 = after_348.consumed;
      t_340 = remainder_346.length;
      t_341 = remainder_346.substring(t_339, t_340);
      remainder_346 = t_341;
    }
    t_342 = adjusted_347[0];
    t_343 = known_344.length;
    return_337 = new AfterPropagate(t_342, t_343, state_345);
  }
  return return_337;
};
