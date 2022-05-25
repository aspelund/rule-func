import { RuleType } from "../src/";
import {
  getCommaSeparatedExpressions,
  getString,
  convertStringToNode,
} from "../src/convertStringToRule";

describe("convertStringToNode", () => {
  it("Should work on strings", () => {
    const str = 'Hej hej"';
    const it = str[Symbol.iterator]();
    const res = getString(it);
    expect(res).toEqual("Hej hej");
  });
  it("Should work on has", () => {
    expect(convertStringToNode('has("1a")').answer).toEqual("1a");
  });
  it("Should work on commas", () => {
    const res = getCommaSeparatedExpressions(
      'has("1a"),has("2a")'[Symbol.iterator]()
    );
    expect(res.length).toEqual(2);
    expect(res[0].type).toEqual(RuleType.contains);
    expect(res[1].type).toEqual(RuleType.contains);
    expect(res[0].answer).toEqual("1a");
    expect(res[1].answer).toEqual("2a");
  });
  it("should work on and", () => {
    const res = convertStringToNode('and(has("1a"),has("2a"))');
    expect(res.type).toEqual(RuleType.and);
    expect(res.nodes[0].type).toEqual(RuleType.contains);
    expect(res.nodes[1].answer).toEqual("2a");
  });
  it("should work on or", () => {
    const res = convertStringToNode('or(has("1a"),has("2a"))');
    expect(res.type).toEqual(RuleType.or);
    expect(res.nodes[0].type).toEqual(RuleType.contains);
    expect(res.nodes[1].answer).toEqual("2a");
  });
});

describe("convertStringToNode", () => {
  it("should have the correct data", () => {
    const rule = {
      name: "HasRule",
      result: "apa",
      priority: 3,
      node: convertStringToNode('has("1a")'),
    };
    expect(rule.node.type).toEqual(RuleType.contains);
  });
  it("should be invalid if there are problems with the quotes", () => {
    const rule = {
      name: "HasRule",
      result: "apa",
      priority: 3,
      node: convertStringToNode('has("1a)'),
    };
    expect(rule.node).toEqual({ type: RuleType.invalid });
  });
  it("should be invalid if there are problems with the parenteses", () => {
    const rule = {
      name: "HasRule",
      result: "apa",
      priority: 3,
      node: convertStringToNode('has("1a"))'),
    };
    expect(rule.node).toEqual({ type: RuleType.invalid });
  });
});
