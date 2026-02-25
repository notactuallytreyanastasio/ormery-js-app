import {
  strict as strict__11
} from "assert";
import {
  type as type__25, listBuilderAdd as listBuilderAdd_5, listBuilderToList as listBuilderToList_15, listedJoin as listedJoin_23, pairConstructor as pairConstructor_40, listedMap as listedMap_41, stringGet as stringGet_60, stringNext as stringNext_62, listedReduceFrom as listedReduceFrom_74, listedGet as listedGet_78
} from "@temperlang/core";
export class Test extends type__25() {
  /**
   * @param {boolean} success_1
   * @param {() => string} message_2
   */
  assert(success_1, message_2) {
    let t_3;
    if (! success_1) {
      this.#_passing_4 = false;
      t_3 = message_2();
      listBuilderAdd_5(this.#_messages_6, t_3);
    }
    return;
  }
  /**
   * @param {boolean} success_8
   * @param {() => string} message_9
   * @returns {void}
   */
  assertHard(success_8, message_9) {
    this.assert(success_8, message_9);
    if (! success_8) {
      this.#_failedOnAssert_10 = true;
      strict__11.fail(this.messagesCombined());
    }
    return;
  }
  /** @returns {void} */
  softFailToHard() {
    if (this.hasUnhandledFail) {
      this.#_failedOnAssert_10 = true;
      strict__11.fail(this.messagesCombined());
    }
    return;
  }
  /** @returns {boolean} */
  get passing() {
    return this.#_passing_4;
  }
  /** @returns {Array<string>} */
  messages() {
    return listBuilderToList_15(this.#_messages_6);
  }
  /** @returns {boolean} */
  get failedOnAssert() {
    return this.#_failedOnAssert_10;
  }
  /** @returns {boolean} */
  get hasUnhandledFail() {
    let t_18;
    if (this.#_failedOnAssert_10) {
      t_18 = true;
    } else {
      t_18 = this.#_passing_4;
    }
    return ! t_18;
  }
  /** @returns {string | null} */
  messagesCombined() {
    let return_20;
    if (! this.#_messages_6.length) {
      return_20 = null;
    } else {
      function fn_21(it_22) {
        return it_22;
      }
      return_20 = listedJoin_23(this.#_messages_6, ", ", fn_21);
    }
    return return_20;
  }
  /** @type {boolean} */
  #_failedOnAssert_10;
  /** @type {boolean} */
  #_passing_4;
  /** @type {Array<string>} */
  #_messages_6;
  constructor() {
    super ();
    this.#_failedOnAssert_10 = false;
    this.#_passing_4 = true;
    let t_24 = [];
    this.#_messages_6 = t_24;
    return;
  }
};
/**
 * @param {Array<Pair_42<string, (arg0: Test) => void>>} testCases_26
 * @returns {Array<Pair_42<string, Array<string>>>}
 */
export function processTestCases(testCases_26) {
  function fn_27(testCase_28) {
    let t_29;
    let t_30;
    let t_31;
    let t_32;
    const key_33 = testCase_28.key;
    const fun_34 = testCase_28.value;
    const test_35 = new Test();
    let hadBubble_36 = false;
    try {
      fun_34(test_35);
    } catch {
      hadBubble_36 = true;
    }
    const messages_37 = test_35.messages();
    let failures_38;
    if (test_35.passing) {
      t_31 = ! hadBubble_36;
    } else {
      t_31 = false;
    }
    if (t_31) {
      failures_38 = Object.freeze([]);
    } else {
      if (hadBubble_36) {
        t_29 = test_35.failedOnAssert;
        t_32 = ! t_29;
      } else {
        t_32 = false;
      }
      if (t_32) {
        const allMessages_39 = messages_37.slice();
        listBuilderAdd_5(allMessages_39, "Bubble");
        t_30 = listBuilderToList_15(allMessages_39);
        failures_38 = t_30;
      } else {
        failures_38 = messages_37;
      }
    }
    return pairConstructor_40(key_33, failures_38);
  }
  return listedMap_41(testCases_26, fn_27);
};
/**
 * @param {string} s_44
 * @returns {string}
 */
function escapeXml_43(s_44) {
  let return_45;
  let t_46;
  let t_47;
  let t_48;
  let t_49;
  let t_50;
  let t_51;
  let t_52;
  let t_53;
  const sb_54 = [""];
  const end_55 = s_44.length;
  let emitted_56 = 0;
  let i_57 = 0;
  while (i_57 < end_55) {
    continue_58: {
      const c_59 = stringGet_60(s_44, i_57);
      if (c_59 === 38) {
        t_53 = "&amp;";
      } else if (c_59 === 60) {
        t_53 = "&lt;";
      } else if (c_59 === 62) {
        t_53 = "&gt;";
      } else if (c_59 === 39) {
        t_53 = "&#39;";
      } else if (c_59 === 34) {
        t_53 = "&#34;";
      } else {
        if (c_59 === 10) {
          t_49 = true;
        } else {
          if (c_59 === 13) {
            t_48 = true;
          } else {
            t_48 = c_59 === 9;
          }
          t_49 = t_48;
        }
        if (t_49) {
          break continue_58;
        } else {
          if (c_59 < 32) {
            t_51 = true;
          } else {
            if (c_59 === 65534) {
              t_50 = true;
            } else {
              t_50 = c_59 === 65535;
            }
            t_51 = t_50;
          }
          if (t_51) {
            t_52 = "[0x" + c_59.toString(16) + "]";
          } else {
            break continue_58;
          }
          t_53 = t_52;
        }
      }
      const esc_61 = t_53;
      sb_54[0] += s_44.substring(emitted_56, i_57);
      sb_54[0] += esc_61;
      t_46 = stringNext_62(s_44, i_57);
      emitted_56 = t_46;
    }
    t_47 = stringNext_62(s_44, i_57);
    i_57 = t_47;
  }
  if (emitted_56 === 0) {
    return_45 = s_44;
  } else {
    sb_54[0] += s_44.substring(emitted_56, end_55);
    return_45 = sb_54[0];
  }
  return return_45;
}
/**
 * @param {Array<Pair_42<string, Array<string>>>} testResults_63
 * @param {(arg0: string) => void} writeLine_64
 */
export function reportTestResults(testResults_63, writeLine_64) {
  let t_65;
  let t_66;
  let t_67;
  writeLine_64("<testsuites>");
  const total_68 = testResults_63.length.toString();
  function fn_69(fails_70, testResult_71) {
    let t_72;
    if (! testResult_71.value.length) {
      t_72 = 0;
    } else {
      t_72 = 1;
    }
    return fails_70 + t_72 | 0;
  }
  const fails_73 = listedReduceFrom_74(testResults_63, 0, fn_69).toString();
  const totals_75 = "tests='" + total_68 + "' failures='" + fails_73 + "'";
  writeLine_64("  <testsuite name='suite' " + totals_75 + " time='0.0'>");
  let i_76 = 0;
  while (true) {
    t_65 = testResults_63.length;
    if (!(i_76 < t_65)) {
      break;
    }
    const testResult_77 = listedGet_78(testResults_63, i_76);
    const failureMessages_79 = testResult_77.value;
    t_66 = testResult_77.key;
    const name_80 = escapeXml_43(t_66);
    const basics_81 = "name='" + name_80 + "' classname='" + name_80 + "' time='0.0'";
    if (! failureMessages_79.length) {
      writeLine_64("    <testcase " + basics_81 + " />");
    } else {
      writeLine_64("    <testcase " + basics_81 + ">");
      function fn_82(it_83) {
        return it_83;
      }
      t_67 = listedJoin_23(failureMessages_79, ", ", fn_82);
      const message_84 = escapeXml_43(t_67);
      writeLine_64("      <failure message='" + message_84 + "' />");
      writeLine_64("    <\/testcase>");
    }
    i_76 = i_76 + 1 | 0;
  }
  writeLine_64("  <\/testsuite>");
  writeLine_64("<\/testsuites>");
  return;
};
/**
 * @param {Array<Pair_42<string, (arg0: Test) => void>>} testCases_85
 * @returns {string}
 */
export function runTestCases(testCases_85) {
  const report_86 = [""];
  let t_87 = processTestCases(testCases_85);
  function fn_88(line_89) {
    report_86[0] += line_89;
    report_86[0] += "\n";
    return;
  }
  reportTestResults(t_87, fn_88);
  return report_86[0];
};
/**
 * @param {(arg0: Test) => void} testFun_90
 * @returns {void}
 */
export function runTest(testFun_90) {
  const test_91 = new Test();
  try {
    testFun_90(test_91);
  } catch {
    function fn_92() {
      return "bubble during test running";
    }
    test_91.assert(false, fn_92);
  }
  test_91.softFailToHard();
  return;
};
