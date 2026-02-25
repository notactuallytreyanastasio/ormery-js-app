import {
  type as type__779, requireInstanceOf as requireInstanceOf__903, pairConstructor as pairConstructor_857, mapConstructor as mapConstructor_856, regexCompileFormatted as regexCompileFormatted_869, regexCompiledFound as regexCompiledFound_873, regexCompiledFind as regexCompiledFind_878, regexCompiledReplace as regexCompiledReplace_883, regexCompiledSplit as regexCompiledSplit_886, listedGet as listedGet_938, stringFromCodePoint as stringFromCodePoint_940, regexFormatterPushCodeTo as regexFormatterPushCodeTo_941, stringGet as stringGet_949, stringNext as stringNext_950, regexFormatterAdjustCodeSet as regexFormatterAdjustCodeSet_964, listBuilderAdd as listBuilderAdd_1080, listBuilderToList as listBuilderToList_1081
} from "@temperlang/core";
export class RegexNode extends type__779() {
  /** @returns {Regex} */
  compiled() {
    return new Regex(this);
  }
  /**
   * @param {string} text_771
   * @returns {boolean}
   */
  found(text_771) {
    return this.compiled().found(text_771);
  }
  /**
   * @param {string} text_773
   * @returns {Match}
   */
  find(text_773) {
    return this.compiled().find(text_773);
  }
  /**
   * @param {string} text_775
   * @param {(arg0: Match) => string} format_776
   * @returns {string}
   */
  replace(text_775, format_776) {
    return this.compiled().replace(text_775, format_776);
  }
  /**
   * @param {string} text_778
   * @returns {Array<string>}
   */
  split(text_778) {
    return this.compiled().split(text_778);
  }
};
export class Capture extends type__779(RegexNode) {
  /** @type {string} */
  #name_780;
  /** @type {RegexNode} */
  #item_781;
  /**
   * @param {{
   *   name: string, item: RegexNode
   * }}
   * props
   * @returns {Capture}
   */
  static["new"](props) {
    return new Capture(props.name, props.item);
  }
  /**
   * @param {string} name_782
   * @param {RegexNode} item_783
   */
  constructor(name_782, item_783) {
    super ();
    this.#name_780 = name_782;
    this.#item_781 = item_783;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_780;
  }
  /** @returns {RegexNode} */
  get item() {
    return this.#item_781;
  }
};
export class CodePart extends type__779(RegexNode) {
};
export class CodePoints extends type__779(CodePart) {
  /** @type {string} */
  #value_786;
  /** @param {string} value_787 */
  constructor(value_787) {
    super ();
    this.#value_786 = value_787;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_786;
  }
};
export class Special extends type__779(RegexNode) {
};
export class SpecialSet extends type__779(CodePart, Special) {
};
export class CodeRange extends type__779(CodePart) {
  /** @type {number} */
  #min_789;
  /** @type {number} */
  #max_790;
  /**
   * @param {{
   *   min: number, max: number
   * }}
   * props
   * @returns {CodeRange}
   */
  static["new"](props) {
    return new CodeRange(props.min, props.max);
  }
  /**
   * @param {number} min_791
   * @param {number} max_792
   */
  constructor(min_791, max_792) {
    super ();
    this.#min_789 = min_791;
    this.#max_790 = max_792;
    return;
  }
  /** @returns {number} */
  get min() {
    return this.#min_789;
  }
  /** @returns {number} */
  get max() {
    return this.#max_790;
  }
};
export class CodeSet extends type__779(RegexNode) {
  /** @type {Array<CodePart>} */
  #items_795;
  /** @type {boolean} */
  #negated_796;
  /**
   * @param {{
   *   items: Array<CodePart>, negated ?: boolean | null
   * }}
   * props
   * @returns {CodeSet}
   */
  static["new"](props) {
    return new CodeSet(props.items, props.negated);
  }
  /**
   * @param {Array<CodePart>} items_797
   * @param {boolean | null} [negated_798]
   */
  constructor(items_797, negated_798) {
    super ();
    let negated_799;
    if (negated_798 == null) {
      negated_799 = false;
    } else {
      negated_799 = negated_798;
    }
    this.#items_795 = items_797;
    this.#negated_796 = negated_799;
    return;
  }
  /** @returns {Array<CodePart>} */
  get items() {
    return this.#items_795;
  }
  /** @returns {boolean} */
  get negated() {
    return this.#negated_796;
  }
};
export class Or extends type__779(RegexNode) {
  /** @type {Array<RegexNode>} */
  #items_802;
  /** @param {Array<RegexNode>} items_803 */
  constructor(items_803) {
    super ();
    this.#items_802 = items_803;
    return;
  }
  /** @returns {Array<RegexNode>} */
  get items() {
    return this.#items_802;
  }
};
export class Repeat extends type__779(RegexNode) {
  /** @type {RegexNode} */
  #item_805;
  /** @type {number} */
  #min_806;
  /** @type {number | null} */
  #max_807;
  /** @type {boolean} */
  #reluctant_808;
  /**
   * @param {{
   *   item: RegexNode, min: number, max: number | null, reluctant ?: boolean | null
   * }}
   * props
   * @returns {Repeat}
   */
  static["new"](props) {
    return new Repeat(props.item, props.min, props.max, props.reluctant);
  }
  /**
   * @param {RegexNode} item_809
   * @param {number} min_810
   * @param {number | null} max_811
   * @param {boolean | null} [reluctant_812]
   */
  constructor(item_809, min_810, max_811, reluctant_812) {
    super ();
    let reluctant_813;
    if (reluctant_812 == null) {
      reluctant_813 = false;
    } else {
      reluctant_813 = reluctant_812;
    }
    this.#item_805 = item_809;
    this.#min_806 = min_810;
    this.#max_807 = max_811;
    this.#reluctant_808 = reluctant_813;
    return;
  }
  /** @returns {RegexNode} */
  get item() {
    return this.#item_805;
  }
  /** @returns {number} */
  get min() {
    return this.#min_806;
  }
  /** @returns {number | null} */
  get max() {
    return this.#max_807;
  }
  /** @returns {boolean} */
  get reluctant() {
    return this.#reluctant_808;
  }
};
export class Sequence extends type__779(RegexNode) {
  /** @type {Array<RegexNode>} */
  #items_818;
  /** @param {Array<RegexNode>} items_819 */
  constructor(items_819) {
    super ();
    this.#items_818 = items_819;
    return;
  }
  /** @returns {Array<RegexNode>} */
  get items() {
    return this.#items_818;
  }
};
export class Match extends type__779() {
  /** @type {Group} */
  #full_821;
  /** @type {Map<string, Group>} */
  #groups_822;
  /**
   * @param {{
   *   full: Group, groups: Map<string, Group>
   * }}
   * props
   * @returns {Match}
   */
  static["new"](props) {
    return new Match(props.full, props.groups);
  }
  /**
   * @param {Group} full_823
   * @param {Map<string, Group>} groups_824
   */
  constructor(full_823, groups_824) {
    super ();
    this.#full_821 = full_823;
    this.#groups_822 = groups_824;
    return;
  }
  /** @returns {Group} */
  get full() {
    return this.#full_821;
  }
  /** @returns {Map<string, Group>} */
  get groups() {
    return this.#groups_822;
  }
};
export class Group extends type__779() {
  /** @type {string} */
  #name_827;
  /** @type {string} */
  #value_828;
  /** @type {globalThis.number} */
  #begin_829;
  /** @type {globalThis.number} */
  #end_830;
  /**
   * @param {{
   *   name: string, value: string, begin: globalThis.number, end: globalThis.number
   * }}
   * props
   * @returns {Group}
   */
  static["new"](props) {
    return new Group(props.name, props.value, props.begin, props.end);
  }
  /**
   * @param {string} name_831
   * @param {string} value_832
   * @param {globalThis.number} begin_833
   * @param {globalThis.number} end_834
   */
  constructor(name_831, value_832, begin_833, end_834) {
    super ();
    this.#name_827 = name_831;
    this.#value_828 = value_832;
    this.#begin_829 = begin_833;
    this.#end_830 = end_834;
    return;
  }
  /** @returns {string} */
  get name() {
    return this.#name_827;
  }
  /** @returns {string} */
  get value() {
    return this.#value_828;
  }
  /** @returns {globalThis.number} */
  get begin() {
    return this.#begin_829;
  }
  /** @returns {globalThis.number} */
  get end() {
    return this.#end_830;
  }
};
class RegexRefs_839 extends type__779() {
  /** @type {CodePoints} */
  #codePoints_840;
  /** @type {Group} */
  #group_841;
  /** @type {Match} */
  #match_842;
  /** @type {Or} */
  #orObject_843;
  /**
   * @param {{
   *   codePoints ?: CodePoints | null, group ?: Group | null, match ?: Match | null, orObject ?: Or | null
   * }}
   * props
   * @returns {RegexRefs_839}
   */
  static["new"](props) {
    return new RegexRefs_839(props.codePoints, props.group, props.match, props.orObject);
  }
  /**
   * @param {CodePoints | null} [codePoints_844]
   * @param {Group | null} [group_845]
   * @param {Match | null} [match_846]
   * @param {Or | null} [orObject_847]
   */
  constructor(codePoints_844, group_845, match_846, orObject_847) {
    super ();
    let t_848;
    let t_849;
    let t_850;
    let t_851;
    let t_852;
    let codePoints_853;
    if (codePoints_844 == null) {
      t_848 = new CodePoints("");
      codePoints_853 = t_848;
    } else {
      codePoints_853 = codePoints_844;
    }
    let group_854;
    if (group_845 == null) {
      t_849 = new Group("", "", 0, 0);
      group_854 = t_849;
    } else {
      group_854 = group_845;
    }
    let match_855;
    if (match_846 == null) {
      t_850 = mapConstructor_856(Object.freeze([pairConstructor_857("", group_854)]));
      t_851 = new Match(group_854, t_850);
      match_855 = t_851;
    } else {
      match_855 = match_846;
    }
    let orObject_858;
    if (orObject_847 == null) {
      t_852 = new Or(Object.freeze([]));
      orObject_858 = t_852;
    } else {
      orObject_858 = orObject_847;
    }
    this.#codePoints_840 = codePoints_853;
    this.#group_841 = group_854;
    this.#match_842 = match_855;
    this.#orObject_843 = orObject_858;
    return;
  }
  /** @returns {CodePoints} */
  get codePoints() {
    return this.#codePoints_840;
  }
  /** @returns {Group} */
  get group() {
    return this.#group_841;
  }
  /** @returns {Match} */
  get match() {
    return this.#match_842;
  }
  /** @returns {Or} */
  get orObject() {
    return this.#orObject_843;
  }
}
export class Regex extends type__779() {
  /** @type {RegexNode} */
  #data_863;
  /** @param {RegexNode} data_864 */
  constructor(data_864) {
    super ();
    const t_865 = data_864;
    this.#data_863 = t_865;
    const formatted_866 = RegexFormatter_867.regexFormat(data_864);
    let t_868 = regexCompileFormatted_869(data_864, formatted_866);
    this.#compiled_870 = t_868;
    return;
  }
  /**
   * @param {string} text_872
   * @returns {boolean}
   */
  found(text_872) {
    return regexCompiledFound_873(this, this.#compiled_870, text_872);
  }
  /**
   * @param {string} text_875
   * @param {globalThis.number | null} [begin_876]
   * @returns {Match}
   */
  find(text_875, begin_876) {
    let begin_877;
    if (begin_876 == null) {
      begin_877 = 0;
    } else {
      begin_877 = begin_876;
    }
    return regexCompiledFind_878(this, this.#compiled_870, text_875, begin_877, regexRefs_879);
  }
  /**
   * @param {string} text_881
   * @param {(arg0: Match) => string} format_882
   * @returns {string}
   */
  replace(text_881, format_882) {
    return regexCompiledReplace_883(this, this.#compiled_870, text_881, format_882, regexRefs_879);
  }
  /**
   * @param {string} text_885
   * @returns {Array<string>}
   */
  split(text_885) {
    return regexCompiledSplit_886(this, this.#compiled_870, text_885, regexRefs_879);
  }
  /** @type {unknown} */
  #compiled_870;
  /** @returns {RegexNode} */
  get data() {
    return this.#data_863;
  }
};
class RegexFormatter_867 extends type__779() {
  /** @type {globalThis.Array<string>} */
  #out_888;
  /**
   * @param {RegexNode} data_890
   * @returns {string}
   */
  static regexFormat(data_890) {
    return new RegexFormatter_867().format(data_890);
  }
  /**
   * @param {RegexNode} regex_892
   * @returns {string}
   */
  format(regex_892) {
    this.#pushRegex_893(regex_892);
    return this.#out_888[0];
  }
  /** @param {RegexNode} regex_895 */
  #pushRegex_893(regex_895) {
    let t_896;
    let t_897;
    let t_898;
    let t_899;
    let t_900;
    let t_901;
    let t_902;
    if (regex_895 instanceof Capture) {
      t_896 = requireInstanceOf__903(regex_895, Capture);
      this.#pushCapture_904(t_896);
    } else if (regex_895 instanceof CodePoints) {
      t_897 = requireInstanceOf__903(regex_895, CodePoints);
      this.#pushCodePoints_905(t_897, false);
    } else if (regex_895 instanceof CodeRange) {
      t_898 = requireInstanceOf__903(regex_895, CodeRange);
      this.#pushCodeRange_906(t_898);
    } else if (regex_895 instanceof CodeSet) {
      t_899 = requireInstanceOf__903(regex_895, CodeSet);
      this.#pushCodeSet_907(t_899);
    } else if (regex_895 instanceof Or) {
      t_900 = requireInstanceOf__903(regex_895, Or);
      this.#pushOr_908(t_900);
    } else if (regex_895 instanceof Repeat) {
      t_901 = requireInstanceOf__903(regex_895, Repeat);
      this.#pushRepeat_909(t_901);
    } else if (regex_895 instanceof Sequence) {
      t_902 = requireInstanceOf__903(regex_895, Sequence);
      this.#pushSequence_910(t_902);
    } else if (Object.is(regex_895, Begin)) {
      this.#out_888[0] += "^";
    } else if (Object.is(regex_895, Dot)) {
      this.#out_888[0] += ".";
    } else if (Object.is(regex_895, End)) {
      this.#out_888[0] += "$";
    } else if (Object.is(regex_895, WordBoundary)) {
      this.#out_888[0] += "\\b";
    } else if (Object.is(regex_895, Digit)) {
      this.#out_888[0] += "\\d";
    } else if (Object.is(regex_895, Space)) {
      this.#out_888[0] += "\\s";
    } else if (Object.is(regex_895, Word)) {
      this.#out_888[0] += "\\w";
    }
    return;
  }
  /** @param {Capture} capture_912 */
  #pushCapture_904(capture_912) {
    this.#out_888[0] += "(";
    let t_913 = this.#out_888;
    let t_914 = capture_912.name;
    this.#pushCaptureName_915(t_913, t_914);
    let t_916 = capture_912.item;
    this.#pushRegex_893(t_916);
    this.#out_888[0] += ")";
    return;
  }
  /**
   * @param {globalThis.Array<string>} out_918
   * @param {string} name_919
   */
  #pushCaptureName_915(out_918, name_919) {
    out_918[0] += "?<" + name_919 + ">";
    return;
  }
  /**
   * @param {number} code_922
   * @param {boolean} insideCodeSet_923
   */
  #pushCode_921(code_922, insideCodeSet_923) {
    let return_924;
    let t_925;
    let t_926;
    let t_927;
    let t_928;
    let t_929;
    let t_930;
    let t_931;
    let t_932;
    let t_933;
    fn_934: {
      try {
        let specialEscape_935;
        if (code_922 === Codes_936.carriageReturn) {
          specialEscape_935 = "r";
        } else if (code_922 === Codes_936.newline) {
          specialEscape_935 = "n";
        } else if (code_922 === Codes_936.tab) {
          specialEscape_935 = "t";
        } else {
          specialEscape_935 = "";
        }
        if (specialEscape_935 !== "") {
          this.#out_888[0] += "\\";
          this.#out_888[0] += specialEscape_935;
          return_924 = void 0;
          break fn_934;
        }
        if (code_922 <= 127) {
          const escapeNeed_937 = listedGet_938(escapeNeeds_939, code_922);
          if (Object.is(escapeNeed_937, 2)) {
            t_926 = true;
          } else {
            if (insideCodeSet_923) {
              t_925 = code_922 === Codes_936.dash;
            } else {
              t_925 = false;
            }
            t_926 = t_925;
          }
          if (t_926) {
            this.#out_888[0] += "\\";
            t_927 = stringFromCodePoint_940(code_922);
            this.#out_888[0] += t_927;
            return_924 = void 0;
            break fn_934;
          } else if (Object.is(escapeNeed_937, 0)) {
            t_928 = stringFromCodePoint_940(code_922);
            this.#out_888[0] += t_928;
            return_924 = void 0;
            break fn_934;
          }
        }
        if (code_922 >= Codes_936.supplementalMin) {
          t_932 = true;
        } else {
          if (code_922 > Codes_936.highControlMax) {
            if (Codes_936.surrogateMin <= code_922) {
              t_929 = code_922 <= Codes_936.surrogateMax;
            } else {
              t_929 = false;
            }
            if (t_929) {
              t_930 = true;
            } else {
              t_930 = code_922 === Codes_936.uint16Max;
            }
            t_931 = ! t_930;
          } else {
            t_931 = false;
          }
          t_932 = t_931;
        }
        if (t_932) {
          t_933 = stringFromCodePoint_940(code_922);
          this.#out_888[0] += t_933;
        } else {
          regexFormatterPushCodeTo_941(this, this.#out_888, code_922, insideCodeSet_923);
        }
      } catch {
        throw Error();
      }
      return_924 = void 0;
    }
    return return_924;
  }
  /**
   * @param {CodePoints} codePoints_943
   * @param {boolean} insideCodeSet_944
   */
  #pushCodePoints_905(codePoints_943, insideCodeSet_944) {
    let t_945;
    let t_946;
    const value_947 = codePoints_943.value;
    let index_948 = 0;
    while (true) {
      if (!(value_947.length > index_948)) {
        break;
      }
      t_945 = stringGet_949(value_947, index_948);
      this.#pushCode_921(t_945, insideCodeSet_944);
      t_946 = stringNext_950(value_947, index_948);
      index_948 = t_946;
    }
    return;
  }
  /** @param {CodeRange} codeRange_952 */
  #pushCodeRange_906(codeRange_952) {
    this.#out_888[0] += "[";
    this.#pushCodeRangeUnwrapped_953(codeRange_952);
    this.#out_888[0] += "]";
    return;
  }
  /** @param {CodeRange} codeRange_955 */
  #pushCodeRangeUnwrapped_953(codeRange_955) {
    let t_956 = codeRange_955.min;
    this.#pushCode_921(t_956, true);
    this.#out_888[0] += "-";
    let t_957 = codeRange_955.max;
    this.#pushCode_921(t_957, true);
    return;
  }
  /** @param {CodeSet} codeSet_959 */
  #pushCodeSet_907(codeSet_959) {
    let t_960;
    let t_961;
    let t_962;
    const adjusted_963 = regexFormatterAdjustCodeSet_964(this, codeSet_959, regexRefs_879);
    if (adjusted_963 instanceof CodeSet) {
      t_962 = requireInstanceOf__903(adjusted_963, CodeSet);
      if (! t_962.items.length) {
        if (t_962.negated) {
          this.#out_888[0] += "[\\s\\S]";
        } else {
          this.#out_888[0] += "(?:$.)";
        }
      } else {
        this.#out_888[0] += "[";
        if (t_962.negated) {
          this.#out_888[0] += "^";
        }
        let i_965 = 0;
        while (true) {
          t_960 = t_962.items.length;
          if (!(i_965 < t_960)) {
            break;
          }
          t_961 = listedGet_938(t_962.items, i_965);
          this.#pushCodeSetItem_966(t_961);
          i_965 = i_965 + 1 | 0;
        }
        this.#out_888[0] += "]";
      }
    } else {
      this.#pushRegex_893(adjusted_963);
    }
    return;
  }
  /** @param {CodePart} codePart_968 */
  #pushCodeSetItem_966(codePart_968) {
    let t_969;
    let t_970;
    let t_971;
    if (codePart_968 instanceof CodePoints) {
      t_969 = requireInstanceOf__903(codePart_968, CodePoints);
      this.#pushCodePoints_905(t_969, true);
    } else if (codePart_968 instanceof CodeRange) {
      t_970 = requireInstanceOf__903(codePart_968, CodeRange);
      this.#pushCodeRangeUnwrapped_953(t_970);
    } else if (codePart_968 instanceof SpecialSet) {
      t_971 = requireInstanceOf__903(codePart_968, SpecialSet);
      this.#pushRegex_893(t_971);
    }
    return;
  }
  /** @param {Or} or_973 */
  #pushOr_908(or_973) {
    let t_974;
    let t_975;
    let t_976;
    if (! ! or_973.items.length) {
      this.#out_888[0] += "(?:";
      t_974 = listedGet_938(or_973.items, 0);
      this.#pushRegex_893(t_974);
      let i_977 = 1;
      while (true) {
        t_975 = or_973.items.length;
        if (!(i_977 < t_975)) {
          break;
        }
        this.#out_888[0] += "|";
        t_976 = listedGet_938(or_973.items, i_977);
        this.#pushRegex_893(t_976);
        i_977 = i_977 + 1 | 0;
      }
      this.#out_888[0] += ")";
    }
    return;
  }
  /** @param {Repeat} repeat_979 */
  #pushRepeat_909(repeat_979) {
    let t_980;
    let t_981;
    let t_982;
    let t_983;
    let t_984;
    this.#out_888[0] += "(?:";
    let t_985 = repeat_979.item;
    this.#pushRegex_893(t_985);
    this.#out_888[0] += ")";
    const min_986 = repeat_979.min;
    const max_987 = repeat_979.max;
    if (min_986 === 0) {
      t_982 = max_987 === 1;
    } else {
      t_982 = false;
    }
    if (t_982) {
      this.#out_888[0] += "?";
    } else {
      if (min_986 === 0) {
        t_983 = max_987 == null;
      } else {
        t_983 = false;
      }
      if (t_983) {
        this.#out_888[0] += "*";
      } else {
        if (min_986 === 1) {
          t_984 = max_987 == null;
        } else {
          t_984 = false;
        }
        if (t_984) {
          this.#out_888[0] += "+";
        } else {
          t_980 = min_986.toString();
          this.#out_888[0] += "{" + t_980;
          if (min_986 !== max_987) {
            this.#out_888[0] += ",";
            if (!(max_987 == null)) {
              t_981 = max_987.toString();
              this.#out_888[0] += t_981;
            }
          }
          this.#out_888[0] += "}";
        }
      }
    }
    if (repeat_979.reluctant) {
      this.#out_888[0] += "?";
    }
    return;
  }
  /** @param {Sequence} sequence_989 */
  #pushSequence_910(sequence_989) {
    let t_990;
    let t_991;
    let i_992 = 0;
    while (true) {
      t_990 = sequence_989.items.length;
      if (!(i_992 < t_990)) {
        break;
      }
      t_991 = listedGet_938(sequence_989.items, i_992);
      this.#pushRegex_893(t_991);
      i_992 = i_992 + 1 | 0;
    }
    return;
  }
  /**
   * @param {CodePart} codePart_994
   * @returns {number | null}
   */
  maxCode(codePart_994) {
    let return_995;
    let t_996;
    let t_997;
    if (codePart_994 instanceof CodePoints) {
      t_997 = requireInstanceOf__903(codePart_994, CodePoints);
      const value_998 = t_997.value;
      if (! value_998) {
        return_995 = null;
      } else {
        let max_999 = 0;
        let index_1000 = 0;
        while (true) {
          if (!(value_998.length > index_1000)) {
            break;
          }
          const next_1001 = stringGet_949(value_998, index_1000);
          if (next_1001 > max_999) {
            max_999 = next_1001;
          }
          t_996 = stringNext_950(value_998, index_1000);
          index_1000 = t_996;
        }
        return_995 = max_999;
      }
    } else if (codePart_994 instanceof CodeRange) {
      return_995 = requireInstanceOf__903(codePart_994, CodeRange).max;
    } else if (Object.is(codePart_994, Digit)) {
      return_995 = Codes_936.digit9;
    } else if (Object.is(codePart_994, Space)) {
      return_995 = Codes_936.space;
    } else if (Object.is(codePart_994, Word)) {
      return_995 = Codes_936.lowerZ;
    } else {
      return_995 = null;
    }
    return return_995;
  }
  constructor() {
    super ();
    let t_1002 = [""];
    this.#out_888 = t_1002;
    return;
  }
}
class Codes_936 extends type__779() {
  /** @type {number} */
  static #ampersand_1003 = 38;
  /** @returns {number} */
  static get ampersand() {
    return this.#ampersand_1003;
  }
  /** @type {number} */
  static #backslash_1004 = 92;
  /** @returns {number} */
  static get backslash() {
    return this.#backslash_1004;
  }
  /** @type {number} */
  static #caret_1005 = 94;
  /** @returns {number} */
  static get caret() {
    return this.#caret_1005;
  }
  /** @type {number} */
  static #carriageReturn_1006 = 13;
  /** @returns {number} */
  static get carriageReturn() {
    return this.#carriageReturn_1006;
  }
  /** @type {number} */
  static #curlyLeft_1007 = 123;
  /** @returns {number} */
  static get curlyLeft() {
    return this.#curlyLeft_1007;
  }
  /** @type {number} */
  static #curlyRight_1008 = 125;
  /** @returns {number} */
  static get curlyRight() {
    return this.#curlyRight_1008;
  }
  /** @type {number} */
  static #dash_1009 = 45;
  /** @returns {number} */
  static get dash() {
    return this.#dash_1009;
  }
  /** @type {number} */
  static #dot_1010 = 46;
  /** @returns {number} */
  static get dot() {
    return this.#dot_1010;
  }
  /** @type {number} */
  static #highControlMin_1011 = 127;
  /** @returns {number} */
  static get highControlMin() {
    return this.#highControlMin_1011;
  }
  /** @type {number} */
  static #highControlMax_1012 = 159;
  /** @returns {number} */
  static get highControlMax() {
    return this.#highControlMax_1012;
  }
  /** @type {number} */
  static #digit0_1013 = 48;
  /** @returns {number} */
  static get digit0() {
    return this.#digit0_1013;
  }
  /** @type {number} */
  static #digit9_1014 = 57;
  /** @returns {number} */
  static get digit9() {
    return this.#digit9_1014;
  }
  /** @type {number} */
  static #lowerA_1015 = 97;
  /** @returns {number} */
  static get lowerA() {
    return this.#lowerA_1015;
  }
  /** @type {number} */
  static #lowerZ_1016 = 122;
  /** @returns {number} */
  static get lowerZ() {
    return this.#lowerZ_1016;
  }
  /** @type {number} */
  static #newline_1017 = 10;
  /** @returns {number} */
  static get newline() {
    return this.#newline_1017;
  }
  /** @type {number} */
  static #peso_1018 = 36;
  /** @returns {number} */
  static get peso() {
    return this.#peso_1018;
  }
  /** @type {number} */
  static #pipe_1019 = 124;
  /** @returns {number} */
  static get pipe() {
    return this.#pipe_1019;
  }
  /** @type {number} */
  static #plus_1020 = 43;
  /** @returns {number} */
  static get plus() {
    return this.#plus_1020;
  }
  /** @type {number} */
  static #question_1021 = 63;
  /** @returns {number} */
  static get question() {
    return this.#question_1021;
  }
  /** @type {number} */
  static #roundLeft_1022 = 40;
  /** @returns {number} */
  static get roundLeft() {
    return this.#roundLeft_1022;
  }
  /** @type {number} */
  static #roundRight_1023 = 41;
  /** @returns {number} */
  static get roundRight() {
    return this.#roundRight_1023;
  }
  /** @type {number} */
  static #slash_1024 = 47;
  /** @returns {number} */
  static get slash() {
    return this.#slash_1024;
  }
  /** @type {number} */
  static #squareLeft_1025 = 91;
  /** @returns {number} */
  static get squareLeft() {
    return this.#squareLeft_1025;
  }
  /** @type {number} */
  static #squareRight_1026 = 93;
  /** @returns {number} */
  static get squareRight() {
    return this.#squareRight_1026;
  }
  /** @type {number} */
  static #star_1027 = 42;
  /** @returns {number} */
  static get star() {
    return this.#star_1027;
  }
  /** @type {number} */
  static #tab_1028 = 9;
  /** @returns {number} */
  static get tab() {
    return this.#tab_1028;
  }
  /** @type {number} */
  static #tilde_1029 = 42;
  /** @returns {number} */
  static get tilde() {
    return this.#tilde_1029;
  }
  /** @type {number} */
  static #upperA_1030 = 65;
  /** @returns {number} */
  static get upperA() {
    return this.#upperA_1030;
  }
  /** @type {number} */
  static #upperZ_1031 = 90;
  /** @returns {number} */
  static get upperZ() {
    return this.#upperZ_1031;
  }
  /** @type {number} */
  static #space_1032 = 32;
  /** @returns {number} */
  static get space() {
    return this.#space_1032;
  }
  /** @type {number} */
  static #surrogateMin_1033 = 55296;
  /** @returns {number} */
  static get surrogateMin() {
    return this.#surrogateMin_1033;
  }
  /** @type {number} */
  static #surrogateMax_1034 = 57343;
  /** @returns {number} */
  static get surrogateMax() {
    return this.#surrogateMax_1034;
  }
  /** @type {number} */
  static #supplementalMin_1035 = 65536;
  /** @returns {number} */
  static get supplementalMin() {
    return this.#supplementalMin_1035;
  }
  /** @type {number} */
  static #uint16Max_1036 = 65535;
  /** @returns {number} */
  static get uint16Max() {
    return this.#uint16Max_1036;
  }
  /** @type {number} */
  static #underscore_1037 = 95;
  /** @returns {number} */
  static get underscore() {
    return this.#underscore_1037;
  }
  constructor() {
    super ();
    return;
  }
}
class Begin_1038 extends type__779(Special) {
  constructor() {
    super ();
    return;
  }
}
/** @type {Special} */
const return_1039 = new Begin_1038();
/** @type {Special} */
export const Begin = return_1039;
class Dot_1040 extends type__779(Special) {
  constructor() {
    super ();
    return;
  }
}
/** @type {Special} */
const return_1041 = new Dot_1040();
/** @type {Special} */
export const Dot = return_1041;
class End_1042 extends type__779(Special) {
  constructor() {
    super ();
    return;
  }
}
/** @type {Special} */
const return_1043 = new End_1042();
/** @type {Special} */
export const End = return_1043;
class WordBoundary_1044 extends type__779(Special) {
  constructor() {
    super ();
    return;
  }
}
/** @type {Special} */
const return_1045 = new WordBoundary_1044();
/** @type {Special} */
export const WordBoundary = return_1045;
class Digit_1046 extends type__779(SpecialSet) {
  constructor() {
    super ();
    return;
  }
}
/** @type {SpecialSet} */
const return_1047 = new Digit_1046();
/** @type {SpecialSet} */
export const Digit = return_1047;
class Space_1048 extends type__779(SpecialSet) {
  constructor() {
    super ();
    return;
  }
}
/** @type {SpecialSet} */
const return_1049 = new Space_1048();
/** @type {SpecialSet} */
export const Space = return_1049;
class Word_1050 extends type__779(SpecialSet) {
  constructor() {
    super ();
    return;
  }
}
/** @type {SpecialSet} */
const return_1051 = new Word_1050();
/** @type {SpecialSet} */
export const Word = return_1051;
/** @returns {Array<number>} */
function buildEscapeNeeds_1052() {
  let t_1053;
  let t_1054;
  let t_1055;
  let t_1056;
  let t_1057;
  let t_1058;
  let t_1059;
  let t_1060;
  let t_1061;
  let t_1062;
  let t_1063;
  let t_1064;
  let t_1065;
  let t_1066;
  let t_1067;
  let t_1068;
  let t_1069;
  let t_1070;
  let t_1071;
  let t_1072;
  let t_1073;
  let t_1074;
  let t_1075;
  let t_1076;
  let t_1077;
  const escapeNeeds_1078 = [];
  let code_1079 = 0;
  while (code_1079 <= 127) {
    if (code_1079 === Codes_936.dash) {
      t_1060 = true;
    } else {
      if (code_1079 === Codes_936.space) {
        t_1059 = true;
      } else {
        if (code_1079 === Codes_936.underscore) {
          t_1058 = true;
        } else {
          if (Codes_936.digit0 <= code_1079) {
            t_1053 = code_1079 <= Codes_936.digit9;
          } else {
            t_1053 = false;
          }
          if (t_1053) {
            t_1057 = true;
          } else {
            if (Codes_936.upperA <= code_1079) {
              t_1054 = code_1079 <= Codes_936.upperZ;
            } else {
              t_1054 = false;
            }
            if (t_1054) {
              t_1056 = true;
            } else {
              if (Codes_936.lowerA <= code_1079) {
                t_1055 = code_1079 <= Codes_936.lowerZ;
              } else {
                t_1055 = false;
              }
              t_1056 = t_1055;
            }
            t_1057 = t_1056;
          }
          t_1058 = t_1057;
        }
        t_1059 = t_1058;
      }
      t_1060 = t_1059;
    }
    if (t_1060) {
      t_1077 = 0;
    } else {
      if (code_1079 === Codes_936.ampersand) {
        t_1076 = true;
      } else {
        if (code_1079 === Codes_936.backslash) {
          t_1075 = true;
        } else {
          if (code_1079 === Codes_936.caret) {
            t_1074 = true;
          } else {
            if (code_1079 === Codes_936.curlyLeft) {
              t_1073 = true;
            } else {
              if (code_1079 === Codes_936.curlyRight) {
                t_1072 = true;
              } else {
                if (code_1079 === Codes_936.dot) {
                  t_1071 = true;
                } else {
                  if (code_1079 === Codes_936.peso) {
                    t_1070 = true;
                  } else {
                    if (code_1079 === Codes_936.pipe) {
                      t_1069 = true;
                    } else {
                      if (code_1079 === Codes_936.plus) {
                        t_1068 = true;
                      } else {
                        if (code_1079 === Codes_936.question) {
                          t_1067 = true;
                        } else {
                          if (code_1079 === Codes_936.roundLeft) {
                            t_1066 = true;
                          } else {
                            if (code_1079 === Codes_936.roundRight) {
                              t_1065 = true;
                            } else {
                              if (code_1079 === Codes_936.slash) {
                                t_1064 = true;
                              } else {
                                if (code_1079 === Codes_936.squareLeft) {
                                  t_1063 = true;
                                } else {
                                  if (code_1079 === Codes_936.squareRight) {
                                    t_1062 = true;
                                  } else {
                                    if (code_1079 === Codes_936.star) {
                                      t_1061 = true;
                                    } else {
                                      t_1061 = code_1079 === Codes_936.tilde;
                                    }
                                    t_1062 = t_1061;
                                  }
                                  t_1063 = t_1062;
                                }
                                t_1064 = t_1063;
                              }
                              t_1065 = t_1064;
                            }
                            t_1066 = t_1065;
                          }
                          t_1067 = t_1066;
                        }
                        t_1068 = t_1067;
                      }
                      t_1069 = t_1068;
                    }
                    t_1070 = t_1069;
                  }
                  t_1071 = t_1070;
                }
                t_1072 = t_1071;
              }
              t_1073 = t_1072;
            }
            t_1074 = t_1073;
          }
          t_1075 = t_1074;
        }
        t_1076 = t_1075;
      }
      if (t_1076) {
        t_1077 = 2;
      } else {
        t_1077 = 1;
      }
    }
    listBuilderAdd_1080(escapeNeeds_1078, t_1077);
    code_1079 = code_1079 + 1 | 0;
  }
  return listBuilderToList_1081(escapeNeeds_1078);
}
/** @type {Array<number>} */
const return_1082 = buildEscapeNeeds_1052();
/** @type {Array<number>} */
const escapeNeeds_939 = return_1082;
/** @type {RegexRefs_839} */
const return_1083 = new RegexRefs_839();
/** @type {RegexRefs_839} */
const regexRefs_879 = return_1083;
/**
 * @param {RegexNode} item_1084
 * @returns {RegexNode}
 */
export function entire(item_1084) {
  return new Sequence(Object.freeze([Begin, item_1084, End]));
};
/**
 * @param {RegexNode} item_1085
 * @param {boolean | null} [reluctant_1086]
 * @returns {Repeat}
 */
export function oneOrMore(item_1085, reluctant_1086) {
  let reluctant_1087;
  if (reluctant_1086 == null) {
    reluctant_1087 = false;
  } else {
    reluctant_1087 = reluctant_1086;
  }
  return new Repeat(item_1085, 1, null, reluctant_1087);
};
/**
 * @param {RegexNode} item_1088
 * @param {boolean | null} [reluctant_1089]
 * @returns {Repeat}
 */
export function optional(item_1088, reluctant_1089) {
  let reluctant_1090;
  if (reluctant_1089 == null) {
    reluctant_1090 = false;
  } else {
    reluctant_1090 = reluctant_1089;
  }
  return new Repeat(item_1088, 0, 1, reluctant_1090);
};
