export as namespace ruleFunc;

export type Node = {
  type: RuleType;
  nodes?: Array<Node>;
  answer?: string;
};

export type Rule = {
  name: string;
  result: string;
  priority: number;
  node: Node;
};

export enum RuleType {
  and,
  or,
  contains,
}

export function convertStringToNode(str: string): Node;

export function evalRules(
  rules: Array<Rule>
): (answers: Array<string>) => Array<Rule>;
