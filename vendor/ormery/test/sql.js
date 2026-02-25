import {
  SqlBuilder, SqlInt32, SqlString
} from "../sql.js";
import {
  Test as Test_135
} from "@temperlang/std/testing";
import {
  panic as panic_173
} from "@temperlang/core";
it("string escaping", function () {
    const test_134 = new Test_135();
    try {
      function build_136(name_137) {
        let t_138 = new SqlBuilder();
        t_138.appendSafe("select * from hi where name = ");
        t_138.appendString(name_137);
        return t_138.accumulated.toString();
      }
      function buildWrong_139(name_140) {
        return "select * from hi where name = '" + name_140 + "'";
      }
      const actual_141 = build_136("world");
      let t_142 = actual_141 === "select * from hi where name = 'world'";
      function fn_143() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_141 + ")";
      }
      test_134.assert(t_142, fn_143);
      const bobbyTables_144 = "Robert'); drop table hi;--";
      const actual_145 = build_136("Robert'); drop table hi;--");
      let t_146 = actual_145 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_147() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_145 + ")";
      }
      test_134.assert(t_146, fn_147);
      function fn_148() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_134.assert(true, fn_148);
      return;
    } finally {
      test_134.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_149 = new Test_135();
    try {
      let t_150 = new SqlBuilder();
      t_150.appendSafe("v = ");
      t_150.appendString("");
      const actual_151 = t_150.accumulated.toString();
      let t_152 = actual_151 === "v = ''";
      function fn_153() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_151 + ")";
      }
      test_149.assert(t_152, fn_153);
      let t_154 = new SqlBuilder();
      t_154.appendSafe("v = ");
      t_154.appendString("a''b");
      const actual_155 = t_154.accumulated.toString();
      let t_156 = actual_155 === "v = 'a''''b'";
      function fn_157() {
        return "expected stringExpr(`-work/src//sql/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_155 + ")";
      }
      test_149.assert(t_156, fn_157);
      let t_158 = new SqlBuilder();
      t_158.appendSafe("v = ");
      t_158.appendString("Hello 世界");
      const actual_159 = t_158.accumulated.toString();
      let t_160 = actual_159 === "v = 'Hello 世界'";
      function fn_161() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_159 + ")";
      }
      test_149.assert(t_160, fn_161);
      let t_162 = new SqlBuilder();
      t_162.appendSafe("v = ");
      t_162.appendString("Line1\nLine2");
      const actual_163 = t_162.accumulated.toString();
      let t_164 = actual_163 === "v = 'Line1\nLine2'";
      function fn_165() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_163 + ")";
      }
      test_149.assert(t_164, fn_165);
      return;
    } finally {
      test_149.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_166 = new Test_135();
    try {
      let t_167;
      let t_168 = new SqlBuilder();
      t_168.appendSafe("select ");
      t_168.appendInt32(42);
      t_168.appendSafe(", ");
      t_168.appendInt64(BigInt("43"));
      t_168.appendSafe(", ");
      t_168.appendFloat64(19.99);
      t_168.appendSafe(", ");
      t_168.appendBoolean(true);
      t_168.appendSafe(", ");
      t_168.appendBoolean(false);
      const actual_169 = t_168.accumulated.toString();
      let t_170 = actual_169 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_171() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_169 + ")";
      }
      test_166.assert(t_170, fn_171);
      let date_172;
      try {
        t_167 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_172 = t_167;
      } catch {
        date_172 = panic_173();
      }
      let t_174 = new SqlBuilder();
      t_174.appendSafe("insert into t values (");
      t_174.appendDate(date_172);
      t_174.appendSafe(")");
      const actual_175 = t_174.accumulated.toString();
      let t_176 = actual_175 === "insert into t values ('2024-12-25')";
      function fn_177() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_175 + ")";
      }
      test_166.assert(t_176, fn_177);
      return;
    } finally {
      test_166.softFailToHard();
    }
});
it("lists", function () {
    const test_178 = new Test_135();
    try {
      let t_179;
      let t_180;
      let t_181;
      let t_182;
      let t_183 = new SqlBuilder();
      t_183.appendSafe("v IN (");
      t_183.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_183.appendSafe(")");
      const actual_184 = t_183.accumulated.toString();
      let t_185 = actual_184 === "v IN ('a', 'b', 'c''d')";
      function fn_186() {
        return "expected stringExpr(`-work/src//sql/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_184 + ")";
      }
      test_178.assert(t_185, fn_186);
      let t_187 = new SqlBuilder();
      t_187.appendSafe("v IN (");
      t_187.appendInt32List(Object.freeze([1, 2, 3]));
      t_187.appendSafe(")");
      const actual_188 = t_187.accumulated.toString();
      let t_189 = actual_188 === "v IN (1, 2, 3)";
      function fn_190() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_188 + ")";
      }
      test_178.assert(t_189, fn_190);
      let t_191 = new SqlBuilder();
      t_191.appendSafe("v IN (");
      t_191.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_191.appendSafe(")");
      const actual_192 = t_191.accumulated.toString();
      let t_193 = actual_192 === "v IN (1, 2)";
      function fn_194() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_192 + ")";
      }
      test_178.assert(t_193, fn_194);
      let t_195 = new SqlBuilder();
      t_195.appendSafe("v IN (");
      t_195.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_195.appendSafe(")");
      const actual_196 = t_195.accumulated.toString();
      let t_197 = actual_196 === "v IN (1.0, 2.0)";
      function fn_198() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_196 + ")";
      }
      test_178.assert(t_197, fn_198);
      let t_199 = new SqlBuilder();
      t_199.appendSafe("v IN (");
      t_199.appendBooleanList(Object.freeze([true, false]));
      t_199.appendSafe(")");
      const actual_200 = t_199.accumulated.toString();
      let t_201 = actual_200 === "v IN (TRUE, FALSE)";
      function fn_202() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_200 + ")";
      }
      test_178.assert(t_201, fn_202);
      try {
        t_179 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_180 = t_179;
      } catch {
        t_180 = panic_173();
      }
      try {
        t_181 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_182 = t_181;
      } catch {
        t_182 = panic_173();
      }
      const dates_203 = Object.freeze([t_180, t_182]);
      let t_204 = new SqlBuilder();
      t_204.appendSafe("v IN (");
      t_204.appendDateList(dates_203);
      t_204.appendSafe(")");
      const actual_205 = t_204.accumulated.toString();
      let t_206 = actual_205 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_207() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_205 + ")";
      }
      test_178.assert(t_206, fn_207);
      return;
    } finally {
      test_178.softFailToHard();
    }
});
it("nesting", function () {
    const test_208 = new Test_135();
    try {
      const name_209 = "Someone";
      let t_210 = new SqlBuilder();
      t_210.appendSafe("where p.last_name = ");
      t_210.appendString("Someone");
      const condition_211 = t_210.accumulated;
      let t_212 = new SqlBuilder();
      t_212.appendSafe("select p.id from person p ");
      t_212.appendFragment(condition_211);
      const actual_213 = t_212.accumulated.toString();
      let t_214 = actual_213 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_215() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_213 + ")";
      }
      test_208.assert(t_214, fn_215);
      let t_216 = new SqlBuilder();
      t_216.appendSafe("select p.id from person p ");
      t_216.appendPart(condition_211.toSource());
      const actual_217 = t_216.accumulated.toString();
      let t_218 = actual_217 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_219() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_217 + ")";
      }
      test_208.assert(t_218, fn_219);
      const parts_220 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_221 = new SqlBuilder();
      t_221.appendSafe("select ");
      t_221.appendPartList(parts_220);
      const actual_222 = t_221.accumulated.toString();
      let t_223 = actual_222 === "select 'a''b', 3";
      function fn_224() {
        return 'expected stringExpr(`-work/src//sql/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_222 + ")";
      }
      test_208.assert(t_223, fn_224);
      return;
    } finally {
      test_208.softFailToHard();
    }
});
