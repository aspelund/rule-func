# rule-func - Simple rule system to filter results

rule-func is a simple library created to make it easy to take the inputs from a multi question survey and depending on the answers given get a specific result.

## Installation

    npm install rule-func

In the code, simply import `evalRules` and `convertStringToNode`.

    import { convertStringToNode, evalRules } from 'rule-func';

Look at the example below to try it out.

## Example

rule-func has two main features, `evalRules` that takes an array of rules and evaluates them towards a combination of answers given in a string array, and returning an ordered array of fulfilled rules' `result`. The order is based on the rules priority.

```
const myRules = [
        {
          name: "OrRule",
          result: "apa",
          priority: 3,
          node: convertStringToNode('or(has("1a"),has("1b"))'),
        },
        {
          name: "ContainsRule",
          result: "dapa",
          priority: 2,
          node: convertStringToNode('has("1a")'),
        },
        {
          name: "AndRule",
          result: "lapa",
          priority: 1,
          node: convertStringToNode('and(has("1a"),has("2b"))'),
        },
      ];
const myTest = evalRules(myRules);

const answers : Array<string> = [
    '1a', '2b', '3a',
];

const results = myTest(answers);
```

In this example results contains all result strings for the rules that are fulfilled by the set of answers.
