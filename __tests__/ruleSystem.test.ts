import { RuleType, evalRules } from "../src/";

describe("evalRules", () => {
  it("Should work with simple system", () => {
    const testRules = evalRules([
      {
        name: "ContainsRule",
        result: "apa",
        priority: 1,
        node: {
          type: RuleType.contains,
          answer: "1a",
        },
      },
    ]);
    expect(testRules(["1a"])).toEqual(["apa"]);
    expect(testRules(["1b"])).toEqual([]);
  });
  it("Should work with simple and", () => {
    const testRules = evalRules([
      {
        name: "AndRule",
        result: "apa",
        priority: 1,
        node: {
          type: RuleType.and,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "2b" },
          ],
        },
      },
    ]);
    expect(testRules(["1a", "2b"])).toEqual(["apa"]);
    expect(testRules(["1a", "2a"])).toEqual([]);
  });
  it("Should work with simple or", () => {
    const testRules = evalRules([
      {
        name: "OrRule",
        result: "apa",
        priority: 1,
        node: {
          type: RuleType.or,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "1b" },
          ],
        },
      },
    ]);
    expect(testRules(["1a"])).toEqual(["apa"]);
    expect(testRules(["1b"])).toEqual(["apa"]);
    expect(testRules(["1c"])).toEqual([]);
  });
  it("Should work with multiple rules", () => {
    const testRules = evalRules([
      {
        name: "OrRule",
        result: "apa",
        priority: 1,
        node: {
          type: RuleType.or,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "1b" },
          ],
        },
      },
      {
        name: "ContainsRule",
        result: "dapa",
        priority: 2,
        node: {
          type: RuleType.contains,
          answer: "1a",
        },
      },
      {
        name: "AndRule",
        result: "lapa",
        priority: 3,
        node: {
          type: RuleType.and,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "2b" },
          ],
        },
      },
    ]);
    expect(testRules(["1a"])[0]).toEqual("apa");
    expect(testRules(["1a"])).toHaveLength(2);
  });
  it("Should work with priority", () => {
    const testRules = evalRules([
      {
        name: "OrRule",
        result: "apa",
        priority: 3,
        node: {
          type: RuleType.or,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "1b" },
          ],
        },
      },
      {
        name: "ContainsRule",
        result: "dapa",
        priority: 2,
        node: {
          type: RuleType.contains,
          answer: "1a",
        },
      },
      {
        name: "AndRule",
        result: "lapa",
        priority: 1,
        node: {
          type: RuleType.and,
          nodes: [
            { type: RuleType.contains, answer: "1a" },
            { type: RuleType.contains, answer: "2b" },
          ],
        },
      },
    ]);
    expect(testRules(["1a", "2b"])[0]).toEqual("lapa");
    expect(testRules(["1a", "2b"])).toHaveLength(3);
  });
  describe("with str to rules...", () => {
    it("Should work with priority from string", () => {
      const testRules = evalRules([
        {
          name: "OrRule",
          result: "apa",
          priority: 3,
          node: 'or(has("1a"),has("1b"))',
        },
        {
          name: "ContainsRule",
          result: "dapa",
          priority: 2,
          node: 'has("1a")',
        },
        {
          name: "AndRule",
          result: "lapa",
          priority: 1,
          node: 'and(has("1a"),has("2b"))',
        },
      ]);
      expect(testRules(["1a", "2b"])[0]).toEqual("lapa");
      expect(testRules(["1a", "2b"])).toHaveLength(3);
    });
  });
});
