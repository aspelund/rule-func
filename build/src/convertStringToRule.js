import { RuleType } from "./types";
const getCommaSeparatedExpressions = (expression) => {
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
    return str;
};
const convertIteratorToNode = (expression) => {
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
        type: RuleType.contains,
        answer: "apa",
    };
};
const convertStringToNode = (str) => {
    const iterator = str.replace(/\s/g, "")[Symbol.iterator]();
    const res = convertIteratorToNode(iterator);
    return Array.isArray(res) ? res[0] : res;
};
export { getCommaSeparatedExpressions, getString, convertStringToNode };
