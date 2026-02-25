import {
  type as type__76, listBuilderAdd as listBuilderAdd_4, listBuilderAddAll as listBuilderAddAll_8, listedGet as listedGet_71, listBuilderToList as listBuilderToList_74, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_104, stringForEach as stringForEach_105, float64ToString as float64ToString_112, panic as panic_173
} from "@temperlang/core";
export class SqlBuilder extends type__76() {
  /** @type {Array<SqlPart>} */
  #buffer_0;
  /** @param {string} sqlSource_2 */
  appendSafe(sqlSource_2) {
    let t_3 = new SqlSource(sqlSource_2);
    listBuilderAdd_4(this.#buffer_0, t_3);
    return;
  }
  /** @param {SqlFragment} fragment_6 */
  appendFragment(fragment_6) {
    let t_7 = fragment_6.parts;
    listBuilderAddAll_8(this.#buffer_0, t_7);
    return;
  }
  /** @param {SqlPart} part_10 */
  appendPart(part_10) {
    listBuilderAdd_4(this.#buffer_0, part_10);
    return;
  }
  /** @param {Array<SqlPart>} values_12 */
  appendPartList(values_12) {
    const this15 = this;
    function fn_13(x_14) {
      this15.appendPart(x_14);
      return;
    }
    this.#appendList_16(values_12, fn_13);
    return;
  }
  /** @param {boolean} value_18 */
  appendBoolean(value_18) {
    let t_19 = new SqlBoolean(value_18);
    listBuilderAdd_4(this.#buffer_0, t_19);
    return;
  }
  /** @param {Array<boolean>} values_21 */
  appendBooleanList(values_21) {
    const this24 = this;
    function fn_22(x_23) {
      this24.appendBoolean(x_23);
      return;
    }
    this.#appendList_16(values_21, fn_22);
    return;
  }
  /** @param {globalThis.Date} value_26 */
  appendDate(value_26) {
    let t_27 = new SqlDate(value_26);
    listBuilderAdd_4(this.#buffer_0, t_27);
    return;
  }
  /** @param {Array<globalThis.Date>} values_29 */
  appendDateList(values_29) {
    const this32 = this;
    function fn_30(x_31) {
      this32.appendDate(x_31);
      return;
    }
    this.#appendList_16(values_29, fn_30);
    return;
  }
  /** @param {number} value_34 */
  appendFloat64(value_34) {
    let t_35 = new SqlFloat64(value_34);
    listBuilderAdd_4(this.#buffer_0, t_35);
    return;
  }
  /** @param {Array<number>} values_37 */
  appendFloat64List(values_37) {
    const this40 = this;
    function fn_38(x_39) {
      this40.appendFloat64(x_39);
      return;
    }
    this.#appendList_16(values_37, fn_38);
    return;
  }
  /** @param {number} value_42 */
  appendInt32(value_42) {
    let t_43 = new SqlInt32(value_42);
    listBuilderAdd_4(this.#buffer_0, t_43);
    return;
  }
  /** @param {Array<number>} values_45 */
  appendInt32List(values_45) {
    const this48 = this;
    function fn_46(x_47) {
      this48.appendInt32(x_47);
      return;
    }
    this.#appendList_16(values_45, fn_46);
    return;
  }
  /** @param {bigint} value_50 */
  appendInt64(value_50) {
    let t_51 = new SqlInt64(value_50);
    listBuilderAdd_4(this.#buffer_0, t_51);
    return;
  }
  /** @param {Array<bigint>} values_53 */
  appendInt64List(values_53) {
    const this56 = this;
    function fn_54(x_55) {
      this56.appendInt64(x_55);
      return;
    }
    this.#appendList_16(values_53, fn_54);
    return;
  }
  /** @param {string} value_58 */
  appendString(value_58) {
    let t_59 = new SqlString(value_58);
    listBuilderAdd_4(this.#buffer_0, t_59);
    return;
  }
  /** @param {Array<string>} values_61 */
  appendStringList(values_61) {
    const this64 = this;
    function fn_62(x_63) {
      this64.appendString(x_63);
      return;
    }
    this.#appendList_16(values_61, fn_62);
    return;
  }
  /**
   * @template {unknown} T_72
   * @param {Array<T_72>} values_66
   * @param {(arg0: T_72) => void} appendValue_67
   */
  #appendList_16(values_66, appendValue_67) {
    let t_68;
    let t_69;
    let i_70 = 0;
    while (true) {
      t_68 = values_66.length;
      if (!(i_70 < t_68)) {
        break;
      }
      if (i_70 > 0) {
        this.appendSafe(", ");
      }
      t_69 = listedGet_71(values_66, i_70);
      appendValue_67(t_69);
      i_70 = i_70 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_74(this.#buffer_0));
  }
  constructor() {
    super ();
    let t_75 = [];
    this.#buffer_0 = t_75;
    return;
  }
};
export class SqlFragment extends type__76() {
  /** @type {Array<SqlPart>} */
  #parts_77;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_80;
    const builder_81 = [""];
    let i_82 = 0;
    while (true) {
      t_80 = this.#parts_77.length;
      if (!(i_82 < t_80)) {
        break;
      }
      listedGet_71(this.#parts_77, i_82).formatTo(builder_81);
      i_82 = i_82 + 1 | 0;
    }
    return builder_81[0];
  }
  /** @param {Array<SqlPart>} parts_83 */
  constructor(parts_83) {
    super ();
    this.#parts_77 = parts_83;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_77;
  }
};
export class SqlPart extends type__76() {
  /** @param {globalThis.Array<string>} builder_86 */
  formatTo(builder_86) {
    null;
  }
};
export class SqlSource extends type__76(SqlPart) {
  /** @type {string} */
  #source_87;
  /** @param {globalThis.Array<string>} builder_89 */
  formatTo(builder_89) {
    builder_89[0] += this.#source_87;
    return;
  }
  /** @param {string} source_90 */
  constructor(source_90) {
    super ();
    this.#source_87 = source_90;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_87;
  }
};
export class SqlBoolean extends type__76(SqlPart) {
  /** @type {boolean} */
  #value_92;
  /** @param {globalThis.Array<string>} builder_94 */
  formatTo(builder_94) {
    let t_95;
    if (this.#value_92) {
      t_95 = "TRUE";
    } else {
      t_95 = "FALSE";
    }
    builder_94[0] += t_95;
    return;
  }
  /** @param {boolean} value_96 */
  constructor(value_96) {
    super ();
    this.#value_92 = value_96;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_92;
  }
};
export class SqlDate extends type__76(SqlPart) {
  /** @type {globalThis.Date} */
  #value_98;
  /** @param {globalThis.Array<string>} builder_100 */
  formatTo(builder_100) {
    builder_100[0] += "'";
    const s_101 = this.#value_98.toISOString().split("T")[0];
    function fn_102(c_103) {
      if (c_103 === 39) {
        builder_100[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_104(builder_100, c_103);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_105(s_101, fn_102);
    builder_100[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_106 */
  constructor(value_106) {
    super ();
    this.#value_98 = value_106;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_98;
  }
};
export class SqlFloat64 extends type__76(SqlPart) {
  /** @type {number} */
  #value_108;
  /** @param {globalThis.Array<string>} builder_110 */
  formatTo(builder_110) {
    let t_111 = float64ToString_112(this.#value_108);
    builder_110[0] += t_111;
    return;
  }
  /** @param {number} value_113 */
  constructor(value_113) {
    super ();
    this.#value_108 = value_113;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_108;
  }
};
export class SqlInt32 extends type__76(SqlPart) {
  /** @type {number} */
  #value_115;
  /** @param {globalThis.Array<string>} builder_117 */
  formatTo(builder_117) {
    let t_118 = this.#value_115.toString();
    builder_117[0] += t_118;
    return;
  }
  /** @param {number} value_119 */
  constructor(value_119) {
    super ();
    this.#value_115 = value_119;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_115;
  }
};
export class SqlInt64 extends type__76(SqlPart) {
  /** @type {bigint} */
  #value_121;
  /** @param {globalThis.Array<string>} builder_123 */
  formatTo(builder_123) {
    let t_124 = this.#value_121.toString();
    builder_123[0] += t_124;
    return;
  }
  /** @param {bigint} value_125 */
  constructor(value_125) {
    super ();
    this.#value_121 = value_125;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_121;
  }
};
export class SqlString extends type__76(SqlPart) {
  /** @type {string} */
  #value_127;
  /** @param {globalThis.Array<string>} builder_129 */
  formatTo(builder_129) {
    builder_129[0] += "'";
    function fn_130(c_131) {
      if (c_131 === 39) {
        builder_129[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_104(builder_129, c_131);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_105(this.#value_127, fn_130);
    builder_129[0] += "'";
    return;
  }
  /** @param {string} value_132 */
  constructor(value_132) {
    super ();
    this.#value_127 = value_132;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_127;
  }
};
