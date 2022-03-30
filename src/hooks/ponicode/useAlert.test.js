const rewire = require("rewire");
const useAlert = rewire("../useAlert");
const getErrorMessage = useAlert.__get__("getErrorMessage");
// @ponicode
describe("getErrorMessage", () => {
  test("0", () => {
    getErrorMessage({ code: "auth/wrong-password" });
  });

  test("1", () => {
    getErrorMessage({ code: "auth/account-exists-with-different-credential" });
  });

  test("2", () => {
    getErrorMessage({
      code: "function substr(start, length) {\n        return string_substr.call(\n            this,\n            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,\n            length\n        );\n    }",
    });
  });

  test("3", () => {
    getErrorMessage({
      code: 'function unescape(code) {\n        return code.replace(/\\\\(\'|\\\\)/g, "$1").replace(/[\\r\\t\\n]/g, " ");\n    }',
    });
  });

  test("4", () => {
    getErrorMessage({
      code: "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}",
    });
  });

  test("5", () => {
    getErrorMessage({ code: "" });
  });
});
