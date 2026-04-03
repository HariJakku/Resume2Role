export interface TestCase {
  id:       number
  input:    string        // human-readable display
  args:     string        // JSON array of args to pass
  expected: string        // expected return value as JSON
  hidden:   boolean
}

export interface CodingProblem {
  id:            string
  title:         string
  slug:          string
  difficulty:    "easy" | "medium" | "hard"
  topics:        string[]
  companies:     string[]
  description:   string
  examples:      { input: string; output: string; explanation?: string }[]
  constraints:   string[]
  hints:         string[]
  function_name: string
  starter_code:  Record<string, string>
  test_cases:    TestCase[]
}

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: "1", title: "Two Sum", slug: "two-sum",
    difficulty: "easy", topics: ["Array","Hash Map"],
    companies: ["amazon","google","microsoft","flipkart","tcs"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

Return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6",      output: "[1,2]" },
      { input: "nums = [3,3], target = 6",         output: "[0,1]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists"],
    hints: ["Use a hash map to store numbers you've seen", "For each number x, check if target-x exists in the map"],
    function_name: "twoSum",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
};`,
      python: `def twoSum(nums, target):
    # Your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [2,7,11,15], target = 9", args:"[[2,7,11,15],9]",  expected:"[0,1]",  hidden:false },
      { id:2, input:"nums = [3,2,4], target = 6",      args:"[[3,2,4],6]",     expected:"[1,2]",  hidden:false },
      { id:3, input:"nums = [3,3], target = 6",         args:"[[3,3],6]",       expected:"[0,1]",  hidden:true  },
      { id:4, input:"nums = [1,5,3,2], target = 4",    args:"[[1,5,3,2],4]",   expected:"[2,3]",  hidden:true  },
      { id:5, input:"nums = [-1,-2,-3,-4,-5], target = -8", args:"[[-1,-2,-3,-4,-5],-8]", expected:"[2,4]", hidden:true },
      { id:6, input:"nums = [0,4,3,0], target = 0",    args:"[[0,4,3,0],0]",   expected:"[0,3]",  hidden:true  },
    ],
  },
  {
    id: "2", title: "Valid Parentheses", slug: "valid-parentheses",
    difficulty: "easy", topics: ["Stack","String"],
    companies: ["amazon","google","microsoft","infosys"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is **valid**.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"',      output: "true" },
      { input: 's = "()[]{}"',  output: "true" },
      { input: 's = "(]"',      output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
    hints: ["Use a stack","Push opening brackets, pop and compare for closing brackets"],
    function_name: "isValid",
    starter_code: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your code here
};`,
      python: `def isValid(s):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
      cpp: `bool isValid(string s) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:'s = "()"',     args:'["()"]',    expected:"true",  hidden:false },
      { id:2, input:'s = "()[]{}"', args:'["()[]{}"]',expected:"true",  hidden:false },
      { id:3, input:'s = "(]"',     args:'["(]"]',    expected:"false", hidden:true  },
      { id:4, input:'s = "([)]"',   args:'["([)]"]',  expected:"false", hidden:true  },
      { id:5, input:'s = "{[]}"',   args:'["{[]}"]',  expected:"true",  hidden:true  },
      { id:6, input:'s = ""',       args:'[""]',      expected:"true",  hidden:true  },
    ],
  },
  {
    id: "3", title: "Reverse Linked List", slug: "reverse-linked-list",
    difficulty: "easy", topics: ["Linked List","Recursion"],
    companies: ["amazon","flipkart","tcs","microsoft"],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the **reversed list**.

**Note:** For this problem, represent your linked list as an array and return the reversed array.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]",       output: "[2,1]" },
      { input: "head = []",           output: "[]" },
    ],
    constraints: ["0 ≤ nodes ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    hints: ["Think of it as reversing an array","Track prev, curr pointers"],
    function_name: "reverseList",
    starter_code: {
      javascript: `/**
 * @param {number[]} head - array representation of linked list
 * @return {number[]}
 */
function reverseList(head) {
    // Your code here
};`,
      python: `def reverseList(head):
    # head is a list, return reversed list
    pass`,
      java: `class Solution {
    public int[] reverseList(int[] head) {
        // Your code here
    }
}`,
      cpp: `vector<int> reverseList(vector<int>& head) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"head = [1,2,3,4,5]", args:"[[1,2,3,4,5]]", expected:"[5,4,3,2,1]", hidden:false },
      { id:2, input:"head = [1,2]",        args:"[[1,2]]",       expected:"[2,1]",        hidden:false },
      { id:3, input:"head = []",            args:"[[]]",          expected:"[]",           hidden:true  },
      { id:4, input:"head = [1]",           args:"[[1]]",         expected:"[1]",          hidden:true  },
      { id:5, input:"head = [1,2,3]",       args:"[[1,2,3]]",     expected:"[3,2,1]",      hidden:true  },
      { id:6, input:"head = [5,4,3,2,1]",   args:"[[5,4,3,2,1]]", expected:"[1,2,3,4,5]", hidden:true  },
    ],
  },
  {
    id: "4", title: "Maximum Subarray", slug: "maximum-subarray",
    difficulty: "medium", topics: ["Array","Dynamic Programming"],
    companies: ["amazon","google","microsoft","swiggy"],
    description: `Given an integer array \`nums\`, find the **subarray** with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6",  explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]",                       output: "1" },
      { input: "nums = [5,4,-1,7,8]",             output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    hints: ["Try Kadane's algorithm","At each step decide: extend current subarray or start new one"],
    function_name: "maxSubArray",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Your code here
};`,
      python: `def maxSubArray(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
    }
}`,
      cpp: `int maxSubArray(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [-2,1,-3,4,-1,2,1,-5,4]", args:"[[-2,1,-3,4,-1,2,1,-5,4]]", expected:"6",  hidden:false },
      { id:2, input:"nums = [1]",                       args:"[[1]]",                     expected:"1",  hidden:false },
      { id:3, input:"nums = [5,4,-1,7,8]",             args:"[[5,4,-1,7,8]]",            expected:"23", hidden:true  },
      { id:4, input:"nums = [-1]",                      args:"[[-1]]",                    expected:"-1", hidden:true  },
      { id:5, input:"nums = [-2,-1]",                   args:"[[-2,-1]]",                 expected:"-1", hidden:true  },
      { id:6, input:"nums = [1,2,3,4,5]",              args:"[[1,2,3,4,5]]",             expected:"15", hidden:true  },
    ],
  },
  {
    id: "5", title: "Binary Search", slug: "binary-search",
    difficulty: "easy", topics: ["Array","Binary Search"],
    companies: ["tcs","infosys","wipro","amazon"],
    description: `Given an array of integers \`nums\` which is sorted in **ascending order**, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its **index**. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9",  output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2",  output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "All integers unique", "Sorted ascending"],
    hints: ["Use left and right pointers","mid = left + Math.floor((right-left)/2)"],
    function_name: "search",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Your code here
};`,
      python: `def search(nums, target):
    # Your code here
    pass`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `int search(vector<int>& nums, int target) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [-1,0,3,5,9,12], target = 9", args:"[[-1,0,3,5,9,12],9]",  expected:"4",  hidden:false },
      { id:2, input:"nums = [-1,0,3,5,9,12], target = 2", args:"[[-1,0,3,5,9,12],2]",  expected:"-1", hidden:false },
      { id:3, input:"nums = [5], target = 5",              args:"[[5],5]",               expected:"0",  hidden:true  },
      { id:4, input:"nums = [5], target = 3",              args:"[[5],3]",               expected:"-1", hidden:true  },
      { id:5, input:"nums = [1,3,5,7,9], target = 1",     args:"[[1,3,5,7,9],1]",       expected:"0",  hidden:true  },
      { id:6, input:"nums = [1,3,5,7,9], target = 9",     args:"[[1,3,5,7,9],9]",       expected:"4",  hidden:true  },
    ],
  },
  {
    id: "6", title: "Climbing Stairs", slug: "climbing-stairs",
    difficulty: "easy", topics: ["Dynamic Programming","Math"],
    companies: ["amazon","google","flipkart","tcs"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1 step + 1 step, or 2 steps" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    hints: ["This is Fibonacci!","dp[n] = dp[n-1] + dp[n-2]"],
    function_name: "climbStairs",
    starter_code: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // Your code here
};`,
      python: `def climbStairs(n):
    # Your code here
    pass`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Your code here
    }
}`,
      cpp: `int climbStairs(int n) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"n = 2",  args:"[2]",  expected:"2",   hidden:false },
      { id:2, input:"n = 3",  args:"[3]",  expected:"3",   hidden:false },
      { id:3, input:"n = 1",  args:"[1]",  expected:"1",   hidden:true  },
      { id:4, input:"n = 4",  args:"[4]",  expected:"5",   hidden:true  },
      { id:5, input:"n = 10", args:"[10]", expected:"89",  hidden:true  },
      { id:6, input:"n = 45", args:"[45]", expected:"1836311903", hidden:true },
    ],
  },
  {
    id: "7", title: "Contains Duplicate", slug: "contains-duplicate",
    difficulty: "easy", topics: ["Array","Hash Set"],
    companies: ["amazon","tcs","infosys"],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]",   output: "true" },
      { input: "nums = [1,2,3,4]",   output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    hints: ["Use a Set","If size of set < array length, there are duplicates"],
    function_name: "containsDuplicate",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Your code here
};`,
      python: `def containsDuplicate(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Your code here
    }
}`,
      cpp: `bool containsDuplicate(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [1,2,3,1]",   args:"[[1,2,3,1]]",   expected:"true",  hidden:false },
      { id:2, input:"nums = [1,2,3,4]",   args:"[[1,2,3,4]]",   expected:"false", hidden:false },
      { id:3, input:"nums = [1,1,1,3,3,4,3,2,4,2]", args:"[[1,1,1,3,3,4,3,2,4,2]]", expected:"true", hidden:true },
      { id:4, input:"nums = [1]",          args:"[[1]]",          expected:"false", hidden:true  },
      { id:5, input:"nums = []",           args:"[[]]",           expected:"false", hidden:true  },
      { id:6, input:"nums = [1,2,3,4,5,6,7,8,9,1]", args:"[[1,2,3,4,5,6,7,8,9,1]]", expected:"true", hidden:true },
    ],
  },
  {
    id: "8", title: "Best Time to Buy and Sell Stock", slug: "best-time-stock",
    difficulty: "easy", topics: ["Array","Dynamic Programming"],
    companies: ["amazon","google","flipkart","swiggy"],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the **maximum profit** you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5",  explanation: "Buy on day 2 (price=1), sell on day 5 (price=6)" },
      { input: "prices = [7,6,4,3,1]",   output: "0",  explanation: "No profitable transaction possible" },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    hints: ["Track minimum price seen so far","At each step profit = price - minPrice"],
    function_name: "maxProfit",
    starter_code: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    // Your code here
};`,
      python: `def maxProfit(prices):
    # Your code here
    pass`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
    }
}`,
      cpp: `int maxProfit(vector<int>& prices) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"prices = [7,1,5,3,6,4]", args:"[[7,1,5,3,6,4]]", expected:"5", hidden:false },
      { id:2, input:"prices = [7,6,4,3,1]",   args:"[[7,6,4,3,1]]",   expected:"0", hidden:false },
      { id:3, input:"prices = [1,2]",          args:"[[1,2]]",          expected:"1", hidden:true  },
      { id:4, input:"prices = [2,4,1]",        args:"[[2,4,1]]",        expected:"2", hidden:true  },
      { id:5, input:"prices = [1]",            args:"[[1]]",            expected:"0", hidden:true  },
      { id:6, input:"prices = [3,3,3,3,3]",   args:"[[3,3,3,3,3]]",   expected:"0", hidden:true  },
    ],
  },
  {
    id: "9", title: "Missing Number", slug: "missing-number",
    difficulty: "easy", topics: ["Array","Math","Bit Manipulation"],
    companies: ["tcs","wipro","amazon","microsoft"],
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is **missing** from the array.`,
    examples: [
      { input: "nums = [3,0,1]", output: "2" },
      { input: "nums = [0,1]",   output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 10⁴", "All nums distinct"],
    hints: ["Expected sum = n*(n+1)/2","Subtract actual sum from expected"],
    function_name: "missingNumber",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
    // Your code here
};`,
      python: `def missingNumber(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int missingNumber(int[] nums) {
        // Your code here
    }
}`,
      cpp: `int missingNumber(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [3,0,1]",             args:"[[3,0,1]]",             expected:"2", hidden:false },
      { id:2, input:"nums = [0,1]",               args:"[[0,1]]",               expected:"2", hidden:false },
      { id:3, input:"nums = [9,6,4,2,3,5,7,0,1]",args:"[[9,6,4,2,3,5,7,0,1]]",expected:"8", hidden:true  },
      { id:4, input:"nums = [0]",                 args:"[[0]]",                 expected:"1", hidden:true  },
      { id:5, input:"nums = [1]",                 args:"[[1]]",                 expected:"0", hidden:true  },
      { id:6, input:"nums = [0,2]",               args:"[[0,2]]",               expected:"1", hidden:true  },
    ],
  },
  {
    id: "10", title: "Fibonacci Number", slug: "fibonacci-number",
    difficulty: "easy", topics: ["Dynamic Programming","Recursion"],
    companies: ["tcs","infosys","wipro"],
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`:

\`F(0) = 0, F(1) = 1\`
\`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.

Given \`n\`, calculate \`F(n)\`.`,
    examples: [
      { input: "n = 2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1" },
      { input: "n = 3", output: "2", explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2" },
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3" },
    ],
    constraints: ["0 ≤ n ≤ 30"],
    hints: ["Memoize recursive calls","Or use bottom-up DP","Or just use two variables"],
    function_name: "fib",
    starter_code: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
    // Your code here
};`,
      python: `def fib(n):
    # Your code here
    pass`,
      java: `class Solution {
    public int fib(int n) {
        // Your code here
    }
}`,
      cpp: `int fib(int n) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"n = 2",  args:"[2]",  expected:"1",  hidden:false },
      { id:2, input:"n = 3",  args:"[3]",  expected:"2",  hidden:false },
      { id:3, input:"n = 0",  args:"[0]",  expected:"0",  hidden:true  },
      { id:4, input:"n = 1",  args:"[1]",  expected:"1",  hidden:true  },
      { id:5, input:"n = 10", args:"[10]", expected:"55", hidden:true  },
      { id:6, input:"n = 30", args:"[30]", expected:"832040", hidden:true },
    ],
  },
  {
    id: "11", title: "Single Number", slug: "single-number",
    difficulty: "easy", topics: ["Array","Bit Manipulation"],
    companies: ["amazon","tcs","google"],
    description: `Given a **non-empty** array of integers \`nums\`, every element appears **twice** except for one. Find that single one.

You must implement a solution with a **linear runtime complexity** and use only **constant extra space**.`,
    examples: [
      { input: "nums = [2,2,1]",       output: "1" },
      { input: "nums = [4,1,2,1,2]",   output: "4" },
      { input: "nums = [1]",           output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 3*10⁴", "Each element appears twice except one"],
    hints: ["XOR of same numbers is 0","XOR all elements — pairs cancel out"],
    function_name: "singleNumber",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
    // Your code here
};`,
      python: `def singleNumber(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        // Your code here
    }
}`,
      cpp: `int singleNumber(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [2,2,1]",     args:"[[2,2,1]]",     expected:"1", hidden:false },
      { id:2, input:"nums = [4,1,2,1,2]", args:"[[4,1,2,1,2]]", expected:"4", hidden:false },
      { id:3, input:"nums = [1]",         args:"[[1]]",         expected:"1", hidden:true  },
      { id:4, input:"nums = [0,1,0]",     args:"[[0,1,0]]",     expected:"1", hidden:true  },
      { id:5, input:"nums = [7,3,5,3,7]", args:"[[7,3,5,3,7]]", expected:"5", hidden:true  },
      { id:6, input:"nums = [100,200,100]",args:"[[100,200,100]]",expected:"200",hidden:true },
    ],
  },
  {
    id: "12", title: "Move Zeroes", slug: "move-zeroes",
    difficulty: "easy", topics: ["Array","Two Pointers"],
    companies: ["tcs","wipro","flipkart"],
    description: `Given an integer array \`nums\`, move all \`0\`'s to the **end** of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this **in-place** without making a copy of the array. Return the modified array.`,
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]",          output: "[0]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴"],
    hints: ["Use a slow pointer for non-zero position","Fast pointer scans entire array"],
    function_name: "moveZeroes",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]} - return the modified array
 */
function moveZeroes(nums) {
    // Your code here
    return nums;
};`,
      python: `def moveZeroes(nums):
    # Your code here - modify in place and return
    return nums`,
      java: `class Solution {
    public int[] moveZeroes(int[] nums) {
        // Your code here
        return nums;
    }
}`,
      cpp: `vector<int> moveZeroes(vector<int>& nums) {
    // Your code here
    return nums;
}`,
    },
    test_cases: [
      { id:1, input:"nums = [0,1,0,3,12]", args:"[[0,1,0,3,12]]", expected:"[1,3,12,0,0]", hidden:false },
      { id:2, input:"nums = [0]",           args:"[[0]]",           expected:"[0]",          hidden:false },
      { id:3, input:"nums = [1,0,0,2,3]",   args:"[[1,0,0,2,3]]",  expected:"[1,2,3,0,0]",  hidden:true  },
      { id:4, input:"nums = [1,2,3]",       args:"[[1,2,3]]",       expected:"[1,2,3]",      hidden:true  },
      { id:5, input:"nums = [0,0,1]",       args:"[[0,0,1]]",       expected:"[1,0,0]",      hidden:true  },
      { id:6, input:"nums = [4,2,0,1,0,3,0]",args:"[[4,2,0,1,0,3,0]]",expected:"[4,2,1,3,0,0,0]",hidden:true },
    ],
  },
  {
    id: "13", title: "Palindrome Number", slug: "palindrome-number",
    difficulty: "easy", topics: ["Math"],
    companies: ["tcs","infosys","wipro","microsoft"],
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a palindrome when it reads the same forward and backward.`,
    examples: [
      { input: "x = 121",  output: "true",  explanation: "121 reads as 121 from left to right and right to left" },
      { input: "x = -121", output: "false", explanation: "From left: -121. From right: 121-. Not palindrome." },
      { input: "x = 10",   output: "false", explanation: "Reads as 01 from right. Not palindrome." },
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    hints: ["Negative numbers are never palindromes","Convert to string and check"],
    function_name: "isPalindrome",
    starter_code: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Your code here
};`,
      python: `def isPalindrome(x):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
    }
}`,
      cpp: `bool isPalindrome(int x) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"x = 121",   args:"[121]",   expected:"true",  hidden:false },
      { id:2, input:"x = -121",  args:"[-121]",  expected:"false", hidden:false },
      { id:3, input:"x = 10",    args:"[10]",    expected:"false", hidden:true  },
      { id:4, input:"x = 0",     args:"[0]",     expected:"true",  hidden:true  },
      { id:5, input:"x = 1221",  args:"[1221]",  expected:"true",  hidden:true  },
      { id:6, input:"x = 12321", args:"[12321]", expected:"true",  hidden:true  },
    ],
  },
  {
    id: "14", title: "Majority Element", slug: "majority-element",
    difficulty: "easy", topics: ["Array","Hash Map","Sorting"],
    companies: ["amazon","tcs","infosys","microsoft"],
    description: `Given an array \`nums\` of size \`n\`, return the **majority element**.

The majority element is the element that appears **more than** \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.`,
    examples: [
      { input: "nums = [3,2,3]",           output: "3" },
      { input: "nums = [2,2,1,1,1,2,2]",   output: "2" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 5*10⁴", "Majority always exists"],
    hints: ["Boyer-Moore Voting Algorithm","Count +1 for candidate, -1 for others"],
    function_name: "majorityElement",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
    // Your code here
};`,
      python: `def majorityElement(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int majorityElement(int[] nums) {
        // Your code here
    }
}`,
      cpp: `int majorityElement(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [3,2,3]",           args:"[[3,2,3]]",           expected:"3", hidden:false },
      { id:2, input:"nums = [2,2,1,1,1,2,2]",   args:"[[2,2,1,1,1,2,2]]",  expected:"2", hidden:false },
      { id:3, input:"nums = [1]",               args:"[[1]]",               expected:"1", hidden:true  },
      { id:4, input:"nums = [1,1,2]",           args:"[[1,1,2]]",           expected:"1", hidden:true  },
      { id:5, input:"nums = [5,5,5,1,1]",       args:"[[5,5,5,1,1]]",       expected:"5", hidden:true  },
      { id:6, input:"nums = [6,5,5]",           args:"[[6,5,5]]",           expected:"5", hidden:true  },
    ],
  },
  {
    id: "15", title: "Power of Two", slug: "power-of-two",
    difficulty: "easy", topics: ["Math","Bit Manipulation"],
    companies: ["tcs","wipro","infosys"],
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.

An integer \`n\` is a power of two, if there exists an integer \`x\` such that \`n == 2ˣ\`.`,
    examples: [
      { input: "n = 1",  output: "true",  explanation: "2⁰ = 1" },
      { input: "n = 16", output: "true",  explanation: "2⁴ = 16" },
      { input: "n = 3",  output: "false" },
    ],
    constraints: ["-2³¹ ≤ n ≤ 2³¹ - 1"],
    hints: ["n & (n-1) == 0 for powers of 2","n must also be > 0"],
    function_name: "isPowerOfTwo",
    starter_code: {
      javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n) {
    // Your code here
};`,
      python: `def isPowerOfTwo(n):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        // Your code here
    }
}`,
      cpp: `bool isPowerOfTwo(int n) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"n = 1",  args:"[1]",  expected:"true",  hidden:false },
      { id:2, input:"n = 16", args:"[16]", expected:"true",  hidden:false },
      { id:3, input:"n = 3",  args:"[3]",  expected:"false", hidden:true  },
      { id:4, input:"n = 0",  args:"[0]",  expected:"false", hidden:true  },
      { id:5, input:"n = -1", args:"[-1]", expected:"false", hidden:true  },
      { id:6, input:"n = 64", args:"[64]", expected:"true",  hidden:true  },
    ],
  },
  // ── MEDIUM PROBLEMS ──────────────────────────────────────────────────────
  {
    id: "16", title: "3Sum", slug: "three-sum",
    difficulty: "medium", topics: ["Array","Two Pointers","Sorting"],
    companies: ["amazon","google","microsoft","flipkart"],
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

The solution set must not contain duplicate triplets. Return them in sorted order.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]",           output: "[]" },
      { input: "nums = [0,0,0]",           output: "[[0,0,0]]" },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000"],
    hints: ["Sort first","Fix one element, use two pointers for rest","Skip duplicates"],
    function_name: "threeSum",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    // Your code here
};`,
      python: `def threeSum(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Your code here
    }
}`,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [-1,0,1,2,-1,-4]", args:"[[-1,0,1,2,-1,-4]]", expected:"[[-1,-1,2],[-1,0,1]]", hidden:false },
      { id:2, input:"nums = [0,1,1]",           args:"[[0,1,1]]",          expected:"[]",                   hidden:false },
      { id:3, input:"nums = [0,0,0]",           args:"[[0,0,0]]",          expected:"[[0,0,0]]",            hidden:true  },
      { id:4, input:"nums = [-2,0,0,2,2]",      args:"[[-2,0,0,2,2]]",    expected:"[[-2,0,2]]",           hidden:true  },
      { id:5, input:"nums = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]", args:"[[-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]]", expected:"[[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]", hidden:true },
      { id:6, input:"nums = [1,2,-2,-1]",       args:"[[1,2,-2,-1]]",      expected:"[]",                   hidden:true  },
    ],
  },
  {
    id: "17", title: "Container With Most Water", slug: "container-with-most-water",
    difficulty: "medium", topics: ["Array","Two Pointers","Greedy"],
    companies: ["amazon","google","microsoft"],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the **most water**.

Return the maximum amount of water a container can store.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Lines at index 1(h=8) and 8(h=7) form max area" },
      { input: "height = [1,1]",                 output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    hints: ["Two pointers from both ends","Move pointer with smaller height inward"],
    function_name: "maxArea",
    starter_code: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Your code here
};`,
      python: `def maxArea(height):
    # Your code here
    pass`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
    }
}`,
      cpp: `int maxArea(vector<int>& height) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"height = [1,8,6,2,5,4,8,3,7]", args:"[[1,8,6,2,5,4,8,3,7]]", expected:"49", hidden:false },
      { id:2, input:"height = [1,1]",                 args:"[[1,1]]",                expected:"1",  hidden:false },
      { id:3, input:"height = [4,3,2,1,4]",          args:"[[4,3,2,1,4]]",          expected:"16", hidden:true  },
      { id:4, input:"height = [1,2,1]",               args:"[[1,2,1]]",               expected:"2",  hidden:true  },
      { id:5, input:"height = [2,3,4,5,18,17,6]",    args:"[[2,3,4,5,18,17,6]]",    expected:"17", hidden:true  },
      { id:6, input:"height = [1,3,2,5,25,24,5]",    args:"[[1,3,2,5,25,24,5]]",    expected:"24", hidden:true  },
    ],
  },
  {
    id: "18", title: "House Robber", slug: "house-robber",
    difficulty: "medium", topics: ["Dynamic Programming","Array"],
    companies: ["amazon","google","microsoft","tcs"],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that **adjacent houses have security systems** connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array \`nums\` representing the amount of money of each house, return the **maximum amount** of money you can rob tonight without alerting the police.`,
    examples: [
      { input: "nums = [1,2,3,1]",   output: "4", explanation: "Rob house 1 (1) then house 3 (3)" },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1 (2), house 3 (9), house 5 (1)" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    hints: ["dp[i] = max(dp[i-1], dp[i-2]+nums[i])","Only need two previous values"],
    function_name: "rob",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    // Your code here
};`,
      python: `def rob(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int rob(int[] nums) {
        // Your code here
    }
}`,
      cpp: `int rob(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [1,2,3,1]",   args:"[[1,2,3,1]]",   expected:"4",  hidden:false },
      { id:2, input:"nums = [2,7,9,3,1]", args:"[[2,7,9,3,1]]", expected:"12", hidden:false },
      { id:3, input:"nums = [1]",         args:"[[1]]",         expected:"1",  hidden:true  },
      { id:4, input:"nums = [2,1]",       args:"[[2,1]]",       expected:"2",  hidden:true  },
      { id:5, input:"nums = [0,0,0,0]",   args:"[[0,0,0,0]]",   expected:"0",  hidden:true  },
      { id:6, input:"nums = [5,3,4,11,2]",args:"[[5,3,4,11,2]]",expected:"16", hidden:true  },
    ],
  },
  {
    id: "19", title: "Coin Change", slug: "coin-change",
    difficulty: "medium", topics: ["Dynamic Programming","BFS"],
    companies: ["amazon","google","flipkart","microsoft"],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an **infinite number** of each kind of coin.`,
    examples: [
      { input: "coins = [1,5,11], amount = 11", output: "1",  explanation: "Just one coin of 11" },
      { input: "coins = [2], amount = 3",        output: "-1", explanation: "Cannot make 3 from coins of 2" },
      { input: "coins = [1,2,5], amount = 11",   output: "3",  explanation: "11 = 5+5+1" },
    ],
    constraints: ["1 ≤ coins.length ≤ 12", "0 ≤ amount ≤ 10⁴"],
    hints: ["dp[amount] = min coins to reach amount","dp[i] = 1 + min(dp[i-coin]) for each coin"],
    function_name: "coinChange",
    starter_code: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    // Your code here
};`,
      python: `def coinChange(coins, amount):
    # Your code here
    pass`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Your code here
    }
}`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"coins = [1,5,11], amount = 11", args:"[[1,5,11],11]", expected:"1",  hidden:false },
      { id:2, input:"coins = [2], amount = 3",        args:"[[2],3]",       expected:"-1", hidden:false },
      { id:3, input:"coins = [1,2,5], amount = 11",   args:"[[1,2,5],11]",  expected:"3",  hidden:true  },
      { id:4, input:"coins = [1], amount = 0",        args:"[[1],0]",       expected:"0",  hidden:true  },
      { id:5, input:"coins = [1], amount = 1",        args:"[[1],1]",       expected:"1",  hidden:true  },
      { id:6, input:"coins = [186,419,83,408], amount = 6249", args:"[[186,419,83,408],6249]", expected:"20", hidden:true },
    ],
  },
  {
    id: "20", title: "Product of Array Except Self", slug: "product-array-except-self",
    difficulty: "medium", topics: ["Array","Prefix Sum"],
    companies: ["amazon","google","microsoft","flipkart"],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and **without using the division** operation.`,
    examples: [
      { input: "nums = [1,2,3,4]",       output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]",   output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "No division allowed"],
    hints: ["Left pass: product of all elements to left","Right pass: multiply with product of all to right"],
    function_name: "productExceptSelf",
    starter_code: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    // Your code here
};`,
      python: `def productExceptSelf(nums):
    # Your code here
    pass`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Your code here
    }
}`,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    // Your code here
}`,
    },
    test_cases: [
      { id:1, input:"nums = [1,2,3,4]",     args:"[[1,2,3,4]]",     expected:"[24,12,8,6]", hidden:false },
      { id:2, input:"nums = [-1,1,0,-3,3]", args:"[[-1,1,0,-3,3]]", expected:"[0,0,9,0,0]", hidden:false },
      { id:3, input:"nums = [2,3]",         args:"[[2,3]]",         expected:"[3,2]",        hidden:true  },
      { id:4, input:"nums = [1,0]",         args:"[[1,0]]",         expected:"[0,1]",        hidden:true  },
      { id:5, input:"nums = [1,1,1,1]",     args:"[[1,1,1,1]]",     expected:"[1,1,1,1]",   hidden:true  },
      { id:6, input:"nums = [2,2,2,2]",     args:"[[2,2,2,2]]",     expected:"[8,8,8,8]",   hidden:true  },
    ],
  },
]