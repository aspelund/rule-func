import { convertStringToNode } from "./convertStringToRule";
import { RuleType } from "./types";
const testNode = (answers) => (node) => {
    switch (node.type) {
        case RuleType.invalid:
            return false;
        case RuleType.contains:
            return answers.indexOf(node.answer) >= 0;
        case RuleType.or:
            return node.nodes.some(testNode(answers));
        case RuleType.and:
            return (node.nodes.filter(testNode(answers)).length === node.nodes.length);
    }
    return false;
};
const evalRule = (answers) => (rule) => testNode(answers)(typeof rule.node === "string" ? convertStringToNode(rule.node) : rule.node);
const evalRules = (rules) => (answers) => rules
    .filter(evalRule(answers))
    .sort((rule1, rule2) => rule1.priority - rule2.priority)
    .map((rule) => rule.result);
export default evalRules;
export { RuleType };
