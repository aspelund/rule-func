var RuleType;
(function (RuleType) {
    RuleType[RuleType["and"] = 0] = "and";
    RuleType[RuleType["or"] = 1] = "or";
    RuleType[RuleType["contains"] = 2] = "contains";
    RuleType[RuleType["invalid"] = 3] = "invalid";
})(RuleType || (RuleType = {}));
export { RuleType };
