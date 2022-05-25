type Node = {
  type: RuleType;
  nodes?: Array<Node>;
  answer?: string;
};

type Rule = {
  name: string;
  result: string;
  priority: number;
  node: Node;
};

enum RuleType {
  and,
  or,
  contains,
}

export { Rule, RuleType, Node };
