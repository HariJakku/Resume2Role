import { CodingProblem } from "@/types"

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id:"1", title:"Two Sum", slug:"two-sum", difficulty:"easy",
    topics:["Array","Hash Map"], companies:["amazon","google","microsoft","flipkart","tcs"],
    description:"Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to target. Each input has exactly one solution.",
    examples:[{input:"nums=[2,7,11,15], target=9",output:"[0,1]",explanation:"nums[0]+nums[1]=9"},{input:"nums=[3,2,4], target=6",output:"[1,2]"}],
    constraints:["2≤nums.length≤10⁴","Only one valid answer"],
    hints:["Use a hash map","For each num check if target-num exists in map"],
    starter_code:{javascript:"function twoSum(nums, target) {\n  \n}",python:"def two_sum(nums, target):\n    pass",java:"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",cpp:"vector<int> twoSum(vector<int>& nums, int target) {\n    \n}"},
    test_cases:[{input:"[2,7,11,15]\n9",expected_output:"[0,1]",is_hidden:false},{input:"[3,2,4]\n6",expected_output:"[1,2]",is_hidden:false},{input:"[3,3]\n6",expected_output:"[0,1]",is_hidden:true}]
  },
  {
    id:"2", title:"Valid Parentheses", slug:"valid-parentheses", difficulty:"easy",
    topics:["Stack","String"], companies:["amazon","google","microsoft","infosys"],
    description:"Given string s with characters '(', ')', '{', '}', '[', ']', determine if input is valid. Open brackets must be closed by same type in correct order.",
    examples:[{input:'s="()"',output:"true"},{input:'s="()[]{}"',output:"true"},{input:'s="(]"',output:"false"}],
    constraints:["1≤s.length≤10⁴","Only parentheses characters"],
    hints:["Use a stack","Push opening, pop and compare for closing"],
    starter_code:{javascript:"function isValid(s) {\n  \n}",python:"def is_valid(s):\n    pass",java:"class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",cpp:"bool isValid(string s) {\n    \n}"},
    test_cases:[{input:"()",expected_output:"true",is_hidden:false},{input:"()[]{}",expected_output:"true",is_hidden:false},{input:"(]",expected_output:"false",is_hidden:true}]
  },
  {
    id:"3", title:"Reverse Linked List", slug:"reverse-linked-list", difficulty:"easy",
    topics:["Linked List","Recursion"], companies:["amazon","flipkart","tcs","microsoft"],
    description:"Given the head of a singly linked list, reverse it and return the reversed list.",
    examples:[{input:"head=[1,2,3,4,5]",output:"[5,4,3,2,1]"},{input:"head=[1,2]",output:"[2,1]"}],
    constraints:["0≤nodes≤5000","-5000≤Node.val≤5000"],
    hints:["Track prev, curr, next pointers","Iterative is simpler than recursive"],
    starter_code:{javascript:"function reverseList(head) {\n  \n}",python:"def reverse_list(head):\n    pass",java:"class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}",cpp:"ListNode* reverseList(ListNode* head) {\n    \n}"},
    test_cases:[{input:"[1,2,3,4,5]",expected_output:"[5,4,3,2,1]",is_hidden:false},{input:"[1,2]",expected_output:"[2,1]",is_hidden:true}]
  },
  {
    id:"4", title:"Maximum Subarray", slug:"maximum-subarray", difficulty:"medium",
    topics:["Array","Dynamic Programming"], companies:["amazon","google","microsoft","swiggy"],
    description:"Given integer array nums, find the subarray with largest sum and return its sum.",
    examples:[{input:"nums=[-2,1,-3,4,-1,2,1,-5,4]",output:"6",explanation:"[4,-1,2,1] has sum 6"},{input:"nums=[1]",output:"1"}],
    constraints:["1≤nums.length≤10⁵","-10⁴≤nums[i]≤10⁴"],
    hints:["Kadane's algorithm","At each step: extend or start new subarray"],
    starter_code:{javascript:"function maxSubArray(nums) {\n  \n}",python:"def max_sub_array(nums):\n    pass",java:"class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",cpp:"int maxSubArray(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[-2,1,-3,4,-1,2,1,-5,4]",expected_output:"6",is_hidden:false},{input:"[1]",expected_output:"1",is_hidden:false},{input:"[5,4,-1,7,8]",expected_output:"23",is_hidden:true}]
  },
  {
    id:"5", title:"Binary Search", slug:"binary-search", difficulty:"easy",
    topics:["Array","Binary Search"], companies:["tcs","infosys","wipro","amazon"],
    description:"Given sorted array nums and target, return index of target or -1 if not found.",
    examples:[{input:"nums=[-1,0,3,5,9,12], target=9",output:"4"},{input:"nums=[-1,0,3,5,9,12], target=2",output:"-1"}],
    constraints:["1≤nums.length≤10⁴","All integers unique","Sorted ascending"],
    hints:["left + (right-left)/2 to avoid overflow","Shrink window based on comparison"],
    starter_code:{javascript:"function search(nums, target) {\n  \n}",python:"def search(nums, target):\n    pass",java:"class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",cpp:"int search(vector<int>& nums, int target) {\n    \n}"},
    test_cases:[{input:"[-1,0,3,5,9,12]\n9",expected_output:"4",is_hidden:false},{input:"[-1,0,3,5,9,12]\n2",expected_output:"-1",is_hidden:true}]
  },
  {
    id:"6", title:"Merge Two Sorted Lists", slug:"merge-two-sorted-lists", difficulty:"easy",
    topics:["Linked List","Recursion"], companies:["amazon","microsoft","google"],
    description:"Merge two sorted linked lists and return as one sorted list.",
    examples:[{input:"list1=[1,2,4], list2=[1,3,4]",output:"[1,1,2,3,4,4]"},{input:"list1=[], list2=[]",output:"[]"}],
    constraints:["0≤nodes≤50","-100≤Node.val≤100"],
    hints:["Use a dummy head","Compare and advance smaller pointer"],
    starter_code:{javascript:"function mergeTwoLists(l1, l2) {\n  \n}",python:"def merge_two_lists(l1, l2):\n    pass",java:"class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        \n    }\n}",cpp:"ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    \n}"},
    test_cases:[{input:"[1,2,4]\n[1,3,4]",expected_output:"[1,1,2,3,4,4]",is_hidden:false},{input:"[]\n[]",expected_output:"[]",is_hidden:true}]
  },
  {
    id:"7", title:"Climbing Stairs", slug:"climbing-stairs", difficulty:"easy",
    topics:["Dynamic Programming","Math"], companies:["amazon","google","flipkart","tcs"],
    description:"You climb a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways to reach the top?",
    examples:[{input:"n=2",output:"2",explanation:"1+1 or 2"},{input:"n=3",output:"3",explanation:"1+1+1, 1+2, 2+1"}],
    constraints:["1≤n≤45"],
    hints:["This is Fibonacci!","dp[n] = dp[n-1] + dp[n-2]"],
    starter_code:{javascript:"function climbStairs(n) {\n  \n}",python:"def climb_stairs(n):\n    pass",java:"class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",cpp:"int climbStairs(int n) {\n    \n}"},
    test_cases:[{input:"2",expected_output:"2",is_hidden:false},{input:"3",expected_output:"3",is_hidden:false},{input:"10",expected_output:"89",is_hidden:true}]
  },
  {
    id:"8", title:"Best Time to Buy and Sell Stock", slug:"best-time-stock", difficulty:"easy",
    topics:["Array","Dynamic Programming"], companies:["amazon","google","flipkart","swiggy"],
    description:"Given prices array where prices[i] is price on day i, find maximum profit from one buy-sell. Return 0 if no profit possible.",
    examples:[{input:"prices=[7,1,5,3,6,4]",output:"5",explanation:"Buy at 1, sell at 6"},{input:"prices=[7,6,4,3,1]",output:"0"}],
    constraints:["1≤prices.length≤10⁵","0≤prices[i]≤10⁴"],
    hints:["Track minimum price seen so far","At each step profit = price - minPrice"],
    starter_code:{javascript:"function maxProfit(prices) {\n  \n}",python:"def max_profit(prices):\n    pass",java:"class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",cpp:"int maxProfit(vector<int>& prices) {\n    \n}"},
    test_cases:[{input:"[7,1,5,3,6,4]",expected_output:"5",is_hidden:false},{input:"[7,6,4,3,1]",expected_output:"0",is_hidden:false}]
  },
  {
    id:"9", title:"Palindrome Number", slug:"palindrome-number", difficulty:"easy",
    topics:["Math"], companies:["tcs","infosys","wipro","microsoft"],
    description:"Given integer x, return true if x is a palindrome (reads same forwards and backwards).",
    examples:[{input:"x=121",output:"true"},{input:"x=-121",output:"false"},{input:"x=10",output:"false"}],
    constraints:["-2³¹≤x≤2³¹-1"],
    hints:["Negative numbers are never palindromes","Reverse the number and compare"],
    starter_code:{javascript:"function isPalindrome(x) {\n  \n}",python:"def is_palindrome(x):\n    pass",java:"class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}",cpp:"bool isPalindrome(int x) {\n    \n}"},
    test_cases:[{input:"121",expected_output:"true",is_hidden:false},{input:"-121",expected_output:"false",is_hidden:false},{input:"10",expected_output:"false",is_hidden:true}]
  },
  {
    id:"10", title:"Fibonacci Number", slug:"fibonacci-number", difficulty:"easy",
    topics:["Dynamic Programming","Recursion"], companies:["tcs","infosys","wipro"],
    description:"F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1. Given n, return F(n).",
    examples:[{input:"n=2",output:"1"},{input:"n=3",output:"2"},{input:"n=4",output:"3"}],
    constraints:["0≤n≤30"],
    hints:["Memoization avoids redundant calls","Bottom-up is O(n) time O(1) space"],
    starter_code:{javascript:"function fib(n) {\n  \n}",python:"def fib(n):\n    pass",java:"class Solution {\n    public int fib(int n) {\n        \n    }\n}",cpp:"int fib(int n) {\n    \n}"},
    test_cases:[{input:"2",expected_output:"1",is_hidden:false},{input:"3",expected_output:"2",is_hidden:false},{input:"10",expected_output:"55",is_hidden:true}]
  },
  {
    id:"11", title:"Contains Duplicate", slug:"contains-duplicate", difficulty:"easy",
    topics:["Array","Hash Set"], companies:["amazon","tcs","infosys"],
    description:"Given integer array nums, return true if any value appears at least twice.",
    examples:[{input:"nums=[1,2,3,1]",output:"true"},{input:"nums=[1,2,3,4]",output:"false"}],
    constraints:["1≤nums.length≤10⁵"],
    hints:["Use a Set","If element already in set, return true"],
    starter_code:{javascript:"function containsDuplicate(nums) {\n  \n}",python:"def contains_duplicate(nums):\n    pass",java:"class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}",cpp:"bool containsDuplicate(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,2,3,1]",expected_output:"true",is_hidden:false},{input:"[1,2,3,4]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"12", title:"Missing Number", slug:"missing-number", difficulty:"easy",
    topics:["Array","Math","Bit Manipulation"], companies:["tcs","wipro","amazon","microsoft"],
    description:"Given array nums with n distinct numbers in range [0,n], return the only number in range missing.",
    examples:[{input:"nums=[3,0,1]",output:"2"},{input:"nums=[0,1]",output:"2"}],
    constraints:["n==nums.length","0≤nums[i]≤n","All nums distinct"],
    hints:["Expected sum = n*(n+1)/2","Subtract actual sum from expected"],
    starter_code:{javascript:"function missingNumber(nums) {\n  \n}",python:"def missing_number(nums):\n    pass",java:"class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}",cpp:"int missingNumber(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[3,0,1]",expected_output:"2",is_hidden:false},{input:"[0,1]",expected_output:"2",is_hidden:false},{input:"[9,6,4,2,3,5,7,0,1]",expected_output:"8",is_hidden:true}]
  },
  {
    id:"13", title:"Reverse String", slug:"reverse-string", difficulty:"easy",
    topics:["String","Two Pointers"], companies:["tcs","infosys","wipro"],
    description:"Write function that reverses a string. Input is array of characters. Do it in-place with O(1) extra memory.",
    examples:[{input:'s=["h","e","l","l","o"]',output:'["o","l","l","e","h"]'}],
    constraints:["1≤s.length≤10⁵","s[i] is a printable ASCII character"],
    hints:["Two pointers from both ends","Swap characters and move inward"],
    starter_code:{javascript:"function reverseString(s) {\n  \n}",python:"def reverse_string(s):\n    pass",java:"class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}",cpp:"void reverseString(vector<char>& s) {\n    \n}"},
    test_cases:[{input:'["h","e","l","l","o"]',expected_output:'["o","l","l","e","h"]',is_hidden:false}]
  },
  {
    id:"14", title:"Count Primes", slug:"count-primes", difficulty:"medium",
    topics:["Math","Number Theory"], companies:["google","microsoft","amazon"],
    description:"Given integer n, return number of prime numbers strictly less than n.",
    examples:[{input:"n=10",output:"4",explanation:"2,3,5,7"},{input:"n=0",output:"0"}],
    constraints:["0≤n≤5*10⁶"],
    hints:["Sieve of Eratosthenes","Mark multiples of each prime as not prime"],
    starter_code:{javascript:"function countPrimes(n) {\n  \n}",python:"def count_primes(n):\n    pass",java:"class Solution {\n    public int countPrimes(int n) {\n        \n    }\n}",cpp:"int countPrimes(int n) {\n    \n}"},
    test_cases:[{input:"10",expected_output:"4",is_hidden:false},{input:"0",expected_output:"0",is_hidden:false},{input:"1",expected_output:"0",is_hidden:true}]
  },
  {
    id:"15", title:"Maximum Depth of Binary Tree", slug:"max-depth-binary-tree", difficulty:"easy",
    topics:["Tree","DFS","BFS"], companies:["amazon","google","flipkart","microsoft"],
    description:"Given root of binary tree, return its maximum depth (number of nodes along longest path from root to farthest leaf).",
    examples:[{input:"root=[3,9,20,null,null,15,7]",output:"3"},{input:"root=[1,null,2]",output:"2"}],
    constraints:["0≤nodes≤10⁴","-100≤Node.val≤100"],
    hints:["DFS: return 1 + max(left, right)","BFS: count levels"],
    starter_code:{javascript:"function maxDepth(root) {\n  \n}",python:"def max_depth(root):\n    pass",java:"class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}",cpp:"int maxDepth(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[3,9,20,null,null,15,7]",expected_output:"3",is_hidden:false},{input:"[1,null,2]",expected_output:"2",is_hidden:true}]
  },
  {
    id:"16", title:"Symmetric Tree", slug:"symmetric-tree", difficulty:"easy",
    topics:["Tree","DFS","BFS"], companies:["amazon","microsoft","tcs"],
    description:"Given root of binary tree, check whether it is a mirror of itself (symmetric around center).",
    examples:[{input:"root=[1,2,2,3,4,4,3]",output:"true"},{input:"root=[1,2,2,null,3,null,3]",output:"false"}],
    constraints:["1≤nodes≤1000","-100≤Node.val≤100"],
    hints:["Compare left.left with right.right","Compare left.right with right.left"],
    starter_code:{javascript:"function isSymmetric(root) {\n  \n}",python:"def is_symmetric(root):\n    pass",java:"class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        \n    }\n}",cpp:"bool isSymmetric(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[1,2,2,3,4,4,3]",expected_output:"true",is_hidden:false},{input:"[1,2,2,null,3,null,3]",expected_output:"false",is_hidden:true}]
  },
  {
    id:"17", title:"Invert Binary Tree", slug:"invert-binary-tree", difficulty:"easy",
    topics:["Tree","DFS","BFS"], companies:["google","amazon","microsoft"],
    description:"Given root of binary tree, invert the tree, and return its root.",
    examples:[{input:"root=[4,2,7,1,3,6,9]",output:"[4,7,2,9,6,3,1]"}],
    constraints:["0≤nodes≤100","-100≤Node.val≤100"],
    hints:["Swap left and right children at each node","Recurse on children after swapping"],
    starter_code:{javascript:"function invertTree(root) {\n  \n}",python:"def invert_tree(root):\n    pass",java:"class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}",cpp:"TreeNode* invertTree(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[4,2,7,1,3,6,9]",expected_output:"[4,7,2,9,6,3,1]",is_hidden:false}]
  },
  {
    id:"18", title:"Majority Element", slug:"majority-element", difficulty:"easy",
    topics:["Array","Hash Map","Sorting"], companies:["amazon","tcs","infosys","microsoft"],
    description:"Given array nums of size n, return the majority element. The majority element appears more than ⌊n/2⌋ times.",
    examples:[{input:"nums=[3,2,3]",output:"3"},{input:"nums=[2,2,1,1,1,2,2]",output:"2"}],
    constraints:["n==nums.length","1≤n≤5*10⁴","Majority always exists"],
    hints:["Boyer-Moore Voting Algorithm","Count +1 for current candidate, -1 for others"],
    starter_code:{javascript:"function majorityElement(nums) {\n  \n}",python:"def majority_element(nums):\n    pass",java:"class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}",cpp:"int majorityElement(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[3,2,3]",expected_output:"3",is_hidden:false},{input:"[2,2,1,1,1,2,2]",expected_output:"2",is_hidden:false}]
  },
  {
    id:"19", title:"Move Zeroes", slug:"move-zeroes", difficulty:"easy",
    topics:["Array","Two Pointers"], companies:["tcs","wipro","flipkart"],
    description:"Given integer array nums, move all 0s to end while maintaining relative order of non-zero elements. Do in-place.",
    examples:[{input:"nums=[0,1,0,3,12]",output:"[1,3,12,0,0]"},{input:"nums=[0]",output:"[0]"}],
    constraints:["1≤nums.length≤10⁴"],
    hints:["Use a slow pointer for non-zero position","Fast pointer scans entire array"],
    starter_code:{javascript:"function moveZeroes(nums) {\n  \n}",python:"def move_zeroes(nums):\n    pass",java:"class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}",cpp:"void moveZeroes(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[0,1,0,3,12]",expected_output:"[1,3,12,0,0]",is_hidden:false}]
  },
  {
    id:"20", title:"Product of Array Except Self", slug:"product-array-except-self", difficulty:"medium",
    topics:["Array","Prefix Sum"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given integer array nums, return array answer such that answer[i] equals product of all elements except nums[i]. Without division, in O(n).",
    examples:[{input:"nums=[1,2,3,4]",output:"[24,12,8,6]"},{input:"nums=[-1,1,0,-3,3]",output:"[0,0,9,0,0]"}],
    constraints:["2≤nums.length≤10⁵","No division allowed"],
    hints:["Left pass: product of all elements to the left","Right pass: multiply with product of all elements to the right"],
    starter_code:{javascript:"function productExceptSelf(nums) {\n  \n}",python:"def product_except_self(nums):\n    pass",java:"class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}",cpp:"vector<int> productExceptSelf(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,2,3,4]",expected_output:"[24,12,8,6]",is_hidden:false},{input:"[-1,1,0,-3,3]",expected_output:"[0,0,9,0,0]",is_hidden:true}]
  },
  {
    id:"21", title:"3Sum", slug:"three-sum", difficulty:"medium",
    topics:["Array","Two Pointers","Sorting"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given integer array nums, return all unique triplets [nums[i],nums[j],nums[k]] such that i≠j≠k and nums[i]+nums[j]+nums[k]==0.",
    examples:[{input:"nums=[-1,0,1,2,-1,-4]",output:"[[-1,-1,2],[-1,0,1]]"},{input:"nums=[0,1,1]",output:"[]"}],
    constraints:["3≤nums.length≤3000"],
    hints:["Sort first","Fix one element, use two pointers for rest"],
    starter_code:{javascript:"function threeSum(nums) {\n  \n}",python:"def three_sum(nums):\n    pass",java:"class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}",cpp:"vector<vector<int>> threeSum(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[-1,0,1,2,-1,-4]",expected_output:"[[-1,-1,2],[-1,0,1]]",is_hidden:false}]
  },
  {
    id:"22", title:"Container With Most Water", slug:"container-with-most-water", difficulty:"medium",
    topics:["Array","Two Pointers","Greedy"], companies:["amazon","google","microsoft"],
    description:"Given n non-negative integers representing heights, find two lines that together form a container with most water.",
    examples:[{input:"height=[1,8,6,2,5,4,8,3,7]",output:"49"}],
    constraints:["n==height.length","2≤n≤10⁵"],
    hints:["Two pointers from ends","Move pointer with smaller height inward"],
    starter_code:{javascript:"function maxArea(height) {\n  \n}",python:"def max_area(height):\n    pass",java:"class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}",cpp:"int maxArea(vector<int>& height) {\n    \n}"},
    test_cases:[{input:"[1,8,6,2,5,4,8,3,7]",expected_output:"49",is_hidden:false}]
  },
  {
    id:"23", title:"Longest Common Prefix", slug:"longest-common-prefix", difficulty:"easy",
    topics:["String"], companies:["tcs","infosys","wipro","amazon"],
    description:"Write a function to find the longest common prefix string amongst an array of strings. Return empty string if no common prefix.",
    examples:[{input:'strs=["flower","flow","flight"]',output:'"fl"'},{input:'strs=["dog","racecar","car"]',output:'""'}],
    constraints:["1≤strs.length≤200","0≤strs[i].length≤200"],
    hints:["Take first string as reference","Compare character by character with all strings"],
    starter_code:{javascript:"function longestCommonPrefix(strs) {\n  \n}",python:"def longest_common_prefix(strs):\n    pass",java:"class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}",cpp:"string longestCommonPrefix(vector<string>& strs) {\n    \n}"},
    test_cases:[{input:'["flower","flow","flight"]',expected_output:'"fl"',is_hidden:false}]
  },
  {
    id:"24", title:"Valid Anagram", slug:"valid-anagram", difficulty:"easy",
    topics:["String","Hash Map","Sorting"], companies:["amazon","tcs","google","microsoft"],
    description:"Given strings s and t, return true if t is an anagram of s.",
    examples:[{input:'s="anagram", t="nagaram"',output:"true"},{input:'s="rat", t="car"',output:"false"}],
    constraints:["1≤s.length,t.length≤5*10⁴","Only lowercase letters"],
    hints:["Count character frequencies","Use an array of size 26 for lowercase letters"],
    starter_code:{javascript:"function isAnagram(s, t) {\n  \n}",python:"def is_anagram(s, t):\n    pass",java:"class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}",cpp:"bool isAnagram(string s, string t) {\n    \n}"},
    test_cases:[{input:"anagram\nnagaram",expected_output:"true",is_hidden:false},{input:"rat\ncar",expected_output:"false",is_hidden:false}]
  },
  {
    id:"25", title:"Group Anagrams", slug:"group-anagrams", difficulty:"medium",
    topics:["String","Hash Map","Sorting"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given array of strings strs, group the anagrams together.",
    examples:[{input:'strs=["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],
    constraints:["1≤strs.length≤10⁴","0≤strs[i].length≤100"],
    hints:["Sort each string as the key","Group strings with same sorted key"],
    starter_code:{javascript:"function groupAnagrams(strs) {\n  \n}",python:"def group_anagrams(strs):\n    pass",java:"class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}",cpp:"vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    \n}"},
    test_cases:[{input:'["eat","tea","tan","ate","nat","bat"]',expected_output:'[["bat"],["nat","tan"],["ate","eat","tea"]]',is_hidden:false}]
  },
  {
    id:"26", title:"Top K Frequent Elements", slug:"top-k-frequent", difficulty:"medium",
    topics:["Array","Hash Map","Heap"], companies:["amazon","google","microsoft"],
    description:"Given integer array nums and integer k, return the k most frequent elements.",
    examples:[{input:"nums=[1,1,1,2,2,3], k=2",output:"[1,2]"},{input:"nums=[1], k=1",output:"[1]"}],
    constraints:["1≤nums.length≤10⁵","Answer is unique"],
    hints:["Count frequencies with hash map","Use min-heap of size k or bucket sort"],
    starter_code:{javascript:"function topKFrequent(nums, k) {\n  \n}",python:"def top_k_frequent(nums, k):\n    pass",java:"class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}",cpp:"vector<int> topKFrequent(vector<int>& nums, int k) {\n    \n}"},
    test_cases:[{input:"[1,1,1,2,2,3]\n2",expected_output:"[1,2]",is_hidden:false}]
  },
  {
    id:"27", title:"Number of Islands", slug:"number-of-islands", difficulty:"medium",
    topics:["Graph","DFS","BFS","Matrix"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given m×n grid of '1's (land) and '0's (water), count number of islands.",
    examples:[{input:"grid=[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]",output:"1"}],
    constraints:["m,n≥1","grid[i][j] is '0' or '1'"],
    hints:["DFS from each unvisited '1'","Mark visited cells as '0'"],
    starter_code:{javascript:"function numIslands(grid) {\n  \n}",python:"def num_islands(grid):\n    pass",java:"class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}",cpp:"int numIslands(vector<vector<char>>& grid) {\n    \n}"},
    test_cases:[{input:"[['1','1','0'],['0','1','0'],['0','0','1']]",expected_output:"2",is_hidden:false}]
  },
  {
    id:"28", title:"Binary Tree Level Order Traversal", slug:"level-order-traversal", difficulty:"medium",
    topics:["Tree","BFS"], companies:["amazon","google","microsoft","tcs"],
    description:"Given root of binary tree, return level order traversal of its nodes' values (left to right, level by level).",
    examples:[{input:"root=[3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"}],
    constraints:["0≤nodes≤2000","-1000≤Node.val≤1000"],
    hints:["BFS with queue","Track nodes per level"],
    starter_code:{javascript:"function levelOrder(root) {\n  \n}",python:"def level_order(root):\n    pass",java:"class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}",cpp:"vector<vector<int>> levelOrder(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[3,9,20,null,null,15,7]",expected_output:"[[3],[9,20],[15,7]]",is_hidden:false}]
  },
  {
    id:"29", title:"Validate Binary Search Tree", slug:"validate-bst", difficulty:"medium",
    topics:["Tree","DFS","BST"], companies:["amazon","google","microsoft"],
    description:"Given root of binary tree, determine if it is a valid BST.",
    examples:[{input:"root=[2,1,3]",output:"true"},{input:"root=[5,1,4,null,null,3,6]",output:"false"}],
    constraints:["1≤nodes≤10⁴","Each node unique"],
    hints:["Pass min and max bounds with recursion","Left subtree must be < node, right > node"],
    starter_code:{javascript:"function isValidBST(root) {\n  \n}",python:"def is_valid_bst(root):\n    pass",java:"class Solution {\n    public boolean isValidBST(TreeNode root) {\n        \n    }\n}",cpp:"bool isValidBST(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[2,1,3]",expected_output:"true",is_hidden:false},{input:"[5,1,4,null,null,3,6]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"30", title:"Coin Change", slug:"coin-change", difficulty:"medium",
    topics:["Dynamic Programming","BFS"], companies:["amazon","google","flipkart","microsoft"],
    description:"Given coins of different denominations and amount, compute fewest coins to make up that amount. Return -1 if impossible.",
    examples:[{input:"coins=[1,5,11], amount=11",output:"3",explanation:"11=1+5+5? No: 11=11"},{input:"coins=[2], amount=3",output:"-1"}],
    constraints:["1≤coins.length≤12","0≤amount≤10⁴"],
    hints:["dp[amount] = min coins to reach amount","dp[i] = 1 + min(dp[i-coin]) for each coin"],
    starter_code:{javascript:"function coinChange(coins, amount) {\n  \n}",python:"def coin_change(coins, amount):\n    pass",java:"class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}",cpp:"int coinChange(vector<int>& coins, int amount) {\n    \n}"},
    test_cases:[{input:"[1,5,11]\n11",expected_output:"1",is_hidden:false},{input:"[2]\n3",expected_output:"-1",is_hidden:false}]
  },
  {
    id:"31", title:"Longest Increasing Subsequence", slug:"longest-increasing-subsequence", difficulty:"medium",
    topics:["Dynamic Programming","Binary Search"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given integer array nums, return length of longest strictly increasing subsequence.",
    examples:[{input:"nums=[10,9,2,5,3,7,101,18]",output:"4",explanation:"[2,3,7,101]"},{input:"nums=[0,1,0,3,2,3]",output:"4"}],
    constraints:["1≤nums.length≤2500"],
    hints:["dp[i] = LIS ending at index i","O(n log n) using patience sorting"],
    starter_code:{javascript:"function lengthOfLIS(nums) {\n  \n}",python:"def length_of_lis(nums):\n    pass",java:"class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}",cpp:"int lengthOfLIS(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[10,9,2,5,3,7,101,18]",expected_output:"4",is_hidden:false},{input:"[0,1,0,3,2,3]",expected_output:"4",is_hidden:true}]
  },
  {
    id:"32", title:"Minimum Path Sum", slug:"minimum-path-sum", difficulty:"medium",
    topics:["Dynamic Programming","Matrix"], companies:["amazon","google","microsoft"],
    description:"Given m×n grid filled with non-negative numbers, find path from top-left to bottom-right with minimum sum. You can only move right or down.",
    examples:[{input:"grid=[[1,3,1],[1,5,1],[4,2,1]]",output:"7",explanation:"1→3→1→1→1"}],
    constraints:["m,n≥1","0≤grid[i][j]≤100"],
    hints:["dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]","Initialize first row and column separately"],
    starter_code:{javascript:"function minPathSum(grid) {\n  \n}",python:"def min_path_sum(grid):\n    pass",java:"class Solution {\n    public int minPathSum(int[][] grid) {\n        \n    }\n}",cpp:"int minPathSum(vector<vector<int>>& grid) {\n    \n}"},
    test_cases:[{input:"[[1,3,1],[1,5,1],[4,2,1]]",expected_output:"7",is_hidden:false}]
  },
  {
    id:"33", title:"Word Search", slug:"word-search", difficulty:"medium",
    topics:["Array","Backtracking","DFS","Matrix"], companies:["amazon","google","microsoft"],
    description:"Given m×n grid and string word, return true if word exists in grid. Word must be constructed from adjacent horizontally or vertically neighboring cells.",
    examples:[{input:"board=[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word='ABCCED'",output:"true"}],
    constraints:["m,n≥1","1≤word.length≤15"],
    hints:["DFS with backtracking","Mark visited cells temporarily"],
    starter_code:{javascript:"function exist(board, word) {\n  \n}",python:"def exist(board, word):\n    pass",java:"class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}",cpp:"bool exist(vector<vector<char>>& board, string word) {\n    \n}"},
    test_cases:[{input:"[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]\nABCCED",expected_output:"true",is_hidden:false}]
  },
  {
    id:"34", title:"Search in Rotated Sorted Array", slug:"search-rotated-array", difficulty:"medium",
    topics:["Array","Binary Search"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given rotated sorted array nums (possibly with duplicates), search for target. Return index or -1.",
    examples:[{input:"nums=[4,5,6,7,0,1,2], target=0",output:"4"},{input:"nums=[4,5,6,7,0,1,2], target=3",output:"-1"}],
    constraints:["1≤nums.length≤5000"],
    hints:["Determine which half is sorted","Binary search on the sorted half"],
    starter_code:{javascript:"function search(nums, target) {\n  \n}",python:"def search(nums, target):\n    pass",java:"class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",cpp:"int search(vector<int>& nums, int target) {\n    \n}"},
    test_cases:[{input:"[4,5,6,7,0,1,2]\n0",expected_output:"4",is_hidden:false},{input:"[4,5,6,7,0,1,2]\n3",expected_output:"-1",is_hidden:false}]
  },
  {
    id:"35", title:"Merge Intervals", slug:"merge-intervals", difficulty:"medium",
    topics:["Array","Sorting"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given array of intervals, merge all overlapping intervals and return non-overlapping intervals covering all input intervals.",
    examples:[{input:"intervals=[[1,3],[2,6],[8,10],[15,18]]",output:"[[1,6],[8,10],[15,18]]"}],
    constraints:["1≤intervals.length≤10⁴"],
    hints:["Sort by start time","If current start ≤ previous end, merge"],
    starter_code:{javascript:"function merge(intervals) {\n  \n}",python:"def merge(intervals):\n    pass",java:"class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}",cpp:"vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    \n}"},
    test_cases:[{input:"[[1,3],[2,6],[8,10],[15,18]]",expected_output:"[[1,6],[8,10],[15,18]]",is_hidden:false}]
  },
  {
    id:"36", title:"Kth Largest Element", slug:"kth-largest-element", difficulty:"medium",
    topics:["Array","Heap","Quickselect"], companies:["amazon","google","microsoft"],
    description:"Given integer array nums and integer k, return kth largest element in the array.",
    examples:[{input:"nums=[3,2,1,5,6,4], k=2",output:"5"},{input:"nums=[3,2,3,1,2,4,5,5,6], k=4",output:"4"}],
    constraints:["1≤k≤nums.length≤10⁵"],
    hints:["Min-heap of size k","Or use quickselect algorithm"],
    starter_code:{javascript:"function findKthLargest(nums, k) {\n  \n}",python:"def find_kth_largest(nums, k):\n    pass",java:"class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}",cpp:"int findKthLargest(vector<int>& nums, int k) {\n    \n}"},
    test_cases:[{input:"[3,2,1,5,6,4]\n2",expected_output:"5",is_hidden:false}]
  },
  {
    id:"37", title:"Linked List Cycle", slug:"linked-list-cycle", difficulty:"easy",
    topics:["Linked List","Two Pointers"], companies:["amazon","google","tcs","microsoft"],
    description:"Given head of linked list, determine if it has a cycle.",
    examples:[{input:"head=[3,2,0,-4], pos=1",output:"true"},{input:"head=[1,2], pos=0",output:"true"},{input:"head=[1], pos=-1",output:"false"}],
    constraints:["0≤nodes≤10⁴"],
    hints:["Floyd's cycle detection","Slow and fast pointers"],
    starter_code:{javascript:"function hasCycle(head) {\n  \n}",python:"def has_cycle(head):\n    pass",java:"class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}",cpp:"bool hasCycle(ListNode* head) {\n    \n}"},
    test_cases:[{input:"[3,2,0,-4]\n1",expected_output:"true",is_hidden:false},{input:"[1]\n-1",expected_output:"false",is_hidden:false}]
  },
  {
    id:"38", title:"LRU Cache", slug:"lru-cache", difficulty:"hard",
    topics:["Design","Hash Map","Linked List"], companies:["amazon","google","microsoft","flipkart"],
    description:"Design data structure implementing LRU (Least Recently Used) cache with O(1) get and put operations.",
    examples:[{input:"LRUCache(2); put(1,1); put(2,2); get(1)→1; put(3,3); get(2)→-1",output:"[null,null,null,1,null,-1]"}],
    constraints:["1≤capacity≤3000","O(1) for get and put"],
    hints:["Combine HashMap with doubly linked list","Most recently used at head, LRU at tail"],
    starter_code:{javascript:"class LRUCache {\n  constructor(capacity) {\n    \n  }\n  get(key) {\n    \n  }\n  put(key, value) {\n    \n  }\n}",python:"class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass",java:"class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    public int get(int key) {\n        return -1;\n    }\n    public void put(int key, int value) {\n        \n    }\n}",cpp:"class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    int get(int key) {\n        return -1;\n    }\n    void put(int key, int value) {\n        \n    }\n};"},
    test_cases:[{input:"capacity=2\noperations",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"39", title:"Find Median from Data Stream", slug:"find-median-data-stream", difficulty:"hard",
    topics:["Heap","Design"], companies:["amazon","google","microsoft"],
    description:"Implement MedianFinder class that supports addNum and findMedian operations. findMedian returns median of all inserted elements.",
    examples:[{input:"addNum(1); addNum(2); findMedian()→1.5; addNum(3); findMedian()→2.0",output:"[null,null,1.5,null,2.0]"}],
    constraints:["Only integers are added","At least one element before findMedian"],
    hints:["Two heaps: max-heap for lower half, min-heap for upper half","Balance them to differ by at most 1"],
    starter_code:{javascript:"class MedianFinder {\n  constructor() {\n    \n  }\n  addNum(num) {\n    \n  }\n  findMedian() {\n    \n  }\n}",python:"class MedianFinder:\n    def __init__(self):\n        pass\n    def add_num(self, num):\n        pass\n    def find_median(self):\n        pass",java:"class MedianFinder {\n    public MedianFinder() {\n        \n    }\n    public void addNum(int num) {\n        \n    }\n    public double findMedian() {\n        return 0.0;\n    }\n}",cpp:"class MedianFinder {\npublic:\n    MedianFinder() {}\n    void addNum(int num) {}\n    double findMedian() { return 0.0; }\n};"},
    test_cases:[{input:"design problem",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"40", title:"Trapping Rain Water", slug:"trapping-rain-water", difficulty:"hard",
    topics:["Array","Two Pointers","Stack"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given n non-negative integers representing elevation map, compute how much water it can trap after raining.",
    examples:[{input:"height=[0,1,0,2,1,0,1,3,2,1,2,1]",output:"6"},{input:"height=[4,2,0,3,2,5]",output:"9"}],
    constraints:["n==height.length","0≤height[i]≤10⁵"],
    hints:["Two pointers from both ends","Water at position i = min(maxLeft, maxRight) - height[i]"],
    starter_code:{javascript:"function trap(height) {\n  \n}",python:"def trap(height):\n    pass",java:"class Solution {\n    public int trap(int[] height) {\n        \n    }\n}",cpp:"int trap(vector<int>& height) {\n    \n}"},
    test_cases:[{input:"[0,1,0,2,1,0,1,3,2,1,2,1]",expected_output:"6",is_hidden:false},{input:"[4,2,0,3,2,5]",expected_output:"9",is_hidden:true}]
  },
  {
    id:"41", title:"Rotate Array", slug:"rotate-array", difficulty:"medium",
    topics:["Array","Math"], companies:["tcs","infosys","wipro","microsoft"],
    description:"Given integer array nums, rotate array to right by k steps in-place.",
    examples:[{input:"nums=[1,2,3,4,5,6,7], k=3",output:"[5,6,7,1,2,3,4]"}],
    constraints:["1≤nums.length≤10⁵","0≤k≤10⁵"],
    hints:["Reverse entire array, then reverse first k and last n-k","k = k % n"],
    starter_code:{javascript:"function rotate(nums, k) {\n  \n}",python:"def rotate(nums, k):\n    pass",java:"class Solution {\n    public void rotate(int[] nums, int k) {\n        \n    }\n}",cpp:"void rotate(vector<int>& nums, int k) {\n    \n}"},
    test_cases:[{input:"[1,2,3,4,5,6,7]\n3",expected_output:"[5,6,7,1,2,3,4]",is_hidden:false}]
  },
  {
    id:"42", title:"Power of Two", slug:"power-of-two", difficulty:"easy",
    topics:["Math","Bit Manipulation"], companies:["tcs","wipro","infosys"],
    description:"Given integer n, return true if n is a power of two.",
    examples:[{input:"n=1",output:"true"},{input:"n=16",output:"true"},{input:"n=3",output:"false"}],
    constraints:["-2³¹≤n≤2³¹-1"],
    hints:["n & (n-1) == 0 for powers of 2","Also n > 0 required"],
    starter_code:{javascript:"function isPowerOfTwo(n) {\n  \n}",python:"def is_power_of_two(n):\n    pass",java:"class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}",cpp:"bool isPowerOfTwo(int n) {\n    \n}"},
    test_cases:[{input:"1",expected_output:"true",is_hidden:false},{input:"16",expected_output:"true",is_hidden:false},{input:"3",expected_output:"false",is_hidden:true}]
  },
  {
    id:"43", title:"Single Number", slug:"single-number", difficulty:"easy",
    topics:["Array","Bit Manipulation"], companies:["amazon","tcs","google"],
    description:"Given non-empty array where every element appears twice except one. Find that single one. O(n) time, O(1) space.",
    examples:[{input:"nums=[2,2,1]",output:"1"},{input:"nums=[4,1,2,1,2]",output:"4"}],
    constraints:["Linear time, constant space"],
    hints:["XOR of same numbers is 0","XOR all elements — pairs cancel out"],
    starter_code:{javascript:"function singleNumber(nums) {\n  \n}",python:"def single_number(nums):\n    pass",java:"class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}",cpp:"int singleNumber(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[2,2,1]",expected_output:"1",is_hidden:false},{input:"[4,1,2,1,2]",expected_output:"4",is_hidden:false}]
  },
  {
    id:"44", title:"House Robber", slug:"house-robber", difficulty:"medium",
    topics:["Dynamic Programming","Array"], companies:["amazon","google","microsoft","tcs"],
    description:"Houses along street, each with money. Cannot rob two adjacent houses. Maximize amount you can rob.",
    examples:[{input:"nums=[1,2,3,1]",output:"4",explanation:"Rob house 1 and 3"},{input:"nums=[2,7,9,3,1]",output:"12"}],
    constraints:["1≤nums.length≤100","0≤nums[i]≤400"],
    hints:["dp[i] = max(dp[i-1], dp[i-2]+nums[i])","Only need two previous values"],
    starter_code:{javascript:"function rob(nums) {\n  \n}",python:"def rob(nums):\n    pass",java:"class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}",cpp:"int rob(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,2,3,1]",expected_output:"4",is_hidden:false},{input:"[2,7,9,3,1]",expected_output:"12",is_hidden:false}]
  },
  {
    id:"45", title:"Find First and Last Position", slug:"find-first-last-position", difficulty:"medium",
    topics:["Array","Binary Search"], companies:["amazon","google","microsoft"],
    description:"Given sorted array of integers and target, find starting and ending position. Return [-1,-1] if not found.",
    examples:[{input:"nums=[5,7,7,8,8,10], target=8",output:"[3,4]"},{input:"nums=[5,7,7,8,8,10], target=6",output:"[-1,-1]"}],
    constraints:["0≤nums.length≤10⁵"],
    hints:["Binary search for leftmost occurrence","Binary search for rightmost occurrence"],
    starter_code:{javascript:"function searchRange(nums, target) {\n  \n}",python:"def search_range(nums, target):\n    pass",java:"class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        \n    }\n}",cpp:"vector<int> searchRange(vector<int>& nums, int target) {\n    \n}"},
    test_cases:[{input:"[5,7,7,8,8,10]\n8",expected_output:"[3,4]",is_hidden:false}]
  },
  {
    id:"46", title:"Unique Paths", slug:"unique-paths", difficulty:"medium",
    topics:["Dynamic Programming","Math","Combinatorics"], companies:["amazon","google","microsoft"],
    description:"Robot starts at top-left of m×n grid. Can only move right or down. How many unique paths to bottom-right?",
    examples:[{input:"m=3, n=7",output:"28"},{input:"m=3, n=2",output:"3"}],
    constraints:["1≤m,n≤100"],
    hints:["dp[i][j] = dp[i-1][j] + dp[i][j-1]","Or use combinatorics: C(m+n-2, m-1)"],
    starter_code:{javascript:"function uniquePaths(m, n) {\n  \n}",python:"def unique_paths(m, n):\n    pass",java:"class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}",cpp:"int uniquePaths(int m, int n) {\n    \n}"},
    test_cases:[{input:"3 7",expected_output:"28",is_hidden:false},{input:"3 2",expected_output:"3",is_hidden:false}]
  },
  {
    id:"47", title:"Jump Game", slug:"jump-game", difficulty:"medium",
    topics:["Array","Greedy","Dynamic Programming"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given integer array nums where nums[i] is your maximum jump from index i, return true if you can reach last index starting from index 0.",
    examples:[{input:"nums=[2,3,1,1,4]",output:"true"},{input:"nums=[3,2,1,0,4]",output:"false"}],
    constraints:["1≤nums.length≤10⁴","0≤nums[i]≤10⁵"],
    hints:["Track maximum reachable index","If current index > maxReach, return false"],
    starter_code:{javascript:"function canJump(nums) {\n  \n}",python:"def can_jump(nums):\n    pass",java:"class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}",cpp:"bool canJump(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[2,3,1,1,4]",expected_output:"true",is_hidden:false},{input:"[3,2,1,0,4]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"48", title:"Rotate Image", slug:"rotate-image", difficulty:"medium",
    topics:["Array","Matrix","Math"], companies:["amazon","google","microsoft"],
    description:"Given n×n 2D matrix, rotate it 90 degrees clockwise in-place.",
    examples:[{input:"matrix=[[1,2,3],[4,5,6],[7,8,9]]",output:"[[7,4,1],[8,5,2],[9,6,3]]"}],
    constraints:["n==matrix.length","1≤n≤20"],
    hints:["Transpose the matrix","Reverse each row"],
    starter_code:{javascript:"function rotate(matrix) {\n  \n}",python:"def rotate(matrix):\n    pass",java:"class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}",cpp:"void rotate(vector<vector<int>>& matrix) {\n    \n}"},
    test_cases:[{input:"[[1,2,3],[4,5,6],[7,8,9]]",expected_output:"[[7,4,1],[8,5,2],[9,6,3]]",is_hidden:false}]
  },
  {
    id:"49", title:"Spiral Matrix", slug:"spiral-matrix", difficulty:"medium",
    topics:["Array","Matrix","Simulation"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given m×n matrix, return all elements in spiral order.",
    examples:[{input:"matrix=[[1,2,3],[4,5,6],[7,8,9]]",output:"[1,2,3,6,9,8,7,4,5]"}],
    constraints:["m,n≥1"],
    hints:["Maintain boundaries: top, bottom, left, right","Shrink boundaries after each direction"],
    starter_code:{javascript:"function spiralOrder(matrix) {\n  \n}",python:"def spiral_order(matrix):\n    pass",java:"class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}",cpp:"vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    \n}"},
    test_cases:[{input:"[[1,2,3],[4,5,6],[7,8,9]]",expected_output:"[1,2,3,6,9,8,7,4,5]",is_hidden:false}]
  },
  {
    id:"50", title:"Word Ladder", slug:"word-ladder", difficulty:"hard",
    topics:["Graph","BFS","String"], companies:["amazon","google","microsoft"],
    description:"Given beginWord, endWord, and dictionary wordList, return length of shortest transformation sequence. Each step you change one letter and each word must be in wordList.",
    examples:[{input:"beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog']",output:"5",explanation:"hit→hot→dot→dog→cog"}],
    constraints:["1≤wordList.length≤5000","All words same length"],
    hints:["BFS from beginWord","For each word try changing each character"],
    starter_code:{javascript:"function ladderLength(beginWord, endWord, wordList) {\n  \n}",python:"def ladder_length(begin_word, end_word, word_list):\n    pass",java:"class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}",cpp:"int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    \n}"},
    test_cases:[{input:"hit\ncog\n[hot,dot,dog,lot,log,cog]",expected_output:"5",is_hidden:false}]
  },
  {
    id:"51", title:"Course Schedule", slug:"course-schedule", difficulty:"medium",
    topics:["Graph","Topological Sort","BFS","DFS"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given numCourses and prerequisites (pairs where [a,b] means must take b before a), return true if you can finish all courses.",
    examples:[{input:"numCourses=2, prerequisites=[[1,0]]",output:"true"},{input:"numCourses=2, prerequisites=[[1,0],[0,1]]",output:"false"}],
    constraints:["1≤numCourses≤2000"],
    hints:["Topological sort problem","Detect cycle in directed graph"],
    starter_code:{javascript:"function canFinish(numCourses, prerequisites) {\n  \n}",python:"def can_finish(num_courses, prerequisites):\n    pass",java:"class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}",cpp:"bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    \n}"},
    test_cases:[{input:"2\n[[1,0]]",expected_output:"true",is_hidden:false},{input:"2\n[[1,0],[0,1]]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"52", title:"Decode Ways", slug:"decode-ways", difficulty:"medium",
    topics:["Dynamic Programming","String"], companies:["amazon","google","microsoft"],
    description:"Given string s of digits, return number of ways to decode it. 'A'→'1', 'B'→'2',...,'Z'→'26'.",
    examples:[{input:'s="12"',output:"2",explanation:"AB or L"},{input:'s="226"',output:"3"}],
    constraints:["1≤s.length≤100"],
    hints:["dp[i] = ways to decode first i chars","Check single and double digit encodings"],
    starter_code:{javascript:"function numDecodings(s) {\n  \n}",python:"def num_decodings(s):\n    pass",java:"class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}",cpp:"int numDecodings(string s) {\n    \n}"},
    test_cases:[{input:"12",expected_output:"2",is_hidden:false},{input:"226",expected_output:"3",is_hidden:false},{input:"06",expected_output:"0",is_hidden:true}]
  },
  {
    id:"53", title:"Longest Palindromic Substring", slug:"longest-palindromic-substring", difficulty:"medium",
    topics:["String","Dynamic Programming"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given string s, return the longest palindromic substring.",
    examples:[{input:'s="babad"',output:'"bab"'},{input:'s="cbbd"',output:'"bb"'}],
    constraints:["1≤s.length≤1000"],
    hints:["Expand around center","Two cases: odd length (single center) and even length (two centers)"],
    starter_code:{javascript:"function longestPalindrome(s) {\n  \n}",python:"def longest_palindrome(s):\n    pass",java:"class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}",cpp:"string longestPalindrome(string s) {\n    \n}"},
    test_cases:[{input:"babad",expected_output:"bab",is_hidden:false},{input:"cbbd",expected_output:"bb",is_hidden:false}]
  },
  {
    id:"54", title:"Subarray Sum Equals K", slug:"subarray-sum-equals-k", difficulty:"medium",
    topics:["Array","Hash Map","Prefix Sum"], companies:["amazon","google","flipkart","microsoft"],
    description:"Given integer array nums and integer k, return total number of subarrays with sum equal to k.",
    examples:[{input:"nums=[1,1,1], k=2",output:"2"},{input:"nums=[1,2,3], k=3",output:"2"}],
    constraints:["1≤nums.length≤2*10⁴"],
    hints:["Prefix sum + hash map","Count of subarrays with sum k = count of prefix sums where prefixSum[j]-prefixSum[i]==k"],
    starter_code:{javascript:"function subarraySum(nums, k) {\n  \n}",python:"def subarray_sum(nums, k):\n    pass",java:"class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}",cpp:"int subarraySum(vector<int>& nums, int k) {\n    \n}"},
    test_cases:[{input:"[1,1,1]\n2",expected_output:"2",is_hidden:false},{input:"[1,2,3]\n3",expected_output:"2",is_hidden:false}]
  },
  {
    id:"55", title:"Longest Substring Without Repeating", slug:"longest-substring-no-repeat", difficulty:"medium",
    topics:["String","Sliding Window","Hash Map"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given string s, find length of longest substring without repeating characters.",
    examples:[{input:'s="abcabcbb"',output:"3",explanation:"abc"},{input:'s="bbbbb"',output:"1"}],
    constraints:["0≤s.length≤5*10⁴"],
    hints:["Sliding window with a set","Shrink window when duplicate found"],
    starter_code:{javascript:"function lengthOfLongestSubstring(s) {\n  \n}",python:"def length_of_longest_substring(s):\n    pass",java:"class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}",cpp:"int lengthOfLongestSubstring(string s) {\n    \n}"},
    test_cases:[{input:"abcabcbb",expected_output:"3",is_hidden:false},{input:"bbbbb",expected_output:"1",is_hidden:false}]
  },
  {
    id:"56", title:"Minimum Window Substring", slug:"minimum-window-substring", difficulty:"hard",
    topics:["String","Sliding Window","Hash Map"], companies:["amazon","google","microsoft"],
    description:"Given strings s and t, return minimum window substring of s that contains all characters of t. Return empty string if impossible.",
    examples:[{input:'s="ADOBECODEBANC", t="ABC"',output:'"BANC"'}],
    constraints:["1≤s.length≤10⁵"],
    hints:["Sliding window with character counts","Expand right, shrink left when valid"],
    starter_code:{javascript:"function minWindow(s, t) {\n  \n}",python:"def min_window(s, t):\n    pass",java:"class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}",cpp:"string minWindow(string s, string t) {\n    \n}"},
    test_cases:[{input:"ADOBECODEBANC\nABC",expected_output:"BANC",is_hidden:false}]
  },
  {
    id:"57", title:"Serialize and Deserialize Binary Tree", slug:"serialize-deserialize-tree", difficulty:"hard",
    topics:["Tree","BFS","DFS","Design"], companies:["amazon","google","microsoft"],
    description:"Design algorithm to serialize and deserialize a binary tree. Serialization converts tree to string, deserialization converts string back to tree.",
    examples:[{input:"root=[1,2,3,null,null,4,5]",output:"same tree after serialize/deserialize"}],
    constraints:["0≤nodes≤10⁴","-1000≤Node.val≤1000"],
    hints:["BFS serialization with level order","Use null markers for missing children"],
    starter_code:{javascript:"class Codec {\n  serialize(root) {\n    \n  }\n  deserialize(data) {\n    \n  }\n}",python:"class Codec:\n    def serialize(self, root):\n        pass\n    def deserialize(self, data):\n        pass",java:"public class Codec {\n    public String serialize(TreeNode root) {\n        return '';\n    }\n    public TreeNode deserialize(String data) {\n        return null;\n    }\n}",cpp:"class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        return '';\n    }\n    TreeNode* deserialize(string data) {\n        return nullptr;\n    }\n};"},
    test_cases:[{input:"[1,2,3,null,null,4,5]",expected_output:"[1,2,3,null,null,4,5]",is_hidden:false}]
  },
  {
    id:"58", title:"K Closest Points to Origin", slug:"k-closest-points", difficulty:"medium",
    topics:["Array","Math","Sorting","Heap"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given array of points on X-Y plane and integer k, return k closest points to origin.",
    examples:[{input:"points=[[1,3],[-2,2]], k=1",output:"[[-2,2]]"}],
    constraints:["1≤k≤points.length≤10⁴"],
    hints:["Sort by Euclidean distance (no need for sqrt)","Or use max-heap of size k"],
    starter_code:{javascript:"function kClosest(points, k) {\n  \n}",python:"def k_closest(points, k):\n    pass",java:"class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        \n    }\n}",cpp:"vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n    \n}"},
    test_cases:[{input:"[[1,3],[-2,2]]\n1",expected_output:"[[-2,2]]",is_hidden:false}]
  },
  {
    id:"59", title:"Implement Stack using Queues", slug:"stack-using-queues", difficulty:"easy",
    topics:["Stack","Queue","Design"], companies:["tcs","infosys","wipro","microsoft"],
    description:"Implement last-in-first-out (LIFO) stack using only queues, supporting push, pop, top, and empty operations.",
    examples:[{input:"push(1); push(2); top()→2; pop()→2; empty()→false",output:"see description"}],
    constraints:["1≤calls≤100"],
    hints:["After each push, rotate queue so new element is at front","Or make pop expensive"],
    starter_code:{javascript:"class MyStack {\n  constructor() {\n    \n  }\n  push(x) {\n    \n  }\n  pop() {\n    \n  }\n  top() {\n    \n  }\n  empty() {\n    \n  }\n}",python:"class MyStack:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def top(self):\n        pass\n    def empty(self):\n        pass",java:"class MyStack {\n    public void push(int x) {}\n    public int pop() { return -1; }\n    public int top() { return -1; }\n    public boolean empty() { return true; }\n}",cpp:"class MyStack {\npublic:\n    void push(int x) {}\n    int pop() { return -1; }\n    int top() { return -1; }\n    bool empty() { return true; }\n};"},
    test_cases:[{input:"design problem",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"60", title:"Graph Valid Tree", slug:"graph-valid-tree", difficulty:"medium",
    topics:["Graph","DFS","BFS","Union Find"], companies:["amazon","google","microsoft","linkedin"],
    description:"Given n nodes labeled 0 to n-1 and list of undirected edges, write function to check if edges make a valid tree.",
    examples:[{input:"n=5, edges=[[0,1],[0,2],[0,3],[1,4]]",output:"true"},{input:"n=5, edges=[[0,1],[1,2],[2,3],[1,3],[1,4]]",output:"false"}],
    constraints:["1≤n≤2000"],
    hints:["Valid tree: n-1 edges and no cycles","Or check: connected and no cycle"],
    starter_code:{javascript:"function validTree(n, edges) {\n  \n}",python:"def valid_tree(n, edges):\n    pass",java:"class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        \n    }\n}",cpp:"bool validTree(int n, vector<vector<int>>& edges) {\n    \n}"},
    test_cases:[{input:"5\n[[0,1],[0,2],[0,3],[1,4]]",expected_output:"true",is_hidden:false}]
  },
  {
    id:"61", title:"Find Duplicate Number", slug:"find-duplicate", difficulty:"medium",
    topics:["Array","Two Pointers","Binary Search"], companies:["amazon","google","microsoft"],
    description:"Given array of n+1 integers where each is between 1 and n (inclusive), find the duplicate number. Must use O(1) space.",
    examples:[{input:"nums=[1,3,4,2,2]",output:"2"},{input:"nums=[3,1,3,4,2]",output:"3"}],
    constraints:["O(1) extra space","Cannot modify array"],
    hints:["Floyd's cycle detection (tortoise and hare)","Treat array values as pointers"],
    starter_code:{javascript:"function findDuplicate(nums) {\n  \n}",python:"def find_duplicate(nums):\n    pass",java:"class Solution {\n    public int findDuplicate(int[] nums) {\n        \n    }\n}",cpp:"int findDuplicate(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,3,4,2,2]",expected_output:"2",is_hidden:false},{input:"[3,1,3,4,2]",expected_output:"3",is_hidden:false}]
  },
  {
    id:"62", title:"Lowest Common Ancestor BST", slug:"lca-bst", difficulty:"medium",
    topics:["Tree","BST","DFS"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given BST and two nodes p and q, find their lowest common ancestor (LCA).",
    examples:[{input:"root=[6,2,8,0,4,7,9], p=2, q=8",output:"6"},{input:"root=[6,2,8,0,4,7,9], p=2, q=4",output:"2"}],
    constraints:["2≤nodes≤10⁵"],
    hints:["If both p and q are less than root, LCA is in left subtree","If both greater, LCA is in right subtree","Otherwise root is LCA"],
    starter_code:{javascript:"function lowestCommonAncestor(root, p, q) {\n  \n}",python:"def lowest_common_ancestor(root, p, q):\n    pass",java:"class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}",cpp:"TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    \n}"},
    test_cases:[{input:"[6,2,8,0,4,7,9]\n2 8",expected_output:"6",is_hidden:false}]
  },
  {
    id:"63", title:"Convert Sorted Array to BST", slug:"sorted-array-to-bst", difficulty:"easy",
    topics:["Tree","BST","Binary Search","Divide and Conquer"], companies:["amazon","google","tcs"],
    description:"Given integer array nums sorted in ascending order, convert it to height-balanced BST.",
    examples:[{input:"nums=[-10,-3,0,5,9]",output:"[0,-3,9,-10,null,5]"}],
    constraints:["1≤nums.length≤10⁴"],
    hints:["Middle element becomes root","Recurse on left and right halves"],
    starter_code:{javascript:"function sortedArrayToBST(nums) {\n  \n}",python:"def sorted_array_to_bst(nums):\n    pass",java:"class Solution {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        \n    }\n}",cpp:"TreeNode* sortedArrayToBST(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[-10,-3,0,5,9]",expected_output:"[0,-3,9,-10,null,5]",is_hidden:false}]
  },
  {
    id:"64", title:"Path Sum", slug:"path-sum", difficulty:"easy",
    topics:["Tree","DFS","BFS"], companies:["amazon","google","tcs","microsoft"],
    description:"Given root of binary tree and integer targetSum, return true if there is a root-to-leaf path with sum equal to targetSum.",
    examples:[{input:"root=[5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22",output:"true"}],
    constraints:["0≤nodes≤5000"],
    hints:["DFS subtracting node value from target","At leaf, check if remaining == 0"],
    starter_code:{javascript:"function hasPathSum(root, targetSum) {\n  \n}",python:"def has_path_sum(root, target_sum):\n    pass",java:"class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        \n    }\n}",cpp:"bool hasPathSum(TreeNode* root, int targetSum) {\n    \n}"},
    test_cases:[{input:"[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22",expected_output:"true",is_hidden:false}]
  },
  {
    id:"65", title:"Evaluate Reverse Polish Notation", slug:"evaluate-rpn", difficulty:"medium",
    topics:["Stack","Array","Math"], companies:["amazon","microsoft","tcs","infosys"],
    description:"Evaluate arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Division truncates toward zero.",
    examples:[{input:'tokens=["2","1","+","3","*"]',output:"9",explanation:"((2+1)*3)=9"},{input:'tokens=["4","13","5","/","+"]',output:"6"}],
    constraints:["Tokens are valid RPN"],
    hints:["Use a stack","Push numbers, pop two for operators"],
    starter_code:{javascript:"function evalRPN(tokens) {\n  \n}",python:"def eval_rpn(tokens):\n    pass",java:"class Solution {\n    public int evalRPN(String[] tokens) {\n        \n    }\n}",cpp:"int evalRPN(vector<string>& tokens) {\n    \n}"},
    test_cases:[{input:'["2","1","+","3","*"]',expected_output:"9",is_hidden:false}]
  },
  {
    id:"66", title:"Daily Temperatures", slug:"daily-temperatures", difficulty:"medium",
    topics:["Stack","Array","Monotonic Stack"], companies:["amazon","google","microsoft"],
    description:"Given temperatures array, return array where answer[i] is number of days until warmer temperature. 0 if no future warmer day.",
    examples:[{input:"temperatures=[73,74,75,71,69,72,76,73]",output:"[1,1,4,2,1,1,0,0]"}],
    constraints:["1≤temperatures.length≤10⁵"],
    hints:["Monotonic decreasing stack","Store indices, pop when warmer temp found"],
    starter_code:{javascript:"function dailyTemperatures(temperatures) {\n  \n}",python:"def daily_temperatures(temperatures):\n    pass",java:"class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        \n    }\n}",cpp:"vector<int> dailyTemperatures(vector<int>& temperatures) {\n    \n}"},
    test_cases:[{input:"[73,74,75,71,69,72,76,73]",expected_output:"[1,1,4,2,1,1,0,0]",is_hidden:false}]
  },
  {
    id:"67", title:"Next Greater Element", slug:"next-greater-element", difficulty:"easy",
    topics:["Stack","Array","Monotonic Stack"], companies:["amazon","tcs","infosys"],
    description:"Given two arrays nums1 and nums2 where nums1 is subset of nums2, find next greater element of each element in nums1 from nums2. Return -1 if none.",
    examples:[{input:"nums1=[4,1,2], nums2=[1,3,4,2]",output:"[-1,3,-1]"}],
    constraints:["1≤nums1.length≤nums2.length≤1000"],
    hints:["Build next greater element map for nums2 using stack","Then look up for each element in nums1"],
    starter_code:{javascript:"function nextGreaterElement(nums1, nums2) {\n  \n}",python:"def next_greater_element(nums1, nums2):\n    pass",java:"class Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        \n    }\n}",cpp:"vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n    \n}"},
    test_cases:[{input:"[4,1,2]\n[1,3,4,2]",expected_output:"[-1,3,-1]",is_hidden:false}]
  },
  {
    id:"68", title:"Implement Queue using Stacks", slug:"queue-using-stacks", difficulty:"easy",
    topics:["Stack","Queue","Design"], companies:["tcs","infosys","wipro"],
    description:"Implement FIFO queue using only two stacks. Support push, pop, peek, and empty operations.",
    examples:[{input:"push(1); push(2); peek()→1; pop()→1; empty()→false",output:"see description"}],
    constraints:["1≤calls≤100"],
    hints:["Input stack and output stack","Flip to output stack when output empty"],
    starter_code:{javascript:"class MyQueue {\n  constructor() {\n    \n  }\n  push(x) {\n    \n  }\n  pop() {\n    \n  }\n  peek() {\n    \n  }\n  empty() {\n    \n  }\n}",python:"class MyQueue:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def peek(self):\n        pass\n    def empty(self):\n        pass",java:"class MyQueue {\n    public void push(int x) {}\n    public int pop() { return -1; }\n    public int peek() { return -1; }\n    public boolean empty() { return true; }\n}",cpp:"class MyQueue {\npublic:\n    void push(int x) {}\n    int pop() { return -1; }\n    int peek() { return -1; }\n    bool empty() { return true; }\n};"},
    test_cases:[{input:"design",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"69", title:"Repeated DNA Sequences", slug:"repeated-dna-sequences", difficulty:"medium",
    topics:["String","Hash Map","Sliding Window","Bit Manipulation"], companies:["amazon","google","microsoft"],
    description:"Given DNA string s, find all 10-letter-long sequences that occur more than once.",
    examples:[{input:'s="AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"',output:'["AAAAACCCCC","CCCCCAAAAA"]'}],
    constraints:["5≤s.length≤10⁵","s[i] is A, C, G, or T"],
    hints:["Sliding window of size 10","Use a set to track seen sequences"],
    starter_code:{javascript:"function findRepeatedDnaSequences(s) {\n  \n}",python:"def find_repeated_dna_sequences(s):\n    pass",java:"class Solution {\n    public List<String> findRepeatedDnaSequences(String s) {\n        \n    }\n}",cpp:"vector<string> findRepeatedDnaSequences(string s) {\n    \n}"},
    test_cases:[{input:"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",expected_output:'["AAAAACCCCC","CCCCCAAAAA"]',is_hidden:false}]
  },
  {
    id:"70", title:"Meeting Rooms II", slug:"meeting-rooms-ii", difficulty:"medium",
    topics:["Array","Sorting","Heap","Greedy"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given array of meeting time intervals [start,end], find minimum number of conference rooms required.",
    examples:[{input:"intervals=[[0,30],[5,10],[15,20]]",output:"2"},{input:"intervals=[[7,10],[2,4]]",output:"1"}],
    constraints:["1≤intervals.length≤10⁴"],
    hints:["Sort by start time","Min-heap to track earliest ending meeting"],
    starter_code:{javascript:"function minMeetingRooms(intervals) {\n  \n}",python:"def min_meeting_rooms(intervals):\n    pass",java:"class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        \n    }\n}",cpp:"int minMeetingRooms(vector<vector<int>>& intervals) {\n    \n}"},
    test_cases:[{input:"[[0,30],[5,10],[15,20]]",expected_output:"2",is_hidden:false}]
  },
  {
    id:"71", title:"Add Two Numbers", slug:"add-two-numbers", difficulty:"medium",
    topics:["Linked List","Math"], companies:["amazon","google","microsoft","tcs"],
    description:"Two non-empty linked lists represent non-negative integers in reverse order. Add the two numbers and return sum as linked list.",
    examples:[{input:"l1=[2,4,3], l2=[5,6,4]",output:"[7,0,8]",explanation:"342+465=807"}],
    constraints:["1≤nodes≤100","0≤Node.val≤9"],
    hints:["Track carry","Add corresponding digits plus carry"],
    starter_code:{javascript:"function addTwoNumbers(l1, l2) {\n  \n}",python:"def add_two_numbers(l1, l2):\n    pass",java:"class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}",cpp:"ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    \n}"},
    test_cases:[{input:"[2,4,3]\n[5,6,4]",expected_output:"[7,0,8]",is_hidden:false}]
  },
  {
    id:"72", title:"Remove Nth Node From End", slug:"remove-nth-from-end", difficulty:"medium",
    topics:["Linked List","Two Pointers"], companies:["amazon","microsoft","google"],
    description:"Given head of linked list, remove nth node from end and return head. Do it in one pass.",
    examples:[{input:"head=[1,2,3,4,5], n=2",output:"[1,2,3,5]"}],
    constraints:["1≤n≤length"],
    hints:["Two pointers n apart","When fast reaches end, slow is at target"],
    starter_code:{javascript:"function removeNthFromEnd(head, n) {\n  \n}",python:"def remove_nth_from_end(head, n):\n    pass",java:"class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}",cpp:"ListNode* removeNthFromEnd(ListNode* head, int n) {\n    \n}"},
    test_cases:[{input:"[1,2,3,4,5]\n2",expected_output:"[1,2,3,5]",is_hidden:false}]
  },
  {
    id:"73", title:"Intersection of Two Linked Lists", slug:"intersection-two-lists", difficulty:"easy",
    topics:["Linked List","Two Pointers","Hash Map"], companies:["amazon","tcs","infosys"],
    description:"Given heads of two linked lists, return node where they intersect, or null if no intersection.",
    examples:[{input:"intersectVal=8, listA=[4,1,8,4,5], listB=[5,6,1,8,4,5]",output:"Intersected at 8"}],
    constraints:["Follow up: O(n) time O(1) space"],
    hints:["Two pointers switching lists at end","Both will travel equal total distance"],
    starter_code:{javascript:"function getIntersectionNode(headA, headB) {\n  \n}",python:"def get_intersection_node(headA, headB):\n    pass",java:"class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        \n    }\n}",cpp:"ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {\n    \n}"},
    test_cases:[{input:"design problem",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"74", title:"Palindrome Linked List", slug:"palindrome-linked-list", difficulty:"easy",
    topics:["Linked List","Two Pointers","Stack"], companies:["amazon","google","tcs"],
    description:"Given head of linked list, return true if it is a palindrome. O(n) time O(1) space.",
    examples:[{input:"head=[1,2,2,1]",output:"true"},{input:"head=[1,2]",output:"false"}],
    constraints:["O(1) space required"],
    hints:["Find middle using slow/fast pointers","Reverse second half and compare"],
    starter_code:{javascript:"function isPalindrome(head) {\n  \n}",python:"def is_palindrome(head):\n    pass",java:"class Solution {\n    public boolean isPalindrome(ListNode head) {\n        \n    }\n}",cpp:"bool isPalindrome(ListNode* head) {\n    \n}"},
    test_cases:[{input:"[1,2,2,1]",expected_output:"true",is_hidden:false},{input:"[1,2]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"75", title:"Diameter of Binary Tree", slug:"diameter-binary-tree", difficulty:"easy",
    topics:["Tree","DFS"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given root of binary tree, return length of tree's diameter (longest path between any two nodes, which may not pass through root).",
    examples:[{input:"root=[1,2,3,4,5]",output:"3",explanation:"[4,2,1,3] or [5,2,1,3]"}],
    constraints:["1≤nodes≤10⁴","-100≤Node.val≤100"],
    hints:["At each node, diameter through it = leftHeight + rightHeight","Track global max"],
    starter_code:{javascript:"function diameterOfBinaryTree(root) {\n  \n}",python:"def diameter_of_binary_tree(root):\n    pass",java:"class Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        \n    }\n}",cpp:"int diameterOfBinaryTree(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[1,2,3,4,5]",expected_output:"3",is_hidden:false}]
  },
  {
    id:"76", title:"Balanced Binary Tree", slug:"balanced-binary-tree", difficulty:"easy",
    topics:["Tree","DFS"], companies:["amazon","tcs","infosys","microsoft"],
    description:"Given root of binary tree, determine if it is height-balanced (depth of two subtrees of every node never differs by more than 1).",
    examples:[{input:"root=[3,9,20,null,null,15,7]",output:"true"},{input:"root=[1,2,2,3,3,null,null,4,4]",output:"false"}],
    constraints:["0≤nodes≤5000"],
    hints:["Return height from DFS","Return -1 as sentinel for unbalanced"],
    starter_code:{javascript:"function isBalanced(root) {\n  \n}",python:"def is_balanced(root):\n    pass",java:"class Solution {\n    public boolean isBalanced(TreeNode root) {\n        \n    }\n}",cpp:"bool isBalanced(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[3,9,20,null,null,15,7]",expected_output:"true",is_hidden:false}]
  },
  {
    id:"77", title:"Kth Smallest in BST", slug:"kth-smallest-bst", difficulty:"medium",
    topics:["Tree","BST","DFS","Inorder"], companies:["amazon","google","microsoft"],
    description:"Given root of BST and integer k, return kth smallest value in BST.",
    examples:[{input:"root=[3,1,4,null,2], k=1",output:"1"},{input:"root=[5,3,6,2,4,null,null,1], k=3",output:"3"}],
    constraints:["1≤k≤nodes≤10⁴"],
    hints:["Inorder traversal of BST gives sorted order","Stop at kth element"],
    starter_code:{javascript:"function kthSmallest(root, k) {\n  \n}",python:"def kth_smallest(root, k):\n    pass",java:"class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        \n    }\n}",cpp:"int kthSmallest(TreeNode* root, int k) {\n    \n}"},
    test_cases:[{input:"[3,1,4,null,2]\n1",expected_output:"1",is_hidden:false}]
  },
  {
    id:"78", title:"Count Good Nodes in Tree", slug:"count-good-nodes", difficulty:"medium",
    topics:["Tree","DFS"], companies:["amazon","google","microsoft"],
    description:"Given binary tree root, return count of good nodes. Node X is good if there is no node with greater value on path from root to X.",
    examples:[{input:"root=[3,1,4,3,null,1,5]",output:"4"}],
    constraints:["1≤nodes≤10⁵","-10⁴≤Node.val≤10⁴"],
    hints:["DFS tracking max value seen so far on path","Node is good if val >= max seen"],
    starter_code:{javascript:"function goodNodes(root) {\n  \n}",python:"def good_nodes(root):\n    pass",java:"class Solution {\n    public int goodNodes(TreeNode root) {\n        \n    }\n}",cpp:"int goodNodes(TreeNode* root) {\n    \n}"},
    test_cases:[{input:"[3,1,4,3,null,1,5]",expected_output:"4",is_hidden:false}]
  },
  {
    id:"79", title:"Sliding Window Maximum", slug:"sliding-window-maximum", difficulty:"hard",
    topics:["Array","Sliding Window","Deque","Monotonic Queue"], companies:["amazon","google","microsoft"],
    description:"Given integer array nums and integer k, find maximum sliding window of size k for each position.",
    examples:[{input:"nums=[1,3,-1,-3,5,3,6,7], k=3",output:"[3,3,5,5,6,7]"}],
    constraints:["1≤nums.length≤10⁵"],
    hints:["Monotonic decreasing deque","Front of deque is always maximum of current window"],
    starter_code:{javascript:"function maxSlidingWindow(nums, k) {\n  \n}",python:"def max_sliding_window(nums, k):\n    pass",java:"class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}",cpp:"vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    \n}"},
    test_cases:[{input:"[1,3,-1,-3,5,3,6,7]\n3",expected_output:"[3,3,5,5,6,7]",is_hidden:false}]
  },
  {
    id:"80", title:"Alien Dictionary", slug:"alien-dictionary", difficulty:"hard",
    topics:["Graph","Topological Sort","BFS","String"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given sorted list of words from an alien language, derive character order. Return valid ordering or empty string if invalid.",
    examples:[{input:"words=['wrt','wrf','er','ett','rftt']",output:'"wertf"'}],
    constraints:["1≤words.length≤500"],
    hints:["Compare adjacent words to derive edges","Topological sort on character graph"],
    starter_code:{javascript:"function alienOrder(words) {\n  \n}",python:"def alien_order(words):\n    pass",java:"class Solution {\n    public String alienOrder(String[] words) {\n        \n    }\n}",cpp:"string alienOrder(vector<string>& words) {\n    \n}"},
    test_cases:[{input:"['wrt','wrf','er','ett','rftt']",expected_output:"wertf",is_hidden:false}]
  },
  {
    id:"81", title:"Pacific Atlantic Water Flow", slug:"pacific-atlantic", difficulty:"medium",
    topics:["Graph","BFS","DFS","Matrix"], companies:["amazon","google","microsoft"],
    description:"Given m×n island matrix with heights, find all cells where water can flow to both Pacific and Atlantic oceans.",
    examples:[{input:"heights=[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",output:"[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"}],
    constraints:["m,n≥1","0≤heights[i][j]≤10⁵"],
    hints:["BFS/DFS from ocean borders inward","Cells reachable from both oceans are answer"],
    starter_code:{javascript:"function pacificAtlantic(heights) {\n  \n}",python:"def pacific_atlantic(heights):\n    pass",java:"class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        \n    }\n}",cpp:"vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n    \n}"},
    test_cases:[{input:"[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",expected_output:"[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",is_hidden:false}]
  },
  {
    id:"82", title:"Clone Graph", slug:"clone-graph", difficulty:"medium",
    topics:["Graph","DFS","BFS","Hash Map"], companies:["amazon","google","microsoft"],
    description:"Given node in a connected undirected graph, return deep copy of the graph.",
    examples:[{input:"adjList=[[2,4],[1,3],[2,4],[1,3]]",output:"[[2,4],[1,3],[2,4],[1,3]]"}],
    constraints:["Nodes numbered 1 to n","1≤n≤100"],
    hints:["DFS with a hash map for visited nodes","Map old node to new node to avoid cycles"],
    starter_code:{javascript:"function cloneGraph(node) {\n  \n}",python:"def clone_graph(node):\n    pass",java:"class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}",cpp:"Node* cloneGraph(Node* node) {\n    \n}"},
    test_cases:[{input:"[[2,4],[1,3],[2,4],[1,3]]",expected_output:"[[2,4],[1,3],[2,4],[1,3]]",is_hidden:false}]
  },
  {
    id:"83", title:"Walls and Gates", slug:"walls-and-gates", difficulty:"medium",
    topics:["Graph","BFS","Matrix"], companies:["amazon","google","facebook"],
    description:"Given m×n grid with -1 (walls), 0 (gates), INF (empty rooms), fill each empty room with distance to nearest gate.",
    examples:[{input:"rooms=[[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]",output:"[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]"}],
    constraints:["m,n≥1"],
    hints:["Multi-source BFS from all gates simultaneously","Distances propagate outward correctly"],
    starter_code:{javascript:"function wallsAndGates(rooms) {\n  \n}",python:"def walls_and_gates(rooms):\n    pass",java:"class Solution {\n    public void wallsAndGates(int[][] rooms) {\n        \n    }\n}",cpp:"void wallsAndGates(vector<vector<int>>& rooms) {\n    \n}"},
    test_cases:[{input:"multi-source BFS problem",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"84", title:"Accounts Merge", slug:"accounts-merge", difficulty:"medium",
    topics:["Graph","Union Find","DFS","String"], companies:["amazon","google","microsoft"],
    description:"Given list of accounts where each element is list [name, email1, email2...], merge accounts belonging to same person. Same person has same email in different entries.",
    examples:[{input:"accounts=[['John','johnsmith@mail.com','john_newyork@mail.com'],['John','johnsmith@mail.com','john00@mail.com'],['Mary','mary@mail.com'],['John','johnnybravo@mail.com']]",output:"[['John','john00@mail.com','john_newyork@mail.com','johnsmith@mail.com'],['Mary','mary@mail.com'],['John','johnnybravo@mail.com']]"}],
    constraints:["1≤accounts.length≤1000"],
    hints:["Union Find on emails","All emails in same component belong to same person"],
    starter_code:{javascript:"function accountsMerge(accounts) {\n  \n}",python:"def accounts_merge(accounts):\n    pass",java:"class Solution {\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\n        \n    }\n}",cpp:"vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {\n    \n}"},
    test_cases:[{input:"see description",expected_output:"see description",is_hidden:false}]
  },
  {
    id:"85", title:"Longest Consecutive Sequence", slug:"longest-consecutive-sequence", difficulty:"medium",
    topics:["Array","Hash Set","Union Find"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given unsorted array of integers nums, return length of longest consecutive elements sequence. O(n) required.",
    examples:[{input:"nums=[100,4,200,1,3,2]",output:"4",explanation:"[1,2,3,4]"},{input:"nums=[0,3,7,2,5,8,4,6,0,1]",output:"9"}],
    constraints:["O(n) time"],
    hints:["Store all numbers in a set","For each number that starts a sequence (n-1 not in set), count the streak"],
    starter_code:{javascript:"function longestConsecutive(nums) {\n  \n}",python:"def longest_consecutive(nums):\n    pass",java:"class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}",cpp:"int longestConsecutive(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[100,4,200,1,3,2]",expected_output:"4",is_hidden:false}]
  },
  {
    id:"86", title:"Partition Equal Subset Sum", slug:"partition-equal-subset", difficulty:"medium",
    topics:["Dynamic Programming","Array"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given integer array nums, return true if you can partition it into two subsets with equal sum.",
    examples:[{input:"nums=[1,5,11,5]",output:"true",explanation:"[1,5,5] and [11]"},{input:"nums=[1,2,3,5]",output:"false"}],
    constraints:["1≤nums.length≤200","1≤nums[i]≤100"],
    hints:["Target = sum/2","0/1 knapsack: dp[j] = can we form sum j"],
    starter_code:{javascript:"function canPartition(nums) {\n  \n}",python:"def can_partition(nums):\n    pass",java:"class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}",cpp:"bool canPartition(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,5,11,5]",expected_output:"true",is_hidden:false},{input:"[1,2,3,5]",expected_output:"false",is_hidden:false}]
  },
  {
    id:"87", title:"Target Sum", slug:"target-sum", difficulty:"medium",
    topics:["Dynamic Programming","DFS","Backtracking"], companies:["amazon","google","microsoft"],
    description:"Given array nums and integer target, assign + or - to each number. How many ways to make sum equal to target?",
    examples:[{input:"nums=[1,1,1,1,1], target=3",output:"5"}],
    constraints:["1≤nums.length≤20","0≤nums[i]≤1000"],
    hints:["DFS with memoization","Or reduce to subset sum problem"],
    starter_code:{javascript:"function findTargetSumWays(nums, target) {\n  \n}",python:"def find_target_sum_ways(nums, target):\n    pass",java:"class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        \n    }\n}",cpp:"int findTargetSumWays(vector<int>& nums, int target) {\n    \n}"},
    test_cases:[{input:"[1,1,1,1,1]\n3",expected_output:"5",is_hidden:false}]
  },
  {
    id:"88", title:"Burst Balloons", slug:"burst-balloons", difficulty:"hard",
    topics:["Dynamic Programming","Divide and Conquer"], companies:["amazon","google"],
    description:"Given array of balloons with nums[i] values, burst them all. Coins = nums[left]*nums[i]*nums[right] at each burst. Maximize total coins.",
    examples:[{input:"nums=[3,1,5,8]",output:"167",explanation:"3*1*5+3*5*8+1*3*8+1*8*1=167"}],
    constraints:["1≤nums.length≤300","0≤nums[i]≤100"],
    hints:["Think of last balloon to burst in a range, not first","dp[i][j] = max coins to burst all balloons between i and j"],
    starter_code:{javascript:"function maxCoins(nums) {\n  \n}",python:"def max_coins(nums):\n    pass",java:"class Solution {\n    public int maxCoins(int[] nums) {\n        \n    }\n}",cpp:"int maxCoins(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[3,1,5,8]",expected_output:"167",is_hidden:false}]
  },
  {
    id:"89", title:"Edit Distance", slug:"edit-distance", difficulty:"hard",
    topics:["Dynamic Programming","String"], companies:["amazon","google","microsoft"],
    description:"Given strings word1 and word2, return minimum operations (insert, delete, replace) to convert word1 to word2.",
    examples:[{input:"word1='horse', word2='ros'",output:"3"},{input:"word1='intention', word2='execution'",output:"5"}],
    constraints:["0≤word1.length,word2.length≤500"],
    hints:["dp[i][j] = min operations to convert word1[0..i] to word2[0..j]","If chars match: dp[i][j]=dp[i-1][j-1], else 1+min(insert,delete,replace)"],
    starter_code:{javascript:"function minDistance(word1, word2) {\n  \n}",python:"def min_distance(word1, word2):\n    pass",java:"class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}",cpp:"int minDistance(string word1, string word2) {\n    \n}"},
    test_cases:[{input:"horse\nros",expected_output:"3",is_hidden:false},{input:"intention\nexecution",expected_output:"5",is_hidden:false}]
  },
  {
    id:"90", title:"Regular Expression Matching", slug:"regex-matching", difficulty:"hard",
    topics:["Dynamic Programming","String","Recursion"], companies:["google","amazon","microsoft"],
    description:"Given input string s and pattern p, implement regex matching with '.' (matches any char) and '*' (matches zero or more of preceding element).",
    examples:[{input:'s="aa", p="a"',output:"false"},{input:'s="aa", p="a*"',output:"true"},{input:'s="ab", p=".*"',output:"true"}],
    constraints:["1≤s.length≤20","1≤p.length≤30"],
    hints:["dp[i][j] = does s[0..i] match p[0..j]","Handle '*' as zero or more of previous character"],
    starter_code:{javascript:"function isMatch(s, p) {\n  \n}",python:"def is_match(s, p):\n    pass",java:"class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}",cpp:"bool isMatch(string s, string p) {\n    \n}"},
    test_cases:[{input:"aa\na*",expected_output:"true",is_hidden:false},{input:"ab\n.*",expected_output:"true",is_hidden:false}]
  },
  {
    id:"91", title:"Permutations", slug:"permutations", difficulty:"medium",
    topics:["Array","Backtracking"], companies:["amazon","google","microsoft","flipkart"],
    description:"Given array nums of distinct integers, return all possible permutations.",
    examples:[{input:"nums=[1,2,3]",output:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"}],
    constraints:["1≤nums.length≤6","All nums distinct"],
    hints:["Backtracking: choose, explore, unchoose","Swap elements approach"],
    starter_code:{javascript:"function permute(nums) {\n  \n}",python:"def permute(nums):\n    pass",java:"class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}",cpp:"vector<vector<int>> permute(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,2,3]",expected_output:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",is_hidden:false}]
  },
  {
    id:"92", title:"Combination Sum", slug:"combination-sum", difficulty:"medium",
    topics:["Array","Backtracking"], companies:["amazon","google","microsoft"],
    description:"Given distinct integer candidates and target, return all unique combinations of candidates that sum to target. Same number may be used unlimited times.",
    examples:[{input:"candidates=[2,3,6,7], target=7",output:"[[2,2,3],[7]]"}],
    constraints:["1≤candidates.length≤30","1≤target≤40"],
    hints:["Backtracking with current sum","Start from current index to avoid duplicates"],
    starter_code:{javascript:"function combinationSum(candidates, target) {\n  \n}",python:"def combination_sum(candidates, target):\n    pass",java:"class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}",cpp:"vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    \n}"},
    test_cases:[{input:"[2,3,6,7]\n7",expected_output:"[[2,2,3],[7]]",is_hidden:false}]
  },
  {
    id:"93", title:"Letter Combinations Phone", slug:"letter-combinations-phone", difficulty:"medium",
    topics:["String","Backtracking","Hash Map"], companies:["amazon","google","microsoft"],
    description:"Given string of digits 2-9, return all possible letter combinations using phone keypad mapping.",
    examples:[{input:'digits="23"',output:'["ad","ae","af","bd","be","bf","cd","ce","cf"]'}],
    constraints:["0≤digits.length≤4"],
    hints:["Map digits to letters","Backtracking one digit at a time"],
    starter_code:{javascript:"function letterCombinations(digits) {\n  \n}",python:"def letter_combinations(digits):\n    pass",java:"class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}",cpp:"vector<string> letterCombinations(string digits) {\n    \n}"},
    test_cases:[{input:"23",expected_output:'["ad","ae","af","bd","be","bf","cd","ce","cf"]',is_hidden:false}]
  },
  {
    id:"94", title:"Subsets", slug:"subsets", difficulty:"medium",
    topics:["Array","Backtracking","Bit Manipulation"], companies:["amazon","google","microsoft","tcs"],
    description:"Given integer array nums of unique elements, return all possible subsets (power set).",
    examples:[{input:"nums=[1,2,3]",output:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"}],
    constraints:["1≤nums.length≤10","All nums unique"],
    hints:["Backtracking: include or exclude each element","Or bit manipulation: each bit represents include/exclude"],
    starter_code:{javascript:"function subsets(nums) {\n  \n}",python:"def subsets(nums):\n    pass",java:"class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}",cpp:"vector<vector<int>> subsets(vector<int>& nums) {\n    \n}"},
    test_cases:[{input:"[1,2,3]",expected_output:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",is_hidden:false}]
  },
  {
    id:"95", title:"N-Queens", slug:"n-queens", difficulty:"hard",
    topics:["Array","Backtracking"], companies:["amazon","google","microsoft"],
    description:"Place n queens on n×n chessboard so no two queens attack each other. Return all distinct solutions.",
    examples:[{input:"n=4",output:'[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]'}],
    constraints:["1≤n≤9"],
    hints:["Try placing queen in each row","Check column and diagonal conflicts"],
    starter_code:{javascript:"function solveNQueens(n) {\n  \n}",python:"def solve_n_queens(n):\n    pass",java:"class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}",cpp:"vector<vector<string>> solveNQueens(int n) {\n    \n}"},
    test_cases:[{input:"4",expected_output:'[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',is_hidden:false}]
  },
  {
    id:"96", title:"Minimum Cost to Connect Sticks", slug:"min-cost-connect-sticks", difficulty:"medium",
    topics:["Array","Greedy","Heap"], companies:["amazon","google"],
    description:"You have sticks with lengths in an integer array sticks. Combine any 2 sticks at cost = sum of lengths. Return minimum total cost to combine all sticks.",
    examples:[{input:"sticks=[2,4,3]",output:"14",explanation:"2+3=5, then 4+5=9, total=14"}],
    constraints:["1≤sticks.length≤10⁴","1≤sticks[i]≤10⁴"],
    hints:["Always combine two smallest sticks first (greedy)","Use min-heap"],
    starter_code:{javascript:"function connectSticks(sticks) {\n  \n}",python:"def connect_sticks(sticks):\n    pass",java:"class Solution {\n    public int connectSticks(int[] sticks) {\n        \n    }\n}",cpp:"int connectSticks(vector<int>& sticks) {\n    \n}"},
    test_cases:[{input:"[2,4,3]",expected_output:"14",is_hidden:false}]
  },
  {
    id:"97", title:"Task Scheduler", slug:"task-scheduler", difficulty:"medium",
    topics:["Array","Greedy","Heap","Counting"], companies:["amazon","google","microsoft"],
    description:"Given tasks array and integer n (cooldown), return least intervals CPU needed. CPU must wait n intervals before doing same task again.",
    examples:[{input:"tasks=['A','A','A','B','B','B'], n=2",output:"8"}],
    constraints:["1≤tasks.length≤10⁴","0≤n≤100"],
    hints:["Most frequent task determines answer","Slots = (maxFreq-1)*(n+1) + count of tasks with maxFreq"],
    starter_code:{javascript:"function leastInterval(tasks, n) {\n  \n}",python:"def least_interval(tasks, n):\n    pass",java:"class Solution {\n    public int leastInterval(char[] tasks, int n) {\n        \n    }\n}",cpp:"int leastInterval(vector<char>& tasks, int n) {\n    \n}"},
    test_cases:[{input:"['A','A','A','B','B','B']\n2",expected_output:"8",is_hidden:false}]
  },
  {
    id:"98", title:"Longest Valid Parentheses", slug:"longest-valid-parentheses", difficulty:"hard",
    topics:["String","Dynamic Programming","Stack"], companies:["amazon","google","microsoft"],
    description:"Given string of '(' and ')', return length of longest valid parentheses substring.",
    examples:[{input:'s="(()"',output:"2"},{input:'s=")()())"',output:"4"}],
    constraints:["0≤s.length≤3*10⁴"],
    hints:["Stack approach: store indices","DP: dp[i] = length of longest valid ending at i"],
    starter_code:{javascript:"function longestValidParentheses(s) {\n  \n}",python:"def longest_valid_parentheses(s):\n    pass",java:"class Solution {\n    public int longestValidParentheses(String s) {\n        \n    }\n}",cpp:"int longestValidParentheses(string s) {\n    \n}"},
    test_cases:[{input:"(()",expected_output:"2",is_hidden:false},{input:")()())",expected_output:"4",is_hidden:false}]
  },
  {
    id:"99", title:"Minimum Number of Arrows", slug:"min-arrows-burst-balloons", difficulty:"medium",
    topics:["Array","Greedy","Sorting"], companies:["amazon","google"],
    description:"Given 2D array points where points[i]=[xstart,xend] represents balloon. Arrow shot at x bursts all balloons with xstart≤x≤xend. Return minimum arrows.",
    examples:[{input:"points=[[10,16],[2,8],[1,6],[7,12]]",output:"2"}],
    constraints:["1≤points.length≤10⁵"],
    hints:["Sort by end position","Shoot arrow at end of first balloon, skip all balloons it bursts"],
    starter_code:{javascript:"function findMinArrowShots(points) {\n  \n}",python:"def find_min_arrow_shots(points):\n    pass",java:"class Solution {\n    public int findMinArrowShots(int[][] points) {\n        \n    }\n}",cpp:"int findMinArrowShots(vector<vector<int>>& points) {\n    \n}"},
    test_cases:[{input:"[[10,16],[2,8],[1,6],[7,12]]",expected_output:"2",is_hidden:false}]
  },
  {
    id:"100", title:"Max Points on a Line", slug:"max-points-on-line", difficulty:"hard",
    topics:["Array","Math","Hash Map","Geometry"], companies:["amazon","google","microsoft"],
    description:"Given array of points, return maximum number of points that lie on the same straight line.",
    examples:[{input:"points=[[1,1],[2,2],[3,3]]",output:"3"},{input:"points=[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]",output:"4"}],
    constraints:["1≤points.length≤300"],
    hints:["For each point, compute slope to every other point","Points with same slope are collinear"],
    starter_code:{javascript:"function maxPoints(points) {\n  \n}",python:"def max_points(points):\n    pass",java:"class Solution {\n    public int maxPoints(int[][] points) {\n        \n    }\n}",cpp:"int maxPoints(vector<vector<int>>& points) {\n    \n}"},
    test_cases:[{input:"[[1,1],[2,2],[3,3]]",expected_output:"3",is_hidden:false}]
  },
]