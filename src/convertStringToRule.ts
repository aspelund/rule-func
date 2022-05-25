import { RuleType, Node } from "./types";

const getCommaSeparatedExpressions = (expression): Array<Node> => {
  const resNodes = [];
  let curNode = convertIteratorToNode(expression);
  let next = expression.next();
  while (!next.done && next.value === ",") {
    resNodes.push(curNode);
    curNode = convertIteratorToNode(expression);
    next = expression.next();
  }
  resNodes.push(curNode);
  return resNodes;
};

const getString = (expression) => {
  let str = "";
  let curChar = expression.next();
  while (!curChar.done && curChar.value != '"') {
    str += curChar.value;
    curChar = expression.next();
  }
  if (curChar.done) {
    throw new Error();
  }
  return str;
};

const convertIteratorToNode = (expression): Node | Array<Node> => {
  const curVal = expression.next();
  switch (curVal.value) {
    case "a": {
      expression.next();
      expression.next();
      expression.next();
      return {
        type: RuleType.and,
        nodes: getCommaSeparatedExpressions(expression),
      };
    }
    case "o": {
      expression.next();
      expression.next();
      return {
        type: RuleType.or,
        nodes: getCommaSeparatedExpressions(expression),
      };
    }
    case "h": {
      expression.next();
      expression.next();
      expression.next();
      expression.next();
      const res = getString(expression);
      expression.next();
      return {
        type: RuleType.contains,
        answer: res,
      };
    }
  }
  return {
    type: RuleType.invalid,
  };
};

const convertStringToNode = (str: string): Node => {
  const iterator = str.replace(/\s/g, "")[Symbol.iterator]();
  try {
    const res = convertIteratorToNode(iterator);
    if (!iterator.next().done) {
      throw new Error();
    }
    return Array.isArray(res) ? res[0] : res;
  } catch (e) {
    return { type: RuleType.invalid };
  }
};

export { getCommaSeparatedExpressions, getString, convertStringToNode };
