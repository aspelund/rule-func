type Node = {
  type: RuleType;
  nodes?: Array<Node>;
  answer?: string;
};

type Rule = {
  name: string;
  result: string;
  priority: number;
  node: Node | string;
};

enum RuleType {
  and,
  or,
  contains,
  invalid,
}

export { Rule, RuleType, Node };
