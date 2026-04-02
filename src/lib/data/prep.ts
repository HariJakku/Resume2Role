import { PrepTopic, PrepQuestion } from "@/types"

export const PREP_TOPICS: PrepTopic[] = [
  { id:"1",  slug:"dsa-arrays",       title:"Arrays & Strings",     description:"Foundation of every coding interview",      icon:"📐", category:"dsa",           article_count:8,  question_count:15 },
  { id:"2",  slug:"dsa-trees",        title:"Trees & Graphs",       description:"BFS, DFS, BST, and graph traversal",        icon:"🌳", category:"dsa",           article_count:7,  question_count:12 },
  { id:"3",  slug:"dsa-dp",           title:"Dynamic Programming",  description:"Memoization, tabulation, classic DPs",      icon:"🧩", category:"dsa",           article_count:6,  question_count:10 },
  { id:"4",  slug:"dsa-sorting",      title:"Sorting & Searching",  description:"All sorting algorithms + binary search",    icon:"🔢", category:"dsa",           article_count:5,  question_count:10 },
  { id:"5",  slug:"dsa-stacks",       title:"Stacks & Queues",      description:"Stack, queue, deque, priority queue",       icon:"📚", category:"dsa",           article_count:4,  question_count:8  },
  { id:"6",  slug:"hr-intro",         title:"HR Questions",         description:"Tell me about yourself, strengths, goals",  icon:"🤝", category:"hr",            article_count:5,  question_count:20 },
  { id:"7",  slug:"hr-behavioural",   title:"Behavioural Round",    description:"STAR method, situational questions",        icon:"💬", category:"hr",            article_count:4,  question_count:15 },
  { id:"8",  slug:"aptitude-quant",   title:"Quantitative Aptitude","description":"Speed, profit/loss, percentages, ratios",  icon:"🔢", category:"aptitude",      article_count:6,  question_count:20 },
  { id:"9",  slug:"aptitude-logical", title:"Logical Reasoning",    description:"Puzzles, series, syllogisms, coding",       icon:"🧠", category:"aptitude",      article_count:5,  question_count:18 },
  { id:"10", slug:"system-design",    title:"System Design",        description:"Design scalable systems from scratch",      icon:"🏗️", category:"system-design", article_count:6,  question_count:12 },
  { id:"11", slug:"company-tcs",      title:"TCS",                  description:"NQT pattern, technical + HR rounds",       icon:"🔵", category:"company", company:"tcs",       article_count:4,  question_count:15 },
  { id:"12", slug:"company-infosys",  title:"Infosys",              description:"InfyTQ, Hackwithinfy prep",                icon:"🟣", category:"company", company:"infosys",   article_count:4,  question_count:12 },
  { id:"13", slug:"company-wipro",    title:"Wipro",                description:"NLTH, coding + aptitude rounds",           icon:"🟡", category:"company", company:"wipro",     article_count:3,  question_count:10 },
  { id:"14", slug:"company-amazon",   title:"Amazon",               description:"Leadership principles + DSA",              icon:"🟠", category:"company", company:"amazon",    article_count:6,  question_count:20 },
  { id:"15", slug:"company-google",   title:"Google",               description:"Algorithms, design, Googliness",           icon:"🔴", category:"company", company:"google",    article_count:8,  question_count:18 },
  { id:"16", slug:"company-microsoft",title:"Microsoft",            description:"Coding, design, behavioural",              icon:"🟦", category:"company", company:"microsoft", article_count:6,  question_count:16 },
]

export const HR_QUESTIONS: PrepQuestion[] = [
  {
    id:"hr1", topic_id:"6",
    question:"Tell me about yourself.",
    answer:`Use the Present-Past-Future formula:

**Present:** "I'm a final year B.Tech CSE student at [College]."

**Past:** "During my course I built [project] which taught me [skill]. I also [internship/achievement]."

**Future:** "I'm looking to join [company] because [specific reason that aligns with company values]."

**Duration:** 60-90 seconds. Practice until natural, not memorized.

**Example for TCS:**
"I'm a final year B.Tech CSE student at SRGEC with a CGPA of 8.2. During my studies I built a machine learning-based attendance system using OpenCV and Python which gave me hands-on experience with real-world problem solving. I've also completed certifications in Java and SQL. I want to join TCS because of its massive scale of impact across 46 countries and the structured learning programs that will help me grow rapidly as a fresher."`,
    difficulty:"easy", tags:["introduction","hr","all-companies"]
  },
  {
    id:"hr2", topic_id:"6",
    question:"What are your strengths?",
    answer:`Pick 2-3 strengths relevant to the role with evidence.

**Formula:** Strength → Specific Evidence → Measurable Impact

**Strong examples for tech roles:**

1. **Problem-solving:** "When our final year project hit a critical bug two days before submission, I stayed back, traced it to a threading issue, and fixed it. We submitted on time with the highest marks."

2. **Fast learner:** "I taught myself React.js in three weeks for a hackathon, built a working prototype, and won second place."

3. **Attention to detail:** "I spotted an off-by-one error in our team's sorting algorithm during code review that would have failed edge cases in production."

**Avoid:** "I'm hardworking", "I'm a team player" without proof — every candidate says this.`,
    difficulty:"easy", tags:["strengths","hr","all-companies"]
  },
  {
    id:"hr3", topic_id:"6",
    question:"What are your weaknesses?",
    answer:`**Never say:** "I work too hard" or "I'm a perfectionist" — interviewers see through it.

**Formula:** Real weakness → Active fix → Progress shown

**Good examples:**

1. "I used to procrastinate on large tasks. I now break them into daily milestones using Notion. My final year project was completed a week early as a result."

2. "I struggled with saying no to requests, taking on too much. I now ask 'what's the priority?' before committing, which has made me more focused."

3. "Public speaking made me nervous. I joined my college tech club and started presenting at every seminar. I recently presented to a panel of 10 professors confidently."

**Key rules:**
- Weakness must be real but not critical to the job
- Show the fix is working
- Keep it brief (30-40 seconds)`,
    difficulty:"easy", tags:["weaknesses","hr","all-companies"]
  },
  {
    id:"hr4", topic_id:"6",
    question:"Why do you want to work here?",
    answer:`Research before every interview. Generic answers fail.

**Structure:**
1. Something specific you admire about the company (product, mission, scale)
2. How your skills connect to what they do
3. What you want to learn/contribute

**For TCS:**
"TCS's scale — working with Fortune 500 clients across 46 countries — is what excites me. The iON platform and digital transformation work aligns directly with my interest in enterprise software. The TCS learning programs and structured career path for freshers make it the ideal company for me to grow fast."

**For Amazon:**
"Amazon's Leadership Principles, especially Customer Obsession and Bias for Action, align with how I approach building software. The scale of impact — products that serve hundreds of millions — is something I want to be part of."

**For a startup:**
"You're solving a problem in [domain] that I care about. The stage you're at means I'll own real features from day one, not just fix bugs. I want that responsibility early in my career."`,
    difficulty:"medium", tags:["motivation","hr","company-research"]
  },
  {
    id:"hr5", topic_id:"6",
    question:"Where do you see yourself in 5 years?",
    answer:`Show ambition connected to the company. Don't say you want to start your own company.

**Good structure:**
- Year 1-2: "Master the tech stack, deliver impactful features, understand the codebase deeply"
- Year 3-4: "Own a module end-to-end, mentor new joiners, lead small features"
- Year 5: "Technical lead or architect for a product area"

**Full example:**
"In the first two years, I want to become fully proficient in your core stack and deliver features that real users rely on. By year 3-4 I see myself owning a component or module and possibly mentoring freshers who join after me. Long term, I aspire to be a technical lead or solution architect — someone who shapes how the product is built, not just implements it. I believe [company] gives me the right challenges and mentorship to get there."

**Avoid:** Any answer suggesting you'll leave soon (MBA, startup, further studies).`,
    difficulty:"medium", tags:["career-goals","hr","all-companies"]
  },
  {
    id:"hr6", topic_id:"6",
    question:"Describe a time you failed. What did you learn?",
    answer:`This tests self-awareness and growth mindset. Never say "I've never really failed."

**STAR format:**
- **Situation:** Set the context
- **Task:** What were you responsible for
- **Action:** What you did (including the mistake)
- **Result:** What happened + what you learned

**Example:**
"In my second year, I was leading our hackathon team. I underestimated how long the backend integration would take and spent too much time on the UI. We ran out of time and submitted a half-working product. We didn't win.

What I learned: I now always build the core functionality first, then polish the UI. I also started using time-boxed sprints for any project. At our next hackathon, we shipped a working product with time to spare and won second place."

**Key:** The learning must be real and you must show you applied it.`,
    difficulty:"medium", tags:["failure","behavioural","growth"]
  },
  {
    id:"hr7", topic_id:"7",
    question:"Tell me about a time you worked in a team and had a conflict.",
    answer:`Tests conflict resolution and communication. Use STAR method.

**Example:**
"During our final year project, I disagreed with a teammate about the tech stack. I wanted to use React for the frontend; he preferred vanilla HTML/CSS. We had a heated discussion.

I suggested we each prototype one page in our preferred tech over a weekend and compare. When we saw both versions, my teammate agreed React was significantly faster to build with. We adopted React and finished the frontend in 3 weeks.

The key lesson: always back opinions with evidence, not just preference. This approach also improved our team dynamic — we started doing small proof-of-concepts before making all major decisions."

**What interviewers look for:** You listened to the other person, you found a constructive resolution, you didn't badmouth your teammate.`,
    difficulty:"medium", tags:["teamwork","conflict","behavioural"]
  },
  {
    id:"hr8", topic_id:"7",
    question:"How do you handle pressure and tight deadlines?",
    answer:`Interviewers want evidence you don't fall apart. Give a real example.

**Structure:** Situation → How you handled it → Outcome

**Example:**
"Before my final year project presentation, our main feature broke 6 hours before the demo. Instead of panicking, I listed what was broken, prioritized the fix that would have the most visible impact, and worked systematically through it. I fixed the core feature in 4 hours, leaving 2 hours to rehearse. We got the highest marks in the class.

My approach to pressure: break the big problem into smaller solvable ones, tackle them in order of priority, and communicate clearly with the team."

**Phrases that signal good pressure handling:**
- "I prioritize ruthlessly"
- "I focus on what I can control"
- "I communicate early when timelines slip"`,
    difficulty:"medium", tags:["pressure","deadlines","behavioural"]
  },
  {
    id:"hr9", topic_id:"7",
    question:"Why should we hire you?",
    answer:`Your 60-second pitch. Connect your skills directly to what they need.

**Formula:** [Your specific skill] + [Evidence] = [Value to them]

**Example for TCS:**
"You should hire me because I combine strong fundamentals in Java and SQL with hands-on project experience. I built a web application that 200+ students at my college now use daily — that means I understand how to ship something that real people rely on. I'm a fast learner who delivered a working product in React within three weeks of starting to learn it. I'm also a team player — I've led a 5-person project team and learned to communicate technical decisions to non-technical teammates. At TCS's scale, all of these will translate into real value from day one."

**Structure:**
1. Technical skill + proof
2. Learning speed + proof  
3. Soft skill + proof
4. Connect to what THEY need`,
    difficulty:"easy", tags:["pitch","motivation","all-companies"]
  },
  {
    id:"hr10", topic_id:"7",
    question:"Do you have any questions for us?",
    answer:`ALWAYS have 2-3 questions ready. Saying "No" signals low interest.

**Questions that impress:**

For technical roles:
- "What does the first 30 days look like for a fresher joining this team?"
- "What's the tech stack your team currently works with?"
- "How do freshers typically get assigned to their first project?"

For growth-focused impression:
- "What does a high-performing engineer look like on your team?"
- "What learning resources do you provide for continuous skill development?"

For culture fit:
- "What do you enjoy most about working here?"

**Avoid asking:**
- Salary questions in first round
- "How many leaves do I get?"
- Anything easily Googleable
- "What does your company do?"

**Pro tip:** Reference something from the interview: "You mentioned [X] earlier — how does that affect day-to-day work for freshers?"`,
    difficulty:"easy", tags:["questions","interview-tips","all-companies"]
  },
  {
    id:"hr11", topic_id:"6",
    question:"Are you comfortable relocating?",
    answer:`Be honest but show flexibility.

**If you are open:**
"Yes, I'm open to relocating. I understand that opportunities may come in different cities and I'm excited about wherever the role takes me."

**If you have constraints:**
"I prefer [city] in the short term due to family commitments, but I'm open to discussing relocation for the right role and with proper transition time."

**For TCS/Infosys/Wipro specifically:**
These companies routinely post freshers to any city — Chennai, Pune, Hyderabad, Bangalore, Kolkata. Saying you're flexible improves your chances significantly. Be honest about hard constraints, but show willingness.

**Never say:** "I will only work in [city]" in a first round — it signals inflexibility before they've even decided to hire you.`,
    difficulty:"easy", tags:["relocation","hr","practical"]
  },
  {
    id:"hr12", topic_id:"6",
    question:"What is your expected salary?",
    answer:`Handle this carefully, especially for freshers.

**Best answer for freshers:**
"As a fresher, I'm more focused on the learning opportunity and growth at [company] than a specific number. I'm open to your standard fresher package and trust that it'll be competitive."

**If pushed for a number:**
Research the company's fresher CTC first:
- TCS: ₹3.36–7 LPA depending on stream (NQT National, Digital, Prime)
- Infosys: ₹3.6–9 LPA  
- Wipro: ₹3.5–6.5 LPA
- Amazon: ₹15–40 LPA
- Google: ₹35–80 LPA

Then say: "Based on my research, I understand [company] offers around [range] for freshers. I'm comfortable with that range."

**Never:** Give a random number without research. It either undersells you or prices you out.`,
    difficulty:"medium", tags:["salary","negotiation","practical"]
  },
  {
    id:"hr13", topic_id:"7",
    question:"Tell me about a project you're proud of.",
    answer:`Your best opportunity to shine. Prepare this answer thoroughly.

**Structure:**
1. What the project was (1 sentence)
2. Your specific role (not "we did")
3. The technical challenge you solved
4. The impact / result

**Strong example:**
"My proudest project is an ML-based attendance system I built for my department. I was responsible for the entire backend — I used OpenCV for face recognition, Flask for the API, and MySQL for storage.

The toughest challenge was improving accuracy in poor lighting conditions. I tried multiple preprocessing approaches, and eventually found that histogram equalization before detection improved accuracy from 71% to 94%.

The system is now used by 4 professors and tracks attendance for 200+ students. This project taught me that real-world conditions are always messier than test conditions — and that iteration is how you close the gap."

**Key:** Mention specific numbers, specific technologies, your specific contribution, a specific challenge and how you solved it.`,
    difficulty:"medium", tags:["projects","technical","showcase"]
  },
  {
    id:"hr14", topic_id:"7",
    question:"How do you keep your technical skills up to date?",
    answer:`Shows initiative and self-learning ability.

**Structure:** Resources you use + Recent thing you learned + How you applied it

**Strong answer:**
"I follow a mix of structured and exploratory learning. I use LeetCode daily for DSA practice — currently at 150+ problems. For new technologies, I use the official documentation and build a small project with it. Recently I learned Next.js by rebuilding a static portfolio as a server-side rendered app.

I also follow a few engineers on Twitter/X — ThePrimeagen for systems thinking, Fireship for quick tech updates, and read engineering blogs from companies like Airbnb, Stripe, and Shopify. Whenever I read about a concept I don't know, I make a note and explore it over the weekend."

**What NOT to say:** "I watch YouTube" without specifics. Name actual channels, blogs, or resources.`,
    difficulty:"medium", tags:["learning","growth","technical"]
  },
  {
    id:"hr15", topic_id:"7",
    question:"Describe yourself in three words.",
    answer:`Keep it relevant to work. Don't say generic words.

**Formula:** Choose 3 words that are relevant to engineering work → briefly justify each

**Strong answer:**
"Curious, systematic, and dependable.

Curious — I'm always asking why something works the way it does, not just accepting it. Systematic — I approach problems by breaking them down before writing a single line of code. Dependable — teammates know that when I commit to a deadline, I'll either meet it or flag it early."

**Good words for tech roles:**
- Analytical, Detail-oriented, Systematic, Methodical
- Resourceful, Adaptable, Curious, Driven
- Collaborative, Communicative, Reliable, Consistent

**Avoid:** Creative (vague), Perfectionist (overused), Hardworking (everyone says this)`,
    difficulty:"easy", tags:["self-description","personality","hr"]
  },
]

export const DSA_QUESTIONS: PrepQuestion[] = [
  {
    id:"dsa1", topic_id:"1",
    question:"Explain the Two Pointers technique with an example.",
    answer:`**Two Pointers** uses two indices to traverse an array, usually from opposite ends or at different speeds.

**When to use:**
- Finding pairs with a target sum in sorted array
- Removing duplicates from sorted array
- Checking palindrome
- Container with most water

**Example — Find pair summing to target:**
\`\`\`
Input: arr=[1,3,4,6,8,9], target=10
left=0 (value 1), right=5 (value 9) → sum=10 ✓ Found!

If sum < target → move left right (need bigger sum)
If sum > target → move right left (need smaller sum)
\`\`\`

**Code:**
\`\`\`javascript
function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
\`\`\`

**Time:** O(n) | **Space:** O(1)`,
    difficulty:"easy", tags:["two-pointers","arrays","technique"]
  },
  {
    id:"dsa2", topic_id:"1",
    question:"What is Sliding Window and when should you use it?",
    answer:`**Sliding Window** maintains a subset of data in a window that moves across an array or string.

**Two types:**
1. **Fixed size** — window is always size k
2. **Variable size** — window grows/shrinks based on condition

**When to use:**
- Maximum sum subarray of size k
- Longest substring without repeating characters
- Minimum window containing all characters of a string

**Fixed window example — Max sum subarray of size k:**
\`\`\`javascript
function maxSumSubarray(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let maxSum = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k]; // add new, remove old
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}
\`\`\`

**Variable window example — Longest substring without repeat:**
\`\`\`javascript
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
\`\`\`

**Time:** O(n) | **Space:** O(k)`,
    difficulty:"easy", tags:["sliding-window","arrays","technique"]
  },
  {
    id:"dsa3", topic_id:"1",
    question:"Explain Prefix Sum array and its applications.",
    answer:`**Prefix Sum** precomputes cumulative sums to answer range sum queries in O(1).

**Construction:**
\`\`\`
arr    = [1, 2, 3, 4, 5]
prefix = [0, 1, 3, 6, 10, 15]  ← prefix[i] = prefix[i-1] + arr[i-1]
\`\`\`

**Range sum query:**
Sum from index l to r = prefix[r+1] - prefix[l]

**Applications:**
1. Range sum queries — O(n) build, O(1) query
2. Number of subarrays with sum = k
3. 2D matrix range sum queries

**Count subarrays with sum k:**
\`\`\`javascript
function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const num of nums) {
    sum += num;
    count += map.get(sum - k) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}
\`\`\`

**Time:** O(n) preprocessing, O(1) per query`,
    difficulty:"medium", tags:["prefix-sum","arrays","technique"]
  },
  {
    id:"dsa4", topic_id:"2",
    question:"Explain BFS vs DFS. When to use each?",
    answer:`**BFS (Breadth-First Search):**
- Explores level by level using a Queue
- Finds SHORTEST path in unweighted graph
- O(V+E) time, O(V) space

\`\`\`javascript
function bfs(graph, start) {
  const queue = [start], visited = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
\`\`\`

**DFS (Depth-First Search):**
- Explores as deep as possible using Stack or recursion
- Good for: cycle detection, topological sort, path finding
- O(V+E) time, O(V) space

\`\`\`javascript
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) dfs(graph, neighbor, visited);
  }
}
\`\`\`

**When to use BFS:**
- Shortest path (unweighted graph)
- Level order traversal
- Finding nearest node

**When to use DFS:**
- Detect cycles
- Topological sorting
- Find all paths
- Tree traversals (pre/in/post order)`,
    difficulty:"medium", tags:["bfs","dfs","graphs","trees"]
  },
  {
    id:"dsa5", topic_id:"2",
    question:"What is a Binary Search Tree? Give its properties and operations.",
    answer:`**BST Property:**
For every node:
- All values in LEFT subtree < node value
- All values in RIGHT subtree > node value

**Key insight:** Inorder traversal of BST gives sorted array.

**Operations:**
\`\`\`
Search: O(log n) average, O(n) worst (skewed tree)
Insert: O(log n) average
Delete: O(log n) average
\`\`\`

**Search in BST:**
\`\`\`javascript
function search(root, val) {
  if (!root || root.val === val) return root;
  if (val < root.val) return search(root.left, val);
  return search(root.right, val);
}
\`\`\`

**Insert in BST:**
\`\`\`javascript
function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}
\`\`\`

**Common BST problems:**
- Validate BST (pass min/max bounds)
- Kth smallest (inorder traversal)
- LCA (use BST property)
- Convert sorted array to BST (pick middle as root)`,
    difficulty:"medium", tags:["bst","trees","data-structures"]
  },
  {
    id:"dsa6", topic_id:"3",
    question:"What is Dynamic Programming? How do you identify DP problems?",
    answer:`**DP** solves problems by storing results of subproblems to avoid recomputation.

**Two conditions for DP:**
1. **Optimal substructure:** Solution can be built from solutions of subproblems
2. **Overlapping subproblems:** Same subproblems appear multiple times

**Identify DP problems by these patterns:**
- "Minimum/maximum number of ways to..."
- "Count number of ways to..."
- "Is it possible to achieve X?"
- "Longest/shortest subsequence/substring..."

**Two approaches:**

**Top-down (Memoization):**
\`\`\`javascript
const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n-1) + fib(n-2);
}
\`\`\`

**Bottom-up (Tabulation):**
\`\`\`javascript
function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}
\`\`\`

**Space optimized:**
\`\`\`javascript
function fib(n) {
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
\`\`\``,
    difficulty:"medium", tags:["dp","dynamic-programming","technique"]
  },
  {
    id:"dsa7", topic_id:"3",
    question:"Explain Knapsack problem and its variations.",
    answer:`**0/1 Knapsack:** Given items with weights and values, and capacity W, maximize value without exceeding capacity. Each item can be taken at most once.

**State:** dp[i][w] = max value using first i items with weight limit w

**Recurrence:**
- Don't take item i: dp[i][w] = dp[i-1][w]
- Take item i (if wt[i]<=w): dp[i][w] = val[i] + dp[i-1][w-wt[i]]
- dp[i][w] = max of above two

\`\`\`javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n+1).fill(0).map(() => Array(capacity+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't take
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i-1] + dp[i-1][w-weights[i-1]]);
      }
    }
  }
  return dp[n][capacity];
}
\`\`\`

**Variations:**
- **Unbounded Knapsack:** Item can be taken multiple times (Coin Change)
- **Partition Equal Subset Sum:** Split array into equal sum halves
- **Target Sum:** Assign +/- to reach target`,
    difficulty:"hard", tags:["knapsack","dp","classic"]
  },
  {
    id:"dsa8", topic_id:"4",
    question:"Compare all sorting algorithms with time and space complexity.",
    answer:`| Algorithm      | Best    | Average | Worst   | Space  | Stable |
|----------------|---------|---------|---------|--------|--------|
| Bubble Sort    | O(n)    | O(n²)   | O(n²)   | O(1)   | Yes    |
| Selection Sort | O(n²)   | O(n²)   | O(n²)   | O(1)   | No     |
| Insertion Sort | O(n)    | O(n²)   | O(n²)   | O(1)   | Yes    |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort     | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

**Quick Sort code:**
\`\`\`javascript
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) [arr[++i], arr[j]] = [arr[j], arr[i]];
  }
  [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];
  const p = i + 1;
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
}
\`\`\`

**Merge Sort code:**
\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}
\`\`\`

**In interviews use:** "Arrays.sort uses TimSort (hybrid merge+insertion) in Java, O(n log n) guaranteed."`,
    difficulty:"medium", tags:["sorting","complexity","algorithms"]
  },
  {
    id:"dsa9", topic_id:"5",
    question:"What is a Stack? Implement one and give real-world uses.",
    answer:`**Stack:** LIFO (Last In First Out) data structure.

**Operations:** push O(1), pop O(1), peek O(1), isEmpty O(1)

**Implementation using array:**
\`\`\`javascript
class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}
\`\`\`

**Real-world uses:**
1. Function call stack (recursion)
2. Undo functionality in editors
3. Browser back/forward navigation
4. Expression evaluation and conversion
5. Balanced parentheses checking

**Classic problems:**
- Valid Parentheses — O(n)
- Next Greater Element — monotonic stack O(n)
- Daily Temperatures — monotonic stack
- Evaluate RPN — O(n)

**Monotonic Stack pattern:**
\`\`\`javascript
// Next greater element for each position
function nextGreater(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = []; // stores indices
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length-1]]) {
      result[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return result;
}
\`\`\``,
    difficulty:"easy", tags:["stack","data-structures","implementation"]
  },
  {
    id:"dsa10", topic_id:"4",
    question:"Explain Binary Search with all its variations.",
    answer:`**Binary Search** finds target in sorted array by halving search space each time.

**Template:**
\`\`\`javascript
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // avoid overflow
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
\`\`\`

**Time:** O(log n) | **Space:** O(1)

**Variation 1 — Find leftmost occurrence:**
\`\`\`javascript
function leftmost(nums, target) {
  let left = 0, right = nums.length - 1, result = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) { result = mid; right = mid - 1; } // keep going left
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}
\`\`\`

**Variation 2 — Search in rotated array:**
\`\`\`javascript
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) { // left half sorted
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // right half sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
\`\`\`

**Key insight:** Binary search works on any monotonic function, not just sorted arrays.`,
    difficulty:"medium", tags:["binary-search","arrays","algorithms"]
  },
]

export const APTITUDE_QUESTIONS: PrepQuestion[] = [
  {
    id:"apt1", topic_id:"8",
    question:"A train 150m long crosses a pole in 15 seconds. Find speed.",
    answer:`**Speed = Distance / Time**

Distance = length of train = 150m
Time = 15 seconds

Speed = 150/15 = **10 m/s**

Convert to km/h: 10 × (18/5) = **36 km/h**

**Formula to remember:**
- m/s to km/h: multiply by 18/5
- km/h to m/s: multiply by 5/18`,
    difficulty:"easy", tags:["speed","distance","trains"]
  },
  {
    id:"apt2", topic_id:"8",
    question:"A shopkeeper sells an item for ₹480 at 20% profit. What is cost price?",
    answer:`**SP = CP × (100 + Profit%) / 100**

480 = CP × 120/100
CP = 480 × 100/120
**CP = ₹400**

**Quick formula:**
If profit% = P, then CP = SP × 100 / (100 + P)
If loss% = L, then CP = SP × 100 / (100 - L)

**Check:** 20% of 400 = 80. 400 + 80 = 480 ✓`,
    difficulty:"easy", tags:["profit-loss","percentages","business"]
  },
  {
    id:"apt3", topic_id:"8",
    question:"What is compound interest on ₹10,000 at 10% per annum for 2 years?",
    answer:`**CI Formula:** A = P(1 + r/100)^t

A = 10000 × (1 + 10/100)²
A = 10000 × (1.1)²
A = 10000 × 1.21
A = ₹12,100

**CI = A - P = 12100 - 10000 = ₹2,100**

Compare with Simple Interest:
SI = P × r × t / 100 = 10000 × 10 × 2 / 100 = ₹2,000

**CI - SI = ₹100** (this difference grows as time increases)

**Key formula:** For 2 years, CI - SI = P × (r/100)²`,
    difficulty:"medium", tags:["compound-interest","simple-interest","banking"]
  },
  {
    id:"apt4", topic_id:"8",
    question:"Pipes A and B can fill a tank in 6 and 12 hours respectively. How long to fill together?",
    answer:`**Work rate method:**

A fills 1/6 of tank per hour
B fills 1/12 of tank per hour

Together: 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4

Together they fill 1/4 tank per hour → **4 hours to fill completely**

**Formula:** 1/T = 1/A + 1/B → T = AB/(A+B)

T = (6 × 12)/(6 + 12) = 72/18 = **4 hours**

**If one pipe empties:**
1/T = 1/fill - 1/empty`,
    difficulty:"easy", tags:["pipes-cisterns","work","rate"]
  },
  {
    id:"apt5", topic_id:"8",
    question:"A and B together do work in 12 days. A alone takes 20 days. How long for B alone?",
    answer:`**A and B together:** 1/12 work per day
**A alone:** 1/20 work per day
**B alone:** 1/12 - 1/20 = ?

LCM of 12 and 20 = 60
= 5/60 - 3/60 = 2/60 = 1/30

**B alone takes 30 days**

**Quick method:** B = (A × AB)/(A - AB) = (20 × 12)/(20 - 12) = 240/8 = **30 days**`,
    difficulty:"easy", tags:["work","rate","time"]
  },
  {
    id:"apt6", topic_id:"8",
    question:"In how many ways can 5 students be seated in a row?",
    answer:`This is a **permutation** problem.

5 students in 5 seats = 5! = 5×4×3×2×1 = **120 ways**

**Key formulas:**

Permutation (order matters): P(n,r) = n!/(n-r)!
Combination (order doesn't matter): C(n,r) = n!/[r!(n-r)!]

**Common scenarios:**
- Seats in a row with restrictions: Fix restricted first, arrange rest
- Circular arrangement: (n-1)! ways
- Arrangements with repetition: n! / (p! × q!) where p,q are repeated items

**Example:** How many 3-letter words from HELLO?
Letters: H,E,L,L,O — 5 letters with L repeated twice
3-letter words = solve by cases (with/without repeated L)`,
    difficulty:"medium", tags:["permutation","combination","counting"]
  },
  {
    id:"apt7", topic_id:"9",
    question:"Find the next number in: 2, 6, 12, 20, 30, ?",
    answer:`**Differences:** 6-2=4, 12-6=6, 20-12=8, 30-20=10

Differences are: 4, 6, 8, 10 (increasing by 2)

Next difference = 12
Next number = 30 + 12 = **42**

**Pattern:** n(n+1) → 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, **6×7=42**

**Types of number series:**
1. Arithmetic (constant difference): 2,4,6,8
2. Geometric (constant ratio): 2,4,8,16
3. Fibonacci type: each = sum of previous two
4. Squares: 1,4,9,16,25
5. Cubes: 1,8,27,64,125
6. Difference series: differences form their own pattern`,
    difficulty:"easy", tags:["number-series","patterns","sequences"]
  },
  {
    id:"apt8", topic_id:"9",
    question:"All birds can fly. Penguin is a bird. Can a penguin fly? What is wrong with this argument?",
    answer:`**Conclusion from the premises:** Penguin can fly.

**What's wrong:** The first premise is FALSE — not all birds can fly. Penguins, ostriches, and emus are birds that cannot fly.

**Type:** Invalid syllogism due to false premise.

**In logical reasoning tests:** Treat given statements as TRUE even if factually wrong. Answer based on given premises, not real-world knowledge.

**Syllogism rules:**
- All A are B + All B are C → All A are C ✓
- All A are B + Some B are C → Some A are C (maybe)
- No A are B + All C are B → No C are A ✓

**Tip for TCS/Infosys:** Always evaluate conclusions based ONLY on the given statements, never on external knowledge.`,
    difficulty:"medium", tags:["syllogism","logical","reasoning"]
  },
  {
    id:"apt9", topic_id:"9",
    question:"A clock shows 3:15. What angle does the minute hand make with the hour hand?",
    answer:`**At 3:15:**

**Minute hand position:** 15 minutes × 6°/min = 90° from 12

**Hour hand position:** 
- At 3:00, hour hand is at 90° (3 × 30°)
- In 15 minutes, hour hand moves: 15 × 0.5° = 7.5°
- Total hour hand position = 90° + 7.5° = 97.5°

**Angle between them = 97.5° - 90° = 7.5°**

**Useful formulas:**
- Hour hand speed: 0.5° per minute
- Minute hand speed: 6° per minute
- Angle between hands at H hours M minutes:
  |30H - 5.5M| degrees`,
    difficulty:"medium", tags:["clocks","angles","time"]
  },
  {
    id:"apt10", topic_id:"9",
    question:"If APPLE is coded as 16,12,12,15,5, how is MANGO coded?",
    answer:`**Find the pattern:**

A=1, P=16, P=16, L=12, E=5... 

Wait, these don't match standard A=1,B=2,...

Try reverse: A=26, P=11, P=11, L=15, E=22? No.

Look again: 16,12,12,15,5
A=1→26-1+1=26? No.

Actually: A→16? 1+15=16. P→12? 16+(-4)? 

Try: each letter's position subtracted from 26+1=27:
A=1 → 27-1=26? No, gives 26 not 16.

Correct: reverse alphabetical: A→26, B→25... Z→1
A=26, P=11, P=11, L=15, E=22 — doesn't match.

**Most likely pattern:** Position value only: A=1,P=16,P=16,L=12,E=5
MANGO: M=13, A=1, N=14, G=7, O=15
**MANGO = 13,1,14,7,15**

**Note:** Always verify pattern with ALL given letters before applying to answer.`,
    difficulty:"medium", tags:["coding-decoding","patterns","reasoning"]
  },
]

export const SYSTEM_DESIGN_QUESTIONS: PrepQuestion[] = [
  {
    id:"sd1", topic_id:"10",
    question:"How would you design a URL Shortener like bit.ly?",
    answer:`**Step 1 — Clarify requirements:**
- Scale: 100M URLs shortened per day
- Read heavy: 100:1 read:write ratio
- URL should be ~7 characters
- Expiry support? Yes. Analytics? Basic.

**Step 2 — High level design:**
\`\`\`
Client → Load Balancer → App Servers → Cache → Database
                                     ↓
                              Storage (R2/S3)
\`\`\`

**Step 3 — API design:**
- POST /shorten {long_url} → {short_url}
- GET /{code} → 301/302 redirect to long_url

**Step 4 — Database schema:**
\`\`\`sql
urls: id, long_url, short_code, user_id, created_at, expires_at
\`\`\`

**Step 5 — Short code generation:**
- MD5(long_url) → take first 7 chars → Base62 encode
- Base62 (a-z,A-Z,0-9): 62^7 = 3.5 trillion combinations
- Handle collisions: check DB, regenerate if exists

**Step 6 — Scale:**
- Cache hot URLs in Redis (80% traffic hits 20% of URLs)
- Read replicas for database
- CDN for global distribution
- Horizontal scaling of app servers

**Step 7 — Redirect:**
- 301 (Permanent) — browser caches, less server load
- 302 (Temporary) — every request hits server, better for analytics`,
    difficulty:"medium", tags:["system-design","url-shortener","scaling"]
  },
  {
    id:"sd2", topic_id:"10",
    question:"Design a Chat Application like WhatsApp.",
    answer:`**Requirements:**
- 1:1 messaging, group chats
- Online/offline status, read receipts
- Message delivery guarantee

**Architecture:**
\`\`\`
Client ↔ WebSocket Server ↔ Message Queue ↔ Database
                           ↓
                    Presence Service
                           ↓  
                    Notification Service (Push)
\`\`\`

**Key design decisions:**

**1. Real-time: WebSockets**
- Long-lived bidirectional connection
- Each user connects to a chat server
- Message broker (Kafka/RabbitMQ) routes between servers

**2. Message storage:**
- NoSQL (Cassandra) — optimized for time-series write-heavy workloads
- Schema: (user_id, conversation_id, message_id, content, timestamp)
- Partition by conversation_id

**3. Delivery guarantees:**
- At-least-once delivery with deduplication
- ACK from client confirms receipt
- Retry with exponential backoff for failed deliveries

**4. Offline messages:**
- Store in queue/DB
- Push notification to wake up app
- Deliver when user reconnects

**5. Group chats:**
- Fan-out on write: copy message to each member's inbox
- Better for small groups (<100 members)

**Scale:** WhatsApp handles 100B messages/day with minimal infrastructure using Erlang's concurrency model.`,
    difficulty:"hard", tags:["system-design","chat","websockets","real-time"]
  },
  {
    id:"sd3", topic_id:"10",
    question:"What is CAP theorem? Explain with examples.",
    answer:`**CAP Theorem:** A distributed system can only guarantee 2 of 3:

**C — Consistency:** Every read gets the most recent write
**A — Availability:** Every request gets a response (may not be latest)
**P — Partition Tolerance:** System works even if network splits nodes

**Network partitions ALWAYS happen** in distributed systems. So you choose between C and A:

**CP systems (Consistent + Partition tolerant):**
- Sacrifice availability
- Return error if can't guarantee consistency
- Examples: HBase, MongoDB (in strict mode), ZooKeeper
- Use when: Banking, inventory (correctness critical)

**AP systems (Available + Partition tolerant):**
- Sacrifice strong consistency (eventually consistent)
- Return potentially stale data
- Examples: DynamoDB, Cassandra, CouchDB
- Use when: Social media, DNS, shopping carts

**CA systems (Consistent + Available):**
- Sacrifice partition tolerance
- Only works on single node or LAN
- Examples: Traditional RDBMS (MySQL, PostgreSQL) on single node

**Interview answer tip:** "Network partitions are unavoidable in distributed systems, so we really choose between CP and AP based on whether our use case prioritizes data correctness or service availability."`,
    difficulty:"hard", tags:["cap-theorem","distributed-systems","consistency"]
  },
]

export const PREP_QUESTIONS = [
  ...HR_QUESTIONS,
  ...DSA_QUESTIONS,
  ...APTITUDE_QUESTIONS,
  ...SYSTEM_DESIGN_QUESTIONS,
]