import {
  SafeHtmlBuilder, htmlCodec
} from "../html.js";
import {
  Test as Test_713
} from "@temperlang/std/testing";
it("HTML decoding", function () {
    const test_712 = new Test_713();
    try {
      const actual_714 = htmlCodec.decode("");
      let t_715 = actual_714 === "";
      function fn_716() {
        return 'expected `-work/src//html/`.htmlCodec.decode("") == (' + "" + ") not (" + actual_714 + ")";
      }
      test_712.assert(t_715, fn_716);
      const actual_717 = htmlCodec.decode("&l");
      let t_718 = actual_717 === "&l";
      function fn_719() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&l") == (' + "&l" + ") not (" + actual_717 + ")";
      }
      test_712.assert(t_718, fn_719);
      const actual_720 = htmlCodec.decode("&lt");
      let t_721 = actual_720 === "<";
      function fn_722() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&lt") == (' + "<" + ") not (" + actual_720 + ")";
      }
      test_712.assert(t_721, fn_722);
      const actual_723 = htmlCodec.decode("&lt;");
      let t_724 = actual_723 === "<";
      function fn_725() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&lt;") == (' + "<" + ") not (" + actual_723 + ")";
      }
      test_712.assert(t_724, fn_725);
      const actual_726 = htmlCodec.decode("&Bcy;");
      let t_727 = actual_726 === "Б";
      function fn_728() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&Bcy;") == (' + "Б" + ") not (" + actual_726 + ")";
      }
      test_712.assert(t_727, fn_728);
      const actual_729 = htmlCodec.decode("&Bcy");
      let t_730 = actual_729 === "&Bcy";
      function fn_731() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&Bcy") == (' + "&Bcy" + ") not (" + actual_729 + ")";
      }
      test_712.assert(t_730, fn_731);
      const actual_732 = htmlCodec.decode("&LT;");
      let t_733 = actual_732 === "<";
      function fn_734() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&LT;") == (' + "<" + ") not (" + actual_732 + ")";
      }
      test_712.assert(t_733, fn_734);
      const actual_735 = htmlCodec.decode("&Aacute;");
      let t_736 = actual_735 === "Á";
      function fn_737() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&Aacute;") == (' + "Á" + ") not (" + actual_735 + ")";
      }
      test_712.assert(t_736, fn_737);
      const actual_738 = htmlCodec.decode("&aacute;");
      let t_739 = actual_738 === "á";
      function fn_740() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&aacute;") == (' + "á" + ") not (" + actual_738 + ")";
      }
      test_712.assert(t_739, fn_740);
      const actual_741 = htmlCodec.decode("&AaCuTe;");
      let t_742 = actual_741 === "&AaCuTe;";
      function fn_743() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&AaCuTe;") == (' + "&AaCuTe;" + ") not (" + actual_741 + ")";
      }
      test_712.assert(t_742, fn_743);
      const actual_744 = htmlCodec.decode("&gt;;");
      let t_745 = actual_744 === ">;";
      function fn_746() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&gt;;") == (' + ">;" + ") not (" + actual_744 + ")";
      }
      test_712.assert(t_745, fn_746);
      const actual_747 = htmlCodec.decode("&amp;lt;");
      let t_748 = actual_747 === "&lt;";
      function fn_749() {
        return 'expected `-work/src//html/`.htmlCodec.decode("&amp;lt;") == (' + "&lt;" + ") not (" + actual_747 + ")";
      }
      test_712.assert(t_748, fn_749);
      return;
    } finally {
      test_712.softFailToHard();
    }
});
it("HTML encoding", function () {
    const test_750 = new Test_713();
    try {
      const actual_751 = htmlCodec.encode("");
      let t_752 = actual_751 === "";
      function fn_753() {
        return 'expected `-work/src//html/`.htmlCodec.encode("") == (' + "" + ") not (" + actual_751 + ")";
      }
      test_750.assert(t_752, fn_753);
      const actual_754 = htmlCodec.encode("Hello, World!");
      let t_755 = actual_754 === "Hello, World!";
      function fn_756() {
        return 'expected `-work/src//html/`.htmlCodec.encode("Hello, World!") == (' + "Hello, World!" + ") not (" + actual_754 + ")";
      }
      test_750.assert(t_755, fn_756);
      const actual_757 = htmlCodec.encode("<foo> & <bar baz='b\"oo'> far");
      let t_758 = actual_757 === "&lt;foo&gt; &amp; &lt;bar baz=&#39;b&#34;oo&#39;&gt; far";
      function fn_759() {
        return "expected `-work/src//html/`.htmlCodec.encode(\"<foo> & <bar baz='b\\\"oo'> far\") == (" + "&lt;foo&gt; &amp; &lt;bar baz=&#39;b&#34;oo&#39;&gt; far" + ") not (" + actual_757 + ")";
      }
      test_750.assert(t_758, fn_759);
      return;
    } finally {
      test_750.softFailToHard();
    }
});
it("hello world, html style", function () {
    const test_1140 = new Test_713();
    try {
      let t_1141 = new SafeHtmlBuilder();
      t_1141.appendSafe("Hello, <b>");
      t_1141.appendString("World");
      t_1141.appendSafe("<\/b>!");
      const actual_1142 = t_1141.accumulated.toString();
      let t_1143 = actual_1142 === "Hello, <b>World<\/b>!";
      function fn_1144() {
        return 'expected stringExpr(`-work/src//html/`.html, true, "Hello, <b>", \\interpolate, "World", "<\/b>!").toString() == (' + "Hello, <b>World<\/b>!" + ") not (" + actual_1142 + ")";
      }
      test_1140.assert(t_1143, fn_1144);
      return;
    } finally {
      test_1140.softFailToHard();
    }
});
it("autoescaped", function () {
    const test_1145 = new Test_713();
    try {
      let t_1146 = new SafeHtmlBuilder();
      t_1146.appendSafe("1 + 1 ");
      t_1146.appendString("<");
      t_1146.appendSafe(" 3.");
      const actual_1147 = t_1146.accumulated.toString();
      let t_1148 = actual_1147 === "1 + 1 &lt; 3.";
      function fn_1149() {
        return 'expected stringExpr(`-work/src//html/`.html, true, "1 + 1 ", \\interpolate, "<", " 3.").toString() == (' + "1 + 1 &lt; 3." + ") not (" + actual_1147 + ")";
      }
      test_1145.assert(t_1148, fn_1149);
      return;
    } finally {
      test_1145.softFailToHard();
    }
});
it("context matters -- URLs embed", function () {
    const test_1150 = new Test_713();
    try {
      function okUrl_1151() {
        return "https://example.com/isn't-a-problem";
      }
      function evilUrl_1152() {
        return "javascript:alert('evil done')";
      }
      let t_1153 = new SafeHtmlBuilder();
      t_1153.appendSafe("<a href='");
      t_1153.appendString("https://example.com/isn't-a-problem");
      t_1153.appendSafe("'>");
      t_1153.appendString("https://example.com/isn't-a-problem");
      t_1153.appendSafe("<\/a>");
      const actual_1154 = t_1153.accumulated.toString();
      let t_1155 = actual_1154 === "<a href='https://example.com/isn&#39;t-a-problem'>https://example.com/isn&#39;t-a-problem<\/a>";
      function fn_1156() {
        return "expected stringExpr(`-work/src//html/`.html, true, \"<a href='\", \\interpolate, okUrl(), \"'>\", \\interpolate, okUrl(), \"<\/a>\").toString() == (" + "<a href='https://example.com/isn&#39;t-a-problem'>https://example.com/isn&#39;t-a-problem<\/a>" + ") not (" + actual_1154 + ")";
      }
      test_1150.assert(t_1155, fn_1156);
      let t_1157 = new SafeHtmlBuilder();
      t_1157.appendSafe("<a href='");
      t_1157.appendString("javascript:alert('evil done')");
      t_1157.appendSafe("'>");
      t_1157.appendString("javascript:alert('evil done')");
      t_1157.appendSafe("<\/a>");
      const actual_1158 = t_1157.accumulated.toString();
      let t_1159 = actual_1158 === "<a href='about:zz_Temper_zz#'>javascript:alert(&#39;evil done&#39;)<\/a>";
      function fn_1160() {
        return "expected stringExpr(`-work/src//html/`.html, true, \"<a href='\", \\interpolate, evilUrl(), \"'>\", \\interpolate, evilUrl(), \"<\/a>\").toString() == (" + "<a href='about:zz_Temper_zz#'>javascript:alert(&#39;evil done&#39;)<\/a>" + ") not (" + actual_1158 + ")";
      }
      test_1150.assert(t_1159, fn_1160);
      return;
    } finally {
      test_1150.softFailToHard();
    }
});
it("quote adjustments", function () {
    const test_1161 = new Test_713();
    try {
      const className_1162 = "some-class";
      let t_1163 = new SafeHtmlBuilder();
      t_1163.appendSafe("<hr class=");
      t_1163.appendString("some-class");
      t_1163.appendSafe("><hr class='");
      t_1163.appendString("some-class");
      t_1163.appendSafe("'><hr class=other-class>");
      const actual_1164 = t_1163.accumulated.toString();
      let t_1165 = actual_1164 === "<hr class=\"some-class\"><hr class='some-class'><hr class=\"other-class\">";
      function fn_1166() {
        return "expected stringExpr(`-work/src//html/`.html, true, \"<hr class=\", \\interpolate, className, \"><hr class='\", \\interpolate, className, \"'><hr class=other-class>\").toString() == (" + "<hr class=\"some-class\"><hr class='some-class'><hr class=\"other-class\">" + ") not (" + actual_1164 + ")";
      }
      test_1161.assert(t_1165, fn_1166);
      return;
    } finally {
      test_1161.softFailToHard();
    }
});
it("safehtml injected in tag and attribute context", function () {
    const test_1167 = new Test_713();
    try {
      let t_1168 = new SafeHtmlBuilder();
      t_1168.appendSafe("I <3 <b>Ponies<\/b>!");
      const love_1169 = t_1168.accumulated;
      let t_1170 = new SafeHtmlBuilder();
      t_1170.appendSafe("<b>");
      t_1170.appendSafeHtml(love_1169);
      t_1170.appendSafe("<\/b><img alt='");
      t_1170.appendSafeHtml(love_1169);
      t_1170.appendSafe("' src='ponies'>");
      const actual_1171 = t_1170.accumulated.toString();
      let t_1172 = actual_1171 === "<b>I &lt;3 <b>Ponies<\/b>!<\/b><img alt='I &lt;3 &lt;b&gt;Ponies&lt;/b&gt;!' src='ponies'>";
      function fn_1173() {
        return "expected stringExpr(`-work/src//html/`.html, true, \"<b>\", \\interpolate, love, \"<\/b><img alt='\", \\interpolate, love, \"' src='ponies'>\").toString() == (" + "<b>I &lt;3 <b>Ponies<\/b>!<\/b><img alt='I &lt;3 &lt;b&gt;Ponies&lt;/b&gt;!' src='ponies'>" + ") not (" + actual_1171 + ")";
      }
      test_1167.assert(t_1172, fn_1173);
      return;
    } finally {
      test_1167.softFailToHard();
    }
});
it("looping inside an HTML expression", function () {
    const test_1174 = new Test_713();
    try {
      const items_1175 = Object.freeze(["One", "<Two>", "Three"]);
      const accumulator_1176 = new SafeHtmlBuilder();
      accumulator_1176.appendSafe("<ul>\n");
      function fn_1177(item_1178) {
        accumulator_1176.appendSafe("  <li>");
        accumulator_1176.appendString(item_1178);
        accumulator_1176.appendSafe("<\/li>\n");
        return;
      }
      items_1175.forEach(fn_1177);
      accumulator_1176.appendSafe("<\/ul>");
      const got_1179 = accumulator_1176.accumulated;
      const actual_1180 = got_1179.text;
      let t_1181 = actual_1180 === "<ul>\n  <li>One<\/li>\n  <li>&lt;Two&gt;<\/li>\n  <li>Three<\/li>\n<\/ul>";
      function fn_1182() {
        return "expected got.text == (" + "<ul>\n  <li>One<\/li>\n  <li>&lt;Two&gt;<\/li>\n  <li>Three<\/li>\n<\/ul>" + ") not (" + actual_1180 + ")";
      }
      test_1174.assert(t_1181, fn_1182);
      return;
    } finally {
      test_1174.softFailToHard();
    }
});
it("double quotes in attribute value with inserted quotes", function () {
    const test_1183 = new Test_713();
    try {
      let t_1184 = new SafeHtmlBuilder();
      t_1184.appendSafe('<div id=a"b>');
      const actual_1185 = t_1184.accumulated.text;
      let t_1186 = actual_1185 === '<div id="a&#34;b">';
      function fn_1187() {
        return 'expected stringExpr(`-work/src//html/`.html, true, "<div id=a\\"b>").text == (' + '<div id="a&#34;b">' + ") not (" + actual_1185 + ")";
      }
      test_1183.assert(t_1186, fn_1187);
      return;
    } finally {
      test_1183.softFailToHard();
    }
});
