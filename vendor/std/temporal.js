import {
  JsonProducer as JsonProducer_728, JsonSyntaxTree as JsonSyntaxTree_733, InterchangeContext as InterchangeContext_734, JsonAdapter as JsonAdapter_735, JsonString as JsonString_743
} from "./json.js";
import {
  type as type__736, requireInstanceOf as requireInstanceOf__744, modIntInt as modIntInt_751, stringGet as stringGet_762, stringNext as stringNext_763, stringCountBetween as stringCountBetween_765
} from "@temperlang/core";
class DateJsonAdapter_723 extends type__736(JsonAdapter_735) {
  /**
   * @param {globalThis.Date} x_725
   * @param {JsonProducer_728} p_726
   */
  encodeToJson(x_725, p_726) {
    encodeToJson_727(x_725, p_726);
    return;
  }
  /**
   * @param {JsonSyntaxTree_733} t_730
   * @param {InterchangeContext_734} ic_731
   * @returns {globalThis.Date}
   */
  decodeFromJson(t_730, ic_731) {
    return decodeFromJson_732(t_730, ic_731);
  }
  constructor() {
    super ();
    return;
  }
}
// Type `std/temporal/`.Date connected to globalThis.Date
/**
 * @param {globalThis.Date} this_737
 * @param {JsonProducer_728} p_738
 */
function encodeToJson_727(this_737, p_738) {
  let t_739 = this_737.toISOString().split("T")[0];
  p_738.stringValue(t_739);
  return;
}
/**
 * @param {JsonSyntaxTree_733} t_740
 * @param {InterchangeContext_734} ic_741
 * @returns {globalThis.Date}
 */
function decodeFromJson_732(t_740, ic_741) {
  let t_742;
  t_742 = requireInstanceOf__744(t_740, JsonString_743);
  return new (globalThis.Date)(globalThis.Date.parse(t_742.content));
}
/** @returns {JsonAdapter_735<globalThis.Date>} */
function jsonAdapter_745() {
  return new DateJsonAdapter_723();
}
/** @type {Array<number>} */
const daysInMonth_746 = Object.freeze([0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
/**
 * @param {number} year_748
 * @returns {boolean}
 */
function isLeapYear_747(year_748) {
  let return_749;
  let t_750;
  if (modIntInt_751(year_748, 4) === 0) {
    if (modIntInt_751(year_748, 100) !== 0) {
      return_749 = true;
    } else {
      t_750 = modIntInt_751(year_748, 400);
      return_749 = t_750 === 0;
    }
  } else {
    return_749 = false;
  }
  return return_749;
}
/**
 * @param {number} minWidth_753
 * @param {number} num_754
 * @param {globalThis.Array<string>} sb_755
 */
function padTo_752(minWidth_753, num_754, sb_755) {
  let t_756;
  let t_757;
  let t_758;
  const decimal_759 = num_754.toString(10);
  let decimalIndex_760 = 0;
  const decimalEnd_761 = decimal_759.length;
  if (decimalIndex_760 < decimalEnd_761) {
    t_756 = stringGet_762(decimal_759, decimalIndex_760);
    t_758 = t_756 === 45;
  } else {
    t_758 = false;
  }
  if (t_758) {
    sb_755[0] += "-";
    t_757 = stringNext_763(decimal_759, decimalIndex_760);
    decimalIndex_760 = t_757;
  }
  let t_764 = stringCountBetween_765(decimal_759, decimalIndex_760, decimalEnd_761);
  let nNeeded_766 = minWidth_753 - t_764 | 0;
  while (nNeeded_766 > 0) {
    sb_755[0] += "0";
    nNeeded_766 = nNeeded_766 - 1 | 0;
  }
  sb_755[0] += decimal_759.substring(decimalIndex_760, decimalEnd_761);
  return;
}
/** @type {Array<number>} */
const dayOfWeekLookupTableLeapy_767 = Object.freeze([0, 0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]);
/** @type {Array<number>} */
const dayOfWeekLookupTableNotLeapy_768 = Object.freeze([0, 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]);
