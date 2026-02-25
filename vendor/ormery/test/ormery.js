import {
  InMemoryStore, OrderClause, Query, WhereClause, field, isValidIdentifier, schema, toInsertSql, toSqlQuery
} from "../ormery.js";
import {
  Test as Test_1694
} from "@temperlang/std/testing";
import {
  mapConstructor as mapConstructor_1811, pairConstructor as pairConstructor_1812
} from "@temperlang/core";
it("toSql: select all", function () {
    const test_1693 = new Test_1694();
    try {
      const s_1695 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1696 = new InMemoryStore();
      const q_1697 = new Query(s_1695, store_1696);
      const actual_1698 = q_1697.toSql().toString();
      let t_1699 = actual_1698 === "SELECT * FROM users";
      function fn_1700() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users" + ") not (" + actual_1698 + ")";
      }
      test_1693.assert(t_1699, fn_1700);
      return;
    } finally {
      test_1693.softFailToHard();
    }
});
it("toSql: select columns", function () {
    const test_1701 = new Test_1694();
    try {
      const s_1702 = schema("users", Object.freeze([field("name", "String", false, false), field("age", "Int", false, false)]));
      const store_1703 = new InMemoryStore();
      const q_1704 = new Query(s_1702, store_1703).select(Object.freeze(["name", "age"]));
      const actual_1705 = q_1704.toSql().toString();
      let t_1706 = actual_1705 === "SELECT name, age FROM users";
      function fn_1707() {
        return "expected q.toSql().toString() == (" + "SELECT name, age FROM users" + ") not (" + actual_1705 + ")";
      }
      test_1701.assert(t_1706, fn_1707);
      return;
    } finally {
      test_1701.softFailToHard();
    }
});
it("toSql: where string", function () {
    const test_1708 = new Test_1694();
    try {
      const s_1709 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1710 = new InMemoryStore();
      const q_1711 = new Query(s_1709, store_1710).where("name", "=", "Alice");
      const actual_1712 = q_1711.toSql().toString();
      let t_1713 = actual_1712 === "SELECT * FROM users WHERE name = 'Alice'";
      function fn_1714() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = 'Alice'" + ") not (" + actual_1712 + ")";
      }
      test_1708.assert(t_1713, fn_1714);
      return;
    } finally {
      test_1708.softFailToHard();
    }
});
it("toSql: where int", function () {
    const test_1715 = new Test_1694();
    try {
      const s_1716 = schema("users", Object.freeze([field("age", "Int", false, false)]));
      const store_1717 = new InMemoryStore();
      const q_1718 = new Query(s_1716, store_1717).where("age", ">=", "18");
      const actual_1719 = q_1718.toSql().toString();
      let t_1720 = actual_1719 === "SELECT * FROM users WHERE age >= 18";
      function fn_1721() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE age >= 18" + ") not (" + actual_1719 + ")";
      }
      test_1715.assert(t_1720, fn_1721);
      return;
    } finally {
      test_1715.softFailToHard();
    }
});
it("toSql: SQL injection blocked", function () {
    const test_1722 = new Test_1694();
    try {
      const s_1723 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1724 = new InMemoryStore();
      const bobby_1725 = "Robert'); DROP TABLE users;--";
      const q_1726 = new Query(s_1723, store_1724).where("name", "=", "Robert'); DROP TABLE users;--");
      const result_1727 = q_1726.toSql().toString();
      const actual_1728 = result_1727;
      let t_1729 = actual_1728 === "SELECT * FROM users WHERE name = 'Robert''); DROP TABLE users;--'";
      function fn_1730() {
        return "expected result == (" + "SELECT * FROM users WHERE name = 'Robert''); DROP TABLE users;--'" + ") not (" + actual_1728 + ")";
      }
      test_1722.assert(t_1729, fn_1730);
      return;
    } finally {
      test_1722.softFailToHard();
    }
});
it("toSql: operator normalization", function () {
    const test_1731 = new Test_1694();
    try {
      const s_1732 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1733 = new InMemoryStore();
      const q_1734 = new Query(s_1732, store_1733).where("name", "==", "Alice");
      const actual_1735 = q_1734.toSql().toString();
      let t_1736 = actual_1735 === "SELECT * FROM users WHERE name = 'Alice'";
      function fn_1737() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = 'Alice'" + ") not (" + actual_1735 + ")";
      }
      test_1731.assert(t_1736, fn_1737);
      return;
    } finally {
      test_1731.softFailToHard();
    }
});
it("toSql: invalid operator fallback", function () {
    const test_1738 = new Test_1694();
    try {
      const s_1739 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1740 = new InMemoryStore();
      const q_1741 = new Query(s_1739, store_1740).where("name", "LIKE", "Alice");
      const actual_1742 = q_1741.toSql().toString();
      let t_1743 = actual_1742 === "SELECT * FROM users WHERE name = 'Alice'";
      function fn_1744() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = 'Alice'" + ") not (" + actual_1742 + ")";
      }
      test_1738.assert(t_1743, fn_1744);
      return;
    } finally {
      test_1738.softFailToHard();
    }
});
it("toSql: multiple where", function () {
    const test_1745 = new Test_1694();
    try {
      const s_1746 = schema("users", Object.freeze([field("age", "Int", false, false)]));
      const store_1747 = new InMemoryStore();
      const q_1748 = new Query(s_1746, store_1747).where("age", ">=", "18").where("age", "<", "30");
      const actual_1749 = q_1748.toSql().toString();
      let t_1750 = actual_1749 === "SELECT * FROM users WHERE age >= 18 AND age < 30";
      function fn_1751() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE age >= 18 AND age < 30" + ") not (" + actual_1749 + ")";
      }
      test_1745.assert(t_1750, fn_1751);
      return;
    } finally {
      test_1745.softFailToHard();
    }
});
it("toSql: order by", function () {
    const test_1752 = new Test_1694();
    try {
      const s_1753 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1754 = new InMemoryStore();
      const q_1755 = new Query(s_1753, store_1754).orderBy("name", "asc");
      const actual_1756 = q_1755.toSql().toString();
      let t_1757 = actual_1756 === "SELECT * FROM users ORDER BY name ASC";
      function fn_1758() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users ORDER BY name ASC" + ") not (" + actual_1756 + ")";
      }
      test_1752.assert(t_1757, fn_1758);
      return;
    } finally {
      test_1752.softFailToHard();
    }
});
it("toSql: order by desc", function () {
    const test_1759 = new Test_1694();
    try {
      const s_1760 = schema("users", Object.freeze([field("age", "Int", false, false)]));
      const store_1761 = new InMemoryStore();
      const q_1762 = new Query(s_1760, store_1761).orderBy("age", "desc");
      const actual_1763 = q_1762.toSql().toString();
      let t_1764 = actual_1763 === "SELECT * FROM users ORDER BY age DESC";
      function fn_1765() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users ORDER BY age DESC" + ") not (" + actual_1763 + ")";
      }
      test_1759.assert(t_1764, fn_1765);
      return;
    } finally {
      test_1759.softFailToHard();
    }
});
it("toSql: limit", function () {
    const test_1766 = new Test_1694();
    try {
      const s_1767 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1768 = new InMemoryStore();
      const q_1769 = new Query(s_1767, store_1768).limit(10);
      const actual_1770 = q_1769.toSql().toString();
      let t_1771 = actual_1770 === "SELECT * FROM users LIMIT 10";
      function fn_1772() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users LIMIT 10" + ") not (" + actual_1770 + ")";
      }
      test_1766.assert(t_1771, fn_1772);
      return;
    } finally {
      test_1766.softFailToHard();
    }
});
it("toSql: offset", function () {
    const test_1773 = new Test_1694();
    try {
      const s_1774 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1775 = new InMemoryStore();
      const q_1776 = new Query(s_1774, store_1775).offset(5);
      const actual_1777 = q_1776.toSql().toString();
      let t_1778 = actual_1777 === "SELECT * FROM users OFFSET 5";
      function fn_1779() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users OFFSET 5" + ") not (" + actual_1777 + ")";
      }
      test_1773.assert(t_1778, fn_1779);
      return;
    } finally {
      test_1773.softFailToHard();
    }
});
it("toSql: complex query", function () {
    const test_1780 = new Test_1694();
    try {
      const s_1781 = schema("users", Object.freeze([field("name", "String", false, false), field("age", "Int", false, false)]));
      const store_1782 = new InMemoryStore();
      const q_1783 = new Query(s_1781, store_1782).select(Object.freeze(["name", "age"])).where("age", ">=", "18").orderBy("age", "desc").limit(10).offset(20);
      const actual_1784 = q_1783.toSql().toString();
      let t_1785 = actual_1784 === "SELECT name, age FROM users WHERE age >= 18 ORDER BY age DESC LIMIT 10 OFFSET 20";
      function fn_1786() {
        return "expected q.toSql().toString() == (" + "SELECT name, age FROM users WHERE age >= 18 ORDER BY age DESC LIMIT 10 OFFSET 20" + ") not (" + actual_1784 + ")";
      }
      test_1780.assert(t_1785, fn_1786);
      return;
    } finally {
      test_1780.softFailToHard();
    }
});
it("toSql: unicode escaping", function () {
    const test_1787 = new Test_1694();
    try {
      const s_1788 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1789 = new InMemoryStore();
      const q_1790 = new Query(s_1788, store_1789).where("name", "=", "Hello 世界");
      const actual_1791 = q_1790.toSql().toString();
      let t_1792 = actual_1791 === "SELECT * FROM users WHERE name = 'Hello 世界'";
      function fn_1793() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = 'Hello 世界'" + ") not (" + actual_1791 + ")";
      }
      test_1787.assert(t_1792, fn_1793);
      return;
    } finally {
      test_1787.softFailToHard();
    }
});
it("toSql: embedded quotes", function () {
    const test_1794 = new Test_1694();
    try {
      const s_1795 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1796 = new InMemoryStore();
      const q_1797 = new Query(s_1795, store_1796).where("name", "=", "O'Brien");
      const actual_1798 = q_1797.toSql().toString();
      let t_1799 = actual_1798 === "SELECT * FROM users WHERE name = 'O''Brien'";
      function fn_1800() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = 'O''Brien'" + ") not (" + actual_1798 + ")";
      }
      test_1794.assert(t_1799, fn_1800);
      return;
    } finally {
      test_1794.softFailToHard();
    }
});
it("toSql: empty string", function () {
    const test_1801 = new Test_1694();
    try {
      const s_1802 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1803 = new InMemoryStore();
      const q_1804 = new Query(s_1802, store_1803).where("name", "=", "");
      const actual_1805 = q_1804.toSql().toString();
      let t_1806 = actual_1805 === "SELECT * FROM users WHERE name = ''";
      function fn_1807() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE name = ''" + ") not (" + actual_1805 + ")";
      }
      test_1801.assert(t_1806, fn_1807);
      return;
    } finally {
      test_1801.softFailToHard();
    }
});
it("toInsertSql: basic insert", function () {
    const test_1808 = new Test_1694();
    try {
      const s_1809 = schema("users", Object.freeze([field("name", "String", false, false), field("age", "Int", false, false)]));
      const vals_1810 = mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Alice"), pairConstructor_1812("age", "25")]));
      const result_1813 = toInsertSql(s_1809, vals_1810);
      const actual_1814 = result_1813.toString();
      let t_1815 = actual_1814 === "INSERT INTO users (name, age) VALUES ('Alice', 25)";
      function fn_1816() {
        return "expected result.toString() == (" + "INSERT INTO users (name, age) VALUES ('Alice', 25)" + ") not (" + actual_1814 + ")";
      }
      test_1808.assert(t_1815, fn_1816);
      return;
    } finally {
      test_1808.softFailToHard();
    }
});
it("toInsertSql: injection blocked", function () {
    const test_1817 = new Test_1694();
    try {
      const s_1818 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const vals_1819 = mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Robert'); DROP TABLE users;--")]));
      const result_1820 = toInsertSql(s_1818, vals_1819);
      const actual_1821 = result_1820.toString();
      let t_1822 = actual_1821 === "INSERT INTO users (name) VALUES ('Robert''); DROP TABLE users;--')";
      function fn_1823() {
        return "expected result.toString() == (" + "INSERT INTO users (name) VALUES ('Robert''); DROP TABLE users;--')" + ") not (" + actual_1821 + ")";
      }
      test_1817.assert(t_1822, fn_1823);
      return;
    } finally {
      test_1817.softFailToHard();
    }
});
it("toSqlQuery: standalone", function () {
    const test_1824 = new Test_1694();
    try {
      const s_1825 = schema("users", Object.freeze([field("name", "String", false, false), field("age", "Int", false, false)]));
      const result_1826 = toSqlQuery(s_1825, Object.freeze(["name"]), Object.freeze([new WhereClause("age", ">", "21")]), Object.freeze([new OrderClause("name", "asc")]), 5, 0);
      const actual_1827 = result_1826.toString();
      let t_1828 = actual_1827 === "SELECT name FROM users WHERE age > 21 ORDER BY name ASC LIMIT 5";
      function fn_1829() {
        return "expected result.toString() == (" + "SELECT name FROM users WHERE age > 21 ORDER BY name ASC LIMIT 5" + ") not (" + actual_1827 + ")";
      }
      test_1824.assert(t_1828, fn_1829);
      return;
    } finally {
      test_1824.softFailToHard();
    }
});
it("toSql: adversarial field name blocked", function () {
    const test_1830 = new Test_1694();
    try {
      const s_1831 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1832 = new InMemoryStore();
      const q_1833 = new Query(s_1831, store_1832).where("1=1; DROP TABLE users; --", "=", "Alice");
      const actual_1834 = q_1833.toSql().toString();
      let t_1835 = actual_1834 === "SELECT * FROM users";
      function fn_1836() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users" + ") not (" + actual_1834 + ")";
      }
      test_1830.assert(t_1835, fn_1836);
      return;
    } finally {
      test_1830.softFailToHard();
    }
});
it("toSql: adversarial select column blocked", function () {
    const test_1837 = new Test_1694();
    try {
      const s_1838 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1839 = new InMemoryStore();
      const q_1840 = new Query(s_1838, store_1839).select(Object.freeze(["name", "1; DROP TABLE users"]));
      const actual_1841 = q_1840.toSql().toString();
      let t_1842 = actual_1841 === "SELECT name FROM users";
      function fn_1843() {
        return "expected q.toSql().toString() == (" + "SELECT name FROM users" + ") not (" + actual_1841 + ")";
      }
      test_1837.assert(t_1842, fn_1843);
      return;
    } finally {
      test_1837.softFailToHard();
    }
});
it("toSql: adversarial order by blocked", function () {
    const test_1844 = new Test_1694();
    try {
      const s_1845 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1846 = new InMemoryStore();
      const q_1847 = new Query(s_1845, store_1846).orderBy("1; DROP TABLE users", "asc");
      const actual_1848 = q_1847.toSql().toString();
      let t_1849 = actual_1848 === "SELECT * FROM users";
      function fn_1850() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users" + ") not (" + actual_1848 + ")";
      }
      test_1844.assert(t_1849, fn_1850);
      return;
    } finally {
      test_1844.softFailToHard();
    }
});
it("isValidIdentifier: valid names", function () {
    const test_1851 = new Test_1694();
    try {
      let t_1852 = isValidIdentifier("users");
      function fn_1853() {
        return 'expected `-work/src//`.isValidIdentifier("users")';
      }
      test_1851.assert(t_1852, fn_1853);
      let t_1854 = isValidIdentifier("user_table");
      function fn_1855() {
        return 'expected `-work/src//`.isValidIdentifier("user_table")';
      }
      test_1851.assert(t_1854, fn_1855);
      let t_1856 = isValidIdentifier("Table1");
      function fn_1857() {
        return 'expected `-work/src//`.isValidIdentifier("Table1")';
      }
      test_1851.assert(t_1856, fn_1857);
      let t_1858 = isValidIdentifier("_private");
      function fn_1859() {
        return 'expected `-work/src//`.isValidIdentifier("_private")';
      }
      test_1851.assert(t_1858, fn_1859);
      let t_1860 = isValidIdentifier("a");
      function fn_1861() {
        return 'expected `-work/src//`.isValidIdentifier("a")';
      }
      test_1851.assert(t_1860, fn_1861);
      return;
    } finally {
      test_1851.softFailToHard();
    }
});
it("isValidIdentifier: invalid names", function () {
    const test_1862 = new Test_1694();
    try {
      let t_1863 = ! isValidIdentifier("");
      function fn_1864() {
        return 'expected !`-work/src//`.isValidIdentifier("")';
      }
      test_1862.assert(t_1863, fn_1864);
      let t_1865 = ! isValidIdentifier("users; DROP TABLE");
      function fn_1866() {
        return 'expected !`-work/src//`.isValidIdentifier("users; DROP TABLE")';
      }
      test_1862.assert(t_1865, fn_1866);
      let t_1867 = ! isValidIdentifier("users--");
      function fn_1868() {
        return 'expected !`-work/src//`.isValidIdentifier("users--")';
      }
      test_1862.assert(t_1867, fn_1868);
      let t_1869 = ! isValidIdentifier("ta ble");
      function fn_1870() {
        return 'expected !`-work/src//`.isValidIdentifier("ta ble")';
      }
      test_1862.assert(t_1869, fn_1870);
      let t_1871 = ! isValidIdentifier("table.name");
      function fn_1872() {
        return 'expected !`-work/src//`.isValidIdentifier("table.name")';
      }
      test_1862.assert(t_1871, fn_1872);
      let t_1873 = ! isValidIdentifier("Robert'); DROP TABLE users;--");
      function fn_1874() {
        return "expected !`-work/src//`.isValidIdentifier(\"Robert'); DROP TABLE users;--\")";
      }
      test_1862.assert(t_1873, fn_1874);
      return;
    } finally {
      test_1862.softFailToHard();
    }
});
it("toSql: non-numeric Int value produces always-false", function () {
    const test_1875 = new Test_1694();
    try {
      const s_1876 = schema("users", Object.freeze([field("age", "Int", false, false)]));
      const store_1877 = new InMemoryStore();
      const q_1878 = new Query(s_1876, store_1877).where("age", "=", "admin");
      const actual_1879 = q_1878.toSql().toString();
      let t_1880 = actual_1879 === "SELECT * FROM users WHERE 1 = 0";
      function fn_1881() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users WHERE 1 = 0" + ") not (" + actual_1879 + ")";
      }
      test_1875.assert(t_1880, fn_1881);
      return;
    } finally {
      test_1875.softFailToHard();
    }
});
it("in-memory: non-numeric Int value matches nothing", function () {
    const test_1882 = new Test_1694();
    try {
      const s_1883 = schema("users", Object.freeze([field("name", "String", false, false), field("age", "Int", false, false)]));
      const store_1884 = new InMemoryStore();
      store_1884.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Alice"), pairConstructor_1812("age", "0")])));
      const results_1885 = new Query(s_1883, store_1884).where("age", "=", "admin").all();
      const actual_1886 = results_1885.length;
      let t_1887 = actual_1886 === 0;
      function fn_1888() {
        return "expected results.length == (" + 0 .toString() + ") not (" + actual_1886.toString() + ")";
      }
      test_1882.assert(t_1887, fn_1888);
      return;
    } finally {
      test_1882.softFailToHard();
    }
});
it("toSql: limit zero emits LIMIT 0", function () {
    const test_1889 = new Test_1694();
    try {
      const s_1890 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1891 = new InMemoryStore();
      const q_1892 = new Query(s_1890, store_1891).limit(0);
      const actual_1893 = q_1892.toSql().toString();
      let t_1894 = actual_1893 === "SELECT * FROM users LIMIT 0";
      function fn_1895() {
        return "expected q.toSql().toString() == (" + "SELECT * FROM users LIMIT 0" + ") not (" + actual_1893 + ")";
      }
      test_1889.assert(t_1894, fn_1895);
      return;
    } finally {
      test_1889.softFailToHard();
    }
});
it("in-memory: limit zero returns empty", function () {
    const test_1896 = new Test_1694();
    try {
      const s_1897 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1898 = new InMemoryStore();
      store_1898.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Alice")])));
      const results_1899 = new Query(s_1897, store_1898).limit(0).all();
      const actual_1900 = results_1899.length;
      let t_1901 = actual_1900 === 0;
      function fn_1902() {
        return "expected results.length == (" + 0 .toString() + ") not (" + actual_1900.toString() + ")";
      }
      test_1896.assert(t_1901, fn_1902);
      return;
    } finally {
      test_1896.softFailToHard();
    }
});
it("in-memory: negative limit clamped to zero", function () {
    const test_1903 = new Test_1694();
    try {
      const s_1904 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const store_1905 = new InMemoryStore();
      store_1905.insert("users", mapConstructor_1811(Object.freeze([pairConstructor_1812("name", "Alice")])));
      const results_1906 = new Query(s_1904, store_1905).limit(-5).all();
      const actual_1907 = results_1906.length;
      let t_1908 = actual_1907 === 0;
      function fn_1909() {
        return "expected results.length == (" + 0 .toString() + ") not (" + actual_1907.toString() + ")";
      }
      test_1903.assert(t_1908, fn_1909);
      return;
    } finally {
      test_1903.softFailToHard();
    }
});
it("toInsertSql: no matching fields returns empty", function () {
    const test_1910 = new Test_1694();
    try {
      const s_1911 = schema("users", Object.freeze([field("name", "String", false, false)]));
      const vals_1912 = mapConstructor_1811(Object.freeze([pairConstructor_1812("nonexistent", "value")]));
      const result_1913 = toInsertSql(s_1911, vals_1912);
      const actual_1914 = result_1913.toString();
      let t_1915 = actual_1914 === "";
      function fn_1916() {
        return "expected result.toString() == (" + "" + ") not (" + actual_1914 + ")";
      }
      test_1910.assert(t_1915, fn_1916);
      return;
    } finally {
      test_1910.softFailToHard();
    }
});
