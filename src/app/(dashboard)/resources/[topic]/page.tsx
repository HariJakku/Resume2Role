"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { PREP_TOPICS, HR_QUESTIONS, DSA_QUESTIONS, APTITUDE_QUESTIONS, SYSTEM_DESIGN_QUESTIONS } from "@/lib/data/prep"

export default function TopicDetailPage() {
  const { topic } = useParams<{ topic: string }>()
  const router    = useRouter()
  const topicData = PREP_TOPICS.find(t => t.slug === topic)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login")
    })
  }, [router])

  if (!topicData) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 18, color: "#fff", marginBottom: 16 }}>Topic not found</div>
        <Link href="/resources" className="btn-primary">Back to resources</Link>
      </div>
    </div>
  )

  function getQuestions() {
    if (topicData!.category === "hr")            return HR_QUESTIONS
    if (topicData!.category === "aptitude")      return APTITUDE_QUESTIONS
    if (topicData!.category === "system-design") return SYSTEM_DESIGN_QUESTIONS
    if (topicData!.category === "dsa")           return DSA_QUESTIONS.filter(q => q.topic_id === topicData!.id)
    return HR_QUESTIONS.slice(0, 5)
  }

  const DSA_NOTES: Record<string, any[]> = {
    "dsa-arrays": [
  {
    "title": "Array fundamentals",
    "content": "Arrays store elements in contiguous memory locations and allow direct index-based access.\n\nMemory:\n- Each element stored sequentially\n- Address = base + index * size\n\nTime complexities:\n- Access: O(1)\n- Search: O(n)\n- Insert at end: O(1) amortized\n- Insert at position: O(n)\n- Delete: O(n)\n\nTypes:\n- Static arrays: fixed size\n- Dynamic arrays: resizable (ArrayList, vector)\n\nOperations:\n- Traversal (iterate all elements)\n- Insertion (shift elements right)\n- Deletion (shift elements left)\n\nWhen to use:\n- When fast access is needed\n- When data size is known or manageable\n\nKey patterns:\n- Two pointers\n- Sliding window\n- Prefix sum\n\nCommon mistakes:\n- Index out of bounds\n- Using O(n^2) instead of O(n)\n- Not handling edge cases like empty arrays"
  },
  {
    "title": "Searching & Binary Search",
    "content": "Searching is used to locate an element efficiently in an array.\n\nLinear Search:\n- Works on unsorted arrays\n- Time: O(n)\n\nBinary Search:\n- Works only on sorted arrays\n- Time: O(log n)\n\nBinary search logic:\n- mid = low + (high - low) / 2\n- If target < mid → move left\n- Else → move right\n\nImportant variations:\n- First occurrence\n- Last occurrence\n- Lower bound (>= target)\n- Upper bound (> target)\n- Search in rotated sorted array\n- Peak element\n\nWhen to use:\n- When array is sorted\n- When search needs to be optimized\n\nCommon mistakes:\n- Infinite loops due to wrong mid update\n- Applying binary search on unsorted array\n- Ignoring edge conditions"
  },
  {
    "title": "Sorting algorithms",
    "content": "Sorting arranges elements in a specific order to improve searching and processing.\n\nBasic sorting (O(n^2)):\n- Bubble Sort: repeated swapping\n- Selection Sort: select minimum\n- Insertion Sort: insert in sorted portion\n\nAdvanced sorting (O(n log n)):\n- Merge Sort: divide and merge\n- Quick Sort: pivot-based partition\n\nOther:\n- Counting Sort: works for limited range\n\nConcepts:\n- Stable vs unstable sorting\n- In-place vs extra space\n\nWhen to use:\n- Preprocessing for binary search\n- Ordering data for optimization\n\nCommon mistakes:\n- Using slow sorts in interviews\n- Not understanding recursion in merge/quick sort\n- Wrong partition logic"
  },
  {
    "title": "Subarrays & Prefix Sum",
    "content": "A subarray is a continuous segment of an array.\n\nPrefix sum is used to compute range sums efficiently.\n\nFormula:\n- prefix[i] = sum of elements till i\n- Sum(l, r) = prefix[r] - prefix[l-1]\n\nKadane's Algorithm:\n- Finds maximum subarray sum in O(n)\n\nApplications:\n- Range sum queries\n- Subarray sum equals K\n- Longest subarray problems\n\nWhen to use:\n- When multiple range queries exist\n- When brute force is O(n^2)\n\nCommon mistakes:\n- Not handling negative numbers\n- Using nested loops unnecessarily\n- Incorrect prefix calculations"
  },
  {
    "title": "Sliding Window",
    "content": "Sliding window optimizes subarray and substring problems by maintaining a dynamic range.\n\nTypes:\n- Fixed window: size remains constant\n- Variable window: expands and shrinks\n\nApproach:\n- Expand right pointer\n- Shrink left pointer when condition breaks\n- Update result during valid window\n\nTime: O(n)\n\nApplications:\n- Maximum sum subarray\n- Longest substring without repeating characters\n- Minimum window substring\n\nWhen to use:\n- When dealing with contiguous segments\n- When brute force is O(n^2)\n\nCommon mistakes:\n- Not shrinking window properly\n- Using extra loops\n- Mismanaging conditions"
  },
  {
    "title": "Two Pointers technique",
    "content": "Two pointers technique uses two indices to traverse array efficiently.\n\nTypes:\n- Opposite direction (start, end)\n- Same direction (slow, fast)\n- Fast & slow pointer (cycle detection)\n\nApplications:\n- Pair sum in sorted array\n- Removing duplicates\n- Reversing array\n\nTime: O(n)\nSpace: O(1)\n\nWhen to use:\n- When array is sorted\n- When reducing nested loops\n\nCommon mistakes:\n- Not sorting when required\n- Pointer mismanagement\n- Missing edge cases"
  },
  {
    "title": "Hashing",
    "content": "Hashing stores data in key-value format for constant time lookup.\n\nStructures:\n- HashMap (key-value)\n- HashSet (unique elements)\n- Frequency array\n\nTime:\n- Insert/Search/Delete: O(1) average\n\nApplications:\n- Two Sum\n- Frequency counting\n- Longest consecutive sequence\n\nWhen to use:\n- When fast lookup is needed\n- When reducing time complexity\n\nCommon mistakes:\n- Ignoring collisions\n- Overusing hashing\n- High space usage"
  },
  {
    "title": "Matrix (2D Arrays)",
    "content": "Matrix is a 2D array used for grid-based computations.\n\nTraversal:\n- Row-wise\n- Column-wise\n- Diagonal\n\nTechniques:\n- Spiral traversal\n- Transpose matrix\n- Rotate matrix\n\nApplications:\n- Grid problems\n- Image processing\n\nWhen to use:\n- When dealing with rows and columns\n\nCommon mistakes:\n- Index confusion\n- Not visualizing matrix\n- Extra space usage"
  },
  {
    "title": "String basics",
    "content": "Strings are sequences of characters, often immutable.\n\nConcepts:\n- Immutable vs mutable\n- Character arrays\n\nOperations:\n- Length\n- Substring\n- Concatenation\n\nApplications:\n- Text processing\n- Validation problems\n\nCommon problems:\n- Reverse string\n- Palindrome check\n- Anagram check\n\nCommon mistakes:\n- Inefficient concatenation\n- Ignoring edge cases\n- Case sensitivity issues"
  },
  {
    "title": "String algorithms",
    "content": "String algorithms efficiently match patterns in text.\n\nAlgorithms:\n- KMP: uses prefix table (LPS)\n- Rabin-Karp: hashing technique\n- Z Algorithm: pattern preprocessing\n\nTime: O(n)\n\nApplications:\n- Pattern matching\n- Substring search\n\nWhen to use:\n- Large text search problems\n\nCommon mistakes:\n- Incorrect preprocessing\n- Hardcoding logic without understanding"
  },
  {
    "title": "Advanced patterns",
    "content": "Advanced patterns combine multiple concepts and appear in high-level interviews.\n\nConcepts:\n- Monotonic stack\n- Next greater element\n- Merge intervals\n- Greedy algorithms\n\nApplications:\n- Trapping rain water\n- Largest rectangle in histogram\n\nWhen to use:\n- Complex optimization problems\n\nCommon mistakes:\n- Not identifying pattern\n- Overcomplicating solution"
  },
  {
    "title": "Interview problem sets",
    "content": "Problems categorized by difficulty for structured preparation.\n\nBeginner:\n- Two Sum\n- Move Zeroes\n\nIntermediate:\n- 3Sum\n- Longest substring without repeating\n\nAdvanced:\n- Trapping rain water\n- Sliding window maximum\n\nGoal:\n- Pattern recognition\n- Optimization thinking"
  },
  {
    "title": "Complexity masterclass",
    "content": "Time and space complexity measure efficiency of algorithms.\n\nCommon complexities:\n- O(n): traversal\n- O(log n): binary search\n- O(n^2): nested loops\n- O(n log n): sorting\n\nKey ideas:\n- Reduce brute force\n- Optimize step by step\n- Trade time vs space\n\nGoal:\n- Write efficient code\n- Explain complexity clearly in interviews"
  }
],
    "dsa-trees": [
  {
    "title": "Tree fundamentals",
    "content": "A tree is a hierarchical data structure with nodes connected by edges.\n\nCore concepts:\n- Root: top node\n- Parent/Child: relationship\n- Leaf: node with no children\n- Height: longest path from node to leaf\n- Depth: distance from root\n\nProperties:\n- Edges = Nodes - 1\n- Only one path between any two nodes\n\nUse cases:\n- File systems\n- Hierarchical data\n\nCode (Node structure - Java):\nclass TreeNode {\n  int val;\n  TreeNode left, right;\n  TreeNode(int x) { val = x; }\n}"
  },
  {
    "title": "Binary Trees & Traversals",
    "content": "Binary tree: each node has at most 2 children.\n\nTypes:\n- Full: 0 or 2 children\n- Complete: filled level-wise\n- Perfect: all levels filled\n- Skewed: one-sided\n\nTraversals:\n- Inorder (LNR)\n- Preorder (NLR)\n- Postorder (LRN)\n- Level order (BFS)\n\nCode (Inorder traversal):\nvoid inorder(TreeNode root) {\n  if(root == null) return;\n  inorder(root.left);\n  System.out.print(root.val);\n  inorder(root.right);\n}\n\nUse cases:\n- Expression trees\n- Parsing problems"
  },
  {
    "title": "Binary Search Tree (BST)",
    "content": "BST follows ordering property:\nLeft < Root < Right\n\nOperations:\n- Search, Insert, Delete → O(log n)\n\nCode (Search in BST):\nTreeNode search(TreeNode root, int key) {\n  if(root == null || root.val == key) return root;\n  if(key < root.val) return search(root.left, key);\n  return search(root.right, key);\n}\n\nProblems:\n- Validate BST\n- Kth smallest\n\nUse case:\n- Fast searching and sorting"
  },
  {
    "title": "Balanced Trees",
    "content": "Balanced trees maintain height ~ log(n) for efficient operations.\n\nTypes:\n- AVL Tree\n- Red-Black Tree\n- B-Tree\n\nWhy important:\n- Prevent skewed tree (O(n))\n- Maintain O(log n) operations\n\nUse cases:\n- Databases\n- File systems\n\nInsight:\nSelf-balancing ensures consistent performance"
  },
  {
    "title": "Heap (Priority Queue)",
    "content": "Heap is a complete binary tree.\n\nTypes:\n- Min Heap: parent <= children\n- Max Heap: parent >= children\n\nOperations:\n- Insert → O(log n)\n- Delete → O(log n)\n\nCode (Heap using PriorityQueue in Java):\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.add(10);\nminHeap.add(5);\nminHeap.poll();\n\nProblems:\n- Kth largest element\n- Top K frequent\n\nUse cases:\n- Scheduling\n- Priority-based tasks"
  },
  {
    "title": "Graph fundamentals",
    "content": "Graph consists of vertices (nodes) and edges.\n\nTypes:\n- Directed / Undirected\n- Weighted / Unweighted\n- Cyclic / Acyclic\n\nRepresentation:\n- Adjacency List (efficient)\n- Adjacency Matrix\n\nCode (Adjacency List):\nList<List<Integer>> graph = new ArrayList<>();\n\nUse cases:\n- Social networks\n- Maps\n\nKey idea:\nGraphs model relationships"
  },
  {
    "title": "Graph Traversal (BFS & DFS)",
    "content": "Traversal explores all nodes in graph.\n\nBFS:\n- Uses queue\n- Shortest path in unweighted graph\n\nDFS:\n- Uses recursion/stack\n- Depth exploration\n\nCode (DFS):\nvoid dfs(int node, boolean[] visited) {\n  visited[node] = true;\n  for(int nei : graph.get(node)) {\n    if(!visited[nei]) dfs(nei, visited);\n  }\n}\n\nProblems:\n- Number of islands\n- Cycle detection\n\nTime: O(V + E)"
  },
  {
    "title": "Shortest Path Algorithms",
    "content": "Used to find minimum distance between nodes.\n\nAlgorithms:\n- Dijkstra (non-negative weights)\n- Bellman-Ford (handles negative weights)\n- Floyd Warshall (all pairs)\n\nCode (Dijkstra - priority queue idea):\nPriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);\n\nProblems:\n- Network delay time\n- Grid shortest path\n\nUse cases:\n- GPS navigation\n- Routing systems"
  },
  {
    "title": "Minimum Spanning Tree (MST)",
    "content": "Connect all nodes with minimum total edge weight.\n\nAlgorithms:\n- Prim's Algorithm\n- Kruskal's Algorithm (uses DSU)\n\nCode (Union-Find basics):\nint find(int x) {\n  if(parent[x] != x)\n    parent[x] = find(parent[x]);\n  return parent[x];\n}\n\nUse cases:\n- Network design\n- Cable wiring\n\nKey idea:\nNo cycles, minimum cost"
  },
  {
    "title": "Topological Sort",
    "content": "Ordering of nodes in Directed Acyclic Graph (DAG).\n\nAlgorithms:\n- Kahn's Algorithm (BFS)\n- DFS-based\n\nCode (Kahn's idea):\nQueue<Integer> q = new LinkedList<>();\n\nProblems:\n- Course schedule\n- Task scheduling\n\nKey idea:\nDependencies ordering"
  },
  {
    "title": "Advanced Graph Concepts",
    "content": "Advanced algorithms for deep graph analysis.\n\nConcepts:\n- Strongly Connected Components (SCC)\n- Kosaraju's Algorithm\n- Tarjan's Algorithm\n- Bridges & Articulation Points\n\nUse cases:\n- Network failure detection\n\nProblems:\n- Critical connections\n\nInsight:\nUsed in high-level system design"
  },
  {
    "title": "Advanced Tree Concepts",
    "content": "Advanced trees solve range and prefix problems.\n\nStructures:\n- Trie (prefix tree)\n- Segment Tree\n- Fenwick Tree (BIT)\n\nCode (Trie insert):\nclass TrieNode {\n  TrieNode[] children = new TrieNode[26];\n}\n\nProblems:\n- Autocomplete\n- Range queries\n\nUse cases:\n- Search engines\n- Competitive programming"
  },
  {
    "title": "Disjoint Set (Union-Find)",
    "content": "Efficient structure to manage connected components.\n\nOperations:\n- Find\n- Union\n\nOptimizations:\n- Path compression\n- Union by rank\n\nCode:\nvoid union(int a, int b) {\n  int pa = find(a);\n  int pb = find(b);\n  if(pa != pb) parent[pa] = pb;\n}\n\nUse cases:\n- Cycle detection\n- MST (Kruskal)\n\nTime: almost O(1)"
  },
  {
    "title": "Interview problem patterns",
    "content": "Problems categorized for interview readiness.\n\nBeginner:\n- Tree traversal\n- BFS/DFS\n\nIntermediate:\n- LCA\n- Cycle detection\n- Topological sort\n\nAdvanced:\n- Dijkstra\n- MST\n- SCC\n\nGoal:\n- Identify patterns quickly\n- Optimize solutions"
  },
  {
    "title": "Complexity insights",
    "content": "Understanding complexity is essential.\n\nCommon complexities:\n- DFS/BFS: O(V + E)\n- Dijkstra: O(E log V)\n- BST operations: O(log n)\n- Heap operations: O(log n)\n\nKey idea:\n- Optimize graph traversal\n- Use correct data structure\n\nGoal:\n- Write efficient scalable solutions"
  }
],
    "dsa-dp": [
  {
    "title": "DP fundamentals",
    "content": "Dynamic Programming solves problems by breaking them into overlapping subproblems and storing results.\n\nCore concepts:\n- Overlapping subproblems\n- Optimal substructure\n- State definition\n- Transition (recurrence)\n\nApproaches:\n- Memoization (top-down)\n- Tabulation (bottom-up)\n\nCode (Fibonacci - Tabulation):\nint fib(int n) {\n  int[] dp = new int[n+1];\n  dp[0] = 0; dp[1] = 1;\n  for(int i=2;i<=n;i++)\n    dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}",
    "difficulty": "Easy",
    "companies": ["TCS", "Infosys", "Wipro", "Capgemini"]
  },
  {
    "title": "1D DP (Linear DP)",
    "content": "State depends on previous values.\n\nPattern:\ndp[i] = best answer till index i\n\nProblems:\n- Climbing stairs\n- House robber\n\nCode (House Robber):\nint rob(int[] nums) {\n  int prev2 = 0, prev1 = 0;\n  for(int num : nums) {\n    int curr = Math.max(prev1, prev2 + num);\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}",
    "difficulty": "Easy",
    "companies": ["Amazon", "Adobe", "PayPal"]
  },
  {
    "title": "2D DP (Grid DP)",
    "content": "State depends on top/left cells.\n\nPattern:\ndp[i][j] = dp[i-1][j] + dp[i][j-1]\n\nProblems:\n- Unique paths\n- Minimum path sum\n\nCode (Unique Paths):\nint uniquePaths(int m, int n) {\n  int[][] dp = new int[m][n];\n  for(int i=0;i<m;i++) dp[i][0]=1;\n  for(int j=0;j<n;j++) dp[0][j]=1;\n  for(int i=1;i<m;i++)\n    for(int j=1;j<n;j++)\n      dp[i][j] = dp[i-1][j] + dp[i][j-1];\n  return dp[m-1][n-1];\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Google"]
  },
  {
    "title": "Knapsack pattern",
    "content": "Decision-based DP: Take or Not Take.\n\nState:\ndp[i][w] = max value using first i items and weight w\n\nProblems:\n- 0/1 Knapsack\n- Subset sum\n- Coin change\n\nCode (Subset Sum):\nboolean subsetSum(int[] arr, int sum) {\n  boolean[][] dp = new boolean[arr.length+1][sum+1];\n  for(int i=0;i<=arr.length;i++) dp[i][0] = true;\n  for(int i=1;i<=arr.length;i++) {\n    for(int j=1;j<=sum;j++) {\n      if(arr[i-1] <= j)\n        dp[i][j] = dp[i-1][j] || dp[i-1][j-arr[i-1]];\n      else\n        dp[i][j] = dp[i-1][j];\n    }\n  }\n  return dp[arr.length][sum];\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Flipkart", "Goldman Sachs"]
  },
  {
    "title": "String DP",
    "content": "DP applied on strings.\n\nProblems:\n- Longest Common Subsequence\n- Edit Distance\n\nCode (LCS):\nint lcs(String s1, String s2) {\n  int[][] dp = new int[s1.length()+1][s2.length()+1];\n  for(int i=1;i<=s1.length();i++)\n    for(int j=1;j<=s2.length();j++)\n      if(s1.charAt(i-1)==s2.charAt(j-1))\n        dp[i][j]=1+dp[i-1][j-1];\n      else\n        dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);\n  return dp[s1.length()][s2.length()];\n}",
    "difficulty": "Medium",
    "companies": ["Google", "Microsoft", "Amazon"]
  },
  {
    "title": "LIS (Longest Increasing Subsequence)",
    "content": "Find longest increasing subsequence.\n\nApproaches:\n- DP O(n^2)\n- Binary Search O(n log n)\n\nCode (Optimized):\nint lis(int[] nums) {\n  List<Integer> list = new ArrayList<>();\n  for(int num : nums) {\n    int idx = Collections.binarySearch(list, num);\n    if(idx < 0) idx = -(idx+1);\n    if(idx == list.size()) list.add(num);\n    else list.set(idx, num);\n  }\n  return list.size();\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Uber"]
  },
  {
    "title": "Partition DP",
    "content": "Split problem into partitions and optimize.\n\nPattern:\nTry all partition points\n\nProblems:\n- Matrix Chain Multiplication\n- Palindrome partitioning\n\nCode (MCM idea):\nfor(int k=i;k<j;k++) {\n  dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + cost);\n}",
    "difficulty": "Hard",
    "companies": ["Google", "Amazon", "Microsoft"]
  },
  {
    "title": "DP on stocks",
    "content": "State-based DP with buy/sell decisions.\n\nState:\n(index, buy/sell, transactions left)\n\nCode (Buy & Sell once):\nint maxProfit(int[] prices) {\n  int min = Integer.MAX_VALUE, profit = 0;\n  for(int p : prices) {\n    min = Math.min(min, p);\n    profit = Math.max(profit, p - min);\n  }\n  return profit;\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Facebook", "Google"]
  },
  {
    "title": "DP on trees",
    "content": "Apply DP with DFS on trees.\n\nIdea:\nEach node returns values to parent\n\nProblems:\n- House Robber III\n- Tree diameter\n\nCode (Tree DP idea):\nint dfs(TreeNode root) {\n  if(root == null) return 0;\n  int left = dfs(root.left);\n  int right = dfs(root.right);\n  return Math.max(left, right) + root.val;\n}",
    "difficulty": "Hard",
    "companies": ["Google", "Amazon"]
  },
  {
    "title": "Bitmask DP",
    "content": "Use bits to represent subsets.\n\nUsed for:\n- Traveling Salesman Problem\n\nCode (bitmask check):\nif((mask & (1 << i)) != 0) {\n  // element i is included\n}",
    "difficulty": "Hard",
    "companies": ["Google", "Uber", "Atlassian"]
  },
  {
    "title": "Interval DP",
    "content": "DP on ranges.\n\nPattern:\nSolve for smaller intervals first\n\nProblems:\n- Burst Balloons\n- Optimal BST\n\nCode idea:\nfor(int len=1;len<n;len++) {\n  for(int i=0;i<n-len;i++) {\n    int j = i + len;\n  }\n}",
    "difficulty": "Hard",
    "companies": ["Google", "Amazon"]
  },
  {
    "title": "DP optimization techniques",
    "content": "Techniques to improve DP performance.\n\nMethods:\n- Space optimization (1D arrays)\n- Binary search optimization\n- Monotonic queue\n\nGoal:\nReduce time and space complexity",
    "difficulty": "Hard",
    "companies": ["Google", "Meta", "Amazon"]
  },
  {
    "title": "DP thinking approach",
    "content": "Step-by-step DP strategy:\n1. Identify DP problem\n2. Define state\n3. Write recurrence\n4. Apply memoization\n5. Convert to tabulation\n6. Optimize space\n\nKey insight:\nThink in states, not brute force",
    "difficulty": "Medium",
    "companies": ["All Companies"]
  },
  {
    "title": "DP complexity insights",
    "content": "Common DP complexities:\n- 1D DP: O(n)\n- 2D DP: O(n^2)\n- Knapsack: O(n × W)\n- LIS optimized: O(n log n)\n\nGoal:\nUnderstand performance trade-offs",
    "difficulty": "Easy",
    "companies": ["All Companies"]
  }
],
    "dsa-sorting": [
  {
    "title": "Bubble Sort",
    "content": "Repeatedly swaps adjacent elements if they are in wrong order.\n\nIdea:\nLargest element moves to end after each pass.\n\nTime:\n- Worst/Average: O(n^2)\n- Best: O(n) (already sorted)\n\nCode:\nfor(int i=0;i<n;i++) {\n  for(int j=0;j<n-i-1;j++) {\n    if(arr[j] > arr[j+1]) {\n      int temp = arr[j];\n      arr[j] = arr[j+1];\n      arr[j+1] = temp;\n    }\n  }\n}",
    "difficulty": "Easy",
    "companies": ["TCS", "Infosys", "Wipro"]
  },
  {
    "title": "Selection Sort",
    "content": "Select minimum element and place it at correct position.\n\nIdea:\nFind min from unsorted part and swap.\n\nTime: O(n^2)\n\nCode:\nfor(int i=0;i<n;i++) {\n  int min = i;\n  for(int j=i+1;j<n;j++)\n    if(arr[j] < arr[min]) min = j;\n  int temp = arr[i];\n  arr[i] = arr[min];\n  arr[min] = temp;\n}",
    "difficulty": "Easy",
    "companies": ["TCS", "Capgemini"]
  },
  {
    "title": "Insertion Sort",
    "content": "Builds sorted array one element at a time.\n\nIdea:\nInsert current element into its correct position in sorted part.\n\nTime:\n- Worst: O(n^2)\n- Best: O(n)\n\nBest for small or nearly sorted data.\n\nCode:\nfor(int i=1;i<n;i++) {\n  int key = arr[i];\n  int j = i-1;\n  while(j>=0 && arr[j] > key) {\n    arr[j+1] = arr[j];\n    j--;\n  }\n  arr[j+1] = key;\n}",
    "difficulty": "Easy",
    "companies": ["Infosys", "TCS"]
  },
  {
    "title": "Merge Sort",
    "content": "Divide array into halves, sort recursively, then merge.\n\nProperties:\n- Stable sort\n- Uses extra space\n\nTime: O(n log n)\n\nCode (merge logic):\nvoid merge(int[] arr, int l, int m, int r) {\n  int[] temp = new int[r-l+1];\n  int i=l, j=m+1, k=0;\n  while(i<=m && j<=r) {\n    if(arr[i] < arr[j]) temp[k++] = arr[i++];\n    else temp[k++] = arr[j++];\n  }\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft"]
  },
  {
    "title": "Quick Sort",
    "content": "Select a pivot and partition array around it.\n\nIdea:\nElements smaller go left, larger go right.\n\nTime:\n- Average: O(n log n)\n- Worst: O(n^2)\n\nCode (partition):\nint partition(int[] arr, int low, int high) {\n  int pivot = arr[high];\n  int i = low - 1;\n  for(int j=low;j<high;j++) {\n    if(arr[j] < pivot) {\n      i++;\n      int temp = arr[i]; arr[i]=arr[j]; arr[j]=temp;\n    }\n  }\n  int temp = arr[i+1]; arr[i+1]=arr[high]; arr[high]=temp;\n  return i+1;\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Adobe"]
  },
  {
    "title": "Pivot concept (Quick Sort)",
    "content": "Pivot is the element used to divide array into two parts.\n\nLeft side: elements smaller than pivot\nRight side: elements greater than pivot\n\nChoosing good pivot improves performance.\n\nCommon choices:\n- First element\n- Last element\n- Random element\n\nKey idea:\nBalanced partition → O(n log n)",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google"]
  },
  {
    "title": "Heap Sort",
    "content": "Uses heap data structure (binary tree).\n\nSteps:\n1. Build max heap\n2. Extract max and heapify\n\nTime: O(n log n)\n\nCode (heapify):\nvoid heapify(int[] arr, int n, int i) {\n  int largest = i;\n  int l = 2*i+1, r = 2*i+2;\n  if(l<n && arr[l] > arr[largest]) largest = l;\n  if(r<n && arr[r] > arr[largest]) largest = r;\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Flipkart"]
  },
  {
    "title": "Counting Sort",
    "content": "Counts frequency of elements instead of comparing.\n\nSteps:\n1. Count occurrences\n2. Build output array\n\nTime: O(n + k)\n(k = range of values)\n\nBest for small integer ranges.\n\nCode:\nint[] count = new int[k+1];\nfor(int num : arr) count[num]++;",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google"]
  },
  {
    "title": "Radix Sort",
    "content": "Sort numbers digit by digit.\n\nUses counting sort internally.\n\nSteps:\n- Sort by least significant digit\n- Move to most significant\n\nTime: O(nk)\n\nBest for large numbers with fixed digits.",
    "difficulty": "Hard",
    "companies": ["Google", "Amazon"]
  },
  {
    "title": "Bucket Sort",
    "content": "Distribute elements into buckets and sort individually.\n\nWorks best for uniformly distributed data.\n\nSteps:\n1. Create buckets\n2. Distribute elements\n3. Sort each bucket\n\nTime: O(n + k)",
    "difficulty": "Hard",
    "companies": ["Google"]
  },
  {
    "title": "Sorting classification",
    "content": "Sorting types:\n\nComparison-based:\n- Bubble, Selection, Insertion\n- Merge, Quick, Heap\n\nNon-comparison:\n- Counting, Radix, Bucket\n\nKey idea:\nComparison sorts → O(n log n) limit\nNon-comparison → faster for specific cases",
    "difficulty": "Easy",
    "companies": ["All Companies"]
  }
],
    "dsa-stacks": [
  {
    "title": "Stack fundamentals",
    "content": "Stack follows LIFO (Last In First Out).\n\nCore operations:\n- push(): insert element\n- pop(): remove top\n- peek(): view top\n- isEmpty()\n\nImplementation:\n- Array-based\n- Linked List\n\nCode (Array Stack):\nStack<Integer> stack = new Stack<>();\nstack.push(10);\nstack.pop();\n\nUse cases:\n- Function calls (call stack)\n- Undo/Redo operations\n- Expression evaluation\n\nKey idea:\nSingle access point (top)",
    "difficulty": "Easy",
    "companies": ["TCS", "Infosys", "Wipro"]
  },
  {
    "title": "Stack applications",
    "content": "Stacks are widely used in parsing and recursion.\n\nApplications:\n- Parenthesis validation\n- Expression evaluation\n- Backtracking\n\nCode (Valid Parentheses):\nboolean isValid(String s) {\n  Stack<Character> st = new Stack<>();\n  for(char c : s.toCharArray()) {\n    if(c=='(') st.push(c);\n    else {\n      if(st.isEmpty()) return false;\n      st.pop();\n    }\n  }\n  return st.isEmpty();\n}",
    "difficulty": "Easy",
    "companies": ["Amazon", "Microsoft"]
  },
  {
    "title": "Monotonic Stack",
    "content": "Stack that maintains increasing or decreasing order.\n\nTypes:\n- Increasing stack\n- Decreasing stack\n\nUsed for:\n- Next Greater Element\n- Stock Span\n- Histogram problems\n\nCode (Next Greater Element idea):\nStack<Integer> st = new Stack<>();\nfor(int i=n-1;i>=0;i--) {\n  while(!st.isEmpty() && st.peek() <= arr[i]) st.pop();\n  st.push(arr[i]);\n}\n\nTime: O(n)",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Adobe"]
  },
  {
    "title": "Expression problems",
    "content": "Used in parsing and evaluation.\n\nConversions:\n- Infix → Postfix\n- Infix → Prefix\n\nEvaluation:\n- Postfix evaluation using stack\n\nCode (Postfix evaluation):\nint eval(String[] tokens) {\n  Stack<Integer> st = new Stack<>();\n  for(String t : tokens) {\n    if(t.equals(\"+\")) st.push(st.pop() + st.pop());\n    else st.push(Integer.parseInt(t));\n  }\n  return st.pop();\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft"]
  },
  {
    "title": "Min Stack (Special Stack)",
    "content": "Stack supporting getMin() in O(1).\n\nApproach:\nUse extra stack to track minimums.\n\nCode:\nStack<Integer> stack = new Stack<>();\nStack<Integer> minStack = new Stack<>();\n\nvoid push(int x) {\n  stack.push(x);\n  if(minStack.isEmpty() || x <= minStack.peek())\n    minStack.push(x);\n}",
    "difficulty": "Medium",
    "companies": ["Amazon", "Flipkart"]
  },
  {
    "title": "Queue fundamentals",
    "content": "Queue follows FIFO (First In First Out).\n\nCore operations:\n- enqueue(): insert\n- dequeue(): remove\n- peek(): front element\n- isEmpty()\n\nImplementation:\n- Array-based\n- Linked List\n\nCode:\nQueue<Integer> q = new LinkedList<>();\nq.add(10);\nq.poll();\n\nUse cases:\n- Scheduling\n- BFS traversal\n\nKey idea:\nFirst element processed first",
    "difficulty": "Easy",
    "companies": ["TCS", "Infosys"]
  },
  {
    "title": "Queue applications",
    "content": "Queues manage order of execution.\n\nApplications:\n- CPU scheduling\n- BFS traversal\n- Printer queue\n\nCode (BFS idea):\nQueue<Integer> q = new LinkedList<>();\nq.add(start);\nwhile(!q.isEmpty()) {\n  int node = q.poll();\n}",
    "difficulty": "Easy",
    "companies": ["Amazon", "Microsoft"]
  },
  {
    "title": "Circular Queue",
    "content": "Circular queue reuses empty space.\n\nIdea:\nUse modulo to wrap around.\n\nCode:\nrear = (rear + 1) % size;\n\nBenefits:\n- Avoids overflow\n- Efficient memory usage",
    "difficulty": "Medium",
    "companies": ["Infosys", "TCS"]
  },
  {
    "title": "Deque (Double Ended Queue)",
    "content": "Allows insertion/removal from both ends.\n\nOperations:\n- addFirst()\n- addLast()\n- removeFirst()\n- removeLast()\n\nCode:\nDeque<Integer> dq = new LinkedList<>();\ndq.addFirst(10);\ndq.addLast(20);\n\nUsed in:\n- Sliding window problems",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google"]
  },
  {
    "title": "Priority Queue (Heap)",
    "content": "Elements processed based on priority.\n\nImplemented using heap.\n\nCode:\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(10);\npq.poll();\n\nApplications:\n- Dijkstra\n- Scheduling\n\nTime:\n- Insert/Delete: O(log n)",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Meta"]
  },
  {
    "title": "Monotonic Queue",
    "content": "Maintains increasing/decreasing order in queue.\n\nUsed for:\n- Sliding window maximum\n\nCode idea:\nDeque<Integer> dq = new LinkedList<>();\nwhile(!dq.isEmpty() && dq.peekLast() < num)\n  dq.pollLast();\n\ndq.addLast(num);\n\nTime: O(n)",
    "difficulty": "Hard",
    "companies": ["Google", "Amazon"]
  },
  {
    "title": "Stack vs Queue",
    "content": "Comparison:\n\nStack:\n- LIFO\n- Access: top\n- Use: recursion, parsing\n\nQueue:\n- FIFO\n- Access: front/rear\n- Use: BFS, scheduling\n\nKey idea:\nChoose based on order requirement",
    "difficulty": "Easy",
    "companies": ["All Companies"]
  },
  {
    "title": "Interview problem patterns",
    "content": "Stack problems:\n- Valid parentheses\n- Next greater element\n- Largest rectangle\n\nQueue problems:\n- Implement queue using stack\n- Sliding window maximum\n- BFS traversal\n\nGoal:\nRecognize pattern quickly",
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Microsoft"]
  }
],
  }

  const notes = DSA_NOTES[topicData.slug] || []
  const questions = getQuestions()

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ marginBottom: 8 }}>
          <Link href="/resources" style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}>← Resources</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{topicData.icon}</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{topicData.title}</h1>
            <p style={{ fontSize: 14, color: "#71717a" }}>{topicData.description} · {questions.length} questions</p>
          </div>
        </div>

        {notes.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>📖 Study Notes</h2>
            {notes.map((item, i) => (
              <div key={i} style={{ marginBottom: 12, borderRadius: 14, border: `1px solid ${expanded === `note-${i}` ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`, background: expanded === `note-${i}` ? "rgba(99,102,241,0.04)" : "#18181b", overflow: "hidden" }}>
                <button onClick={() => setExpanded(expanded === `note-${i}` ? null : `note-${i}`)}
                  style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{item.title}</span>
                  <span style={{ fontSize: 18, color: "#71717a" }}>{expanded === `note-${i}` ? "−" : "+"}</span>
                </button>
                {expanded === `note-${i}` && (
                  <div style={{ padding: "0 20px 20px", fontSize: 13, color: "#a1a1aa", lineHeight: 1.8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)" }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>❓ Practice Questions</h2>
          {questions.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#52525b", fontSize: 14 }}>No questions yet for this topic</div>
          ) : (
            questions.map((q) => (
              <div key={q.id} style={{ marginBottom: 12, borderRadius: 14, border: `1px solid ${expanded === q.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`, background: expanded === q.id ? "rgba(99,102,241,0.04)" : "#18181b", overflow: "hidden" }}>
                <button onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                  style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", textAlign: "left" }}>{q.question}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, textTransform: "capitalize", background: q.difficulty === "easy" ? "rgba(74,222,128,0.1)" : q.difficulty === "medium" ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)", color: q.difficulty === "easy" ? "#4ade80" : q.difficulty === "medium" ? "#fbbf24" : "#f87171" }}>{q.difficulty}</span>
                    <span style={{ fontSize: 18, color: "#71717a" }}>{expanded === q.id ? "−" : "+"}</span>
                  </div>
                </button>
                {expanded === q.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ padding: "0 20px 20px", fontSize: 14, color: "#a1a1aa", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, whiteSpace: "pre-wrap" }}>
                    {q.answer}
                  </motion.div>
                )}
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 32, padding: "20px 24px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ready to practice?</div>
            <div style={{ fontSize: 13, color: "#a1a1aa" }}>Start an AI mock interview to apply what you've learned</div>
          </div>
          <Link href="/mock-interview" className="btn-primary" style={{ fontSize: 14 }}>Start Mock Interview →</Link>
        </div>
      </motion.div>
    </div>
  )
}