export function buildRunnerCode(
  userCode:     string,
  functionName: string,
  args:         string,
  language:     string
): string {
  const parsedArgs = JSON.parse(args)

  switch (language) {
    case "python":     return buildPython(userCode, functionName, parsedArgs)
    case "java":       return buildJava(userCode, functionName, parsedArgs)
    case "cpp":        return buildCpp(userCode, functionName, parsedArgs)
    default:           return buildPython(userCode, functionName, parsedArgs)
  }
}

function pyVal(v: any): string {
  if (v === null)             return "None"
  if (typeof v === "boolean") return v ? "True" : "False"
  if (typeof v === "string")  return JSON.stringify(v)
  if (Array.isArray(v))       return `[${v.map(pyVal).join(",")}]`
  return String(v)
}

function buildPython(code: string, fn: string, args: any[]): string {
  const argStr = args.map(pyVal).join(", ")
  return `import json, sys

${code}

try:
    result = ${fn}(${argStr})
    print(json.dumps(result))
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
`
}

function javaVal(v: any): string {
  if (Array.isArray(v)) {
    if (v.length === 0) return "new int[]{}"
    if (typeof v[0] === "number") return `new int[]{${v.join(",")}}`
    if (typeof v[0] === "string") return `new String[]{${v.map((s: string) => `"${s}"`).join(",")}}`
    if (Array.isArray(v[0]))      return `new int[][]{${v.map((r: any[]) => `{${r.join(",")}}`).join(",")}}`
    return `new int[]{${v.join(",")}}`
  }
  if (typeof v === "string")  return `"${v}"`
  if (typeof v === "boolean") return String(v)
  return String(v)
}

function buildJava(code: string, fn: string, args: any[]): string {
  const argStr = args.map(javaVal).join(", ")

  // Determine return type from first arg pattern
  const retType = inferJavaReturn(fn)

  return `import java.util.*;
import java.util.stream.*;

public class Main {
    // User solution
    ${code.replace(/public class Solution \{/, "").replace(/^class Solution \{/, "").replace(/\}$/, "")}

    public static void main(String[] args) {
        try {
            ${retType.declare} result = ${fn}(${argStr});
            ${retType.print}
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
`
}

function inferJavaReturn(fn: string): { declare: string; print: string } {
  // Common patterns
  const map: Record<string, { declare: string; print: string }> = {
    twoSum:            { declare: "int[]",   print: "System.out.println(Arrays.toString(result));" },
    maxSubArray:       { declare: "int",     print: "System.out.println(result);" },
    search:            { declare: "int",     print: "System.out.println(result);" },
    isValid:           { declare: "boolean", print: "System.out.println(result);" },
    climbStairs:       { declare: "int",     print: "System.out.println(result);" },
    containsDuplicate: { declare: "boolean", print: "System.out.println(result);" },
    maxProfit:         { declare: "int",     print: "System.out.println(result);" },
    missingNumber:     { declare: "int",     print: "System.out.println(result);" },
    fib:               { declare: "int",     print: "System.out.println(result);" },
    singleNumber:      { declare: "int",     print: "System.out.println(result);" },
    moveZeroes:        { declare: "int[]",   print: "System.out.println(Arrays.toString(result));" },
    isPalindrome:      { declare: "boolean", print: "System.out.println(result);" },
    isPowerOfTwo:      { declare: "boolean", print: "System.out.println(result);" },
    majorityElement:   { declare: "int",     print: "System.out.println(result);" },
    rob:               { declare: "int",     print: "System.out.println(result);" },
    coinChange:        { declare: "int",     print: "System.out.println(result);" },
    productExceptSelf: { declare: "int[]",   print: "System.out.println(Arrays.toString(result));" },
    maxArea:           { declare: "int",     print: "System.out.println(result);" },
  }
  return map[fn] || { declare: "Object", print: "System.out.println(result);" }
}

function cppVal(v: any): string {
  if (Array.isArray(v)) {
    if (v.length === 0) return "{}"
    if (typeof v[0] === "string") return `{"${v.join('","')}"}`
    if (Array.isArray(v[0]))      return `{${v.map((r: any[]) => `{${r.join(",")}}`).join(",")}}`
    return `{${v.join(",")}}`
  }
  if (typeof v === "string")  return `"${v}"`
  if (typeof v === "boolean") return v ? "true" : "false"
  return String(v)
}

function buildCpp(code: string, fn: string, args: any[]): string {
  const argStr = args.map(cppVal).join(", ")
  const retPrint = inferCppPrint(fn)

  return `#include <bits/stdc++.h>
using namespace std;

${code}

int main() {
    try {
        auto result = ${fn}(${argStr});
        ${retPrint}
    } catch(exception& e) {
        cerr << "Error: " << e.what() << endl;
    }
    return 0;
}
`
}

function inferCppPrint(fn: string): string {
  const vectors = ["twoSum","moveZeroes","productExceptSelf","threeSum"]
  if (vectors.includes(fn)) {
    return `
    cout << "[";
    for(int i=0;i<(int)result.size();i++){
        cout<<result[i];
        if(i<(int)result.size()-1) cout<<",";
    }
    cout<<"]"<<endl;`
  }
  return `cout << boolalpha << result << endl;`
}

export function normalizeOutput(raw: string): string {
  return raw.trim()
    .replace(/\s+/g, "")
    .toLowerCase()
    .replace(/true/g, "true")
    .replace(/false/g, "false")
}

export function compareOutputs(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual)
  const e = normalizeOutput(expected)

  if (a === e) return true

  // Number comparison
  try {
    const na = parseFloat(a), ne = parseFloat(e)
    if (!isNaN(na) && !isNaN(ne)) return Math.abs(na - ne) < 0.001
  } catch {}

  // Array comparison — try sorted (for problems like twoSum where order may differ)
  try {
    const arrA = JSON.parse(a)
    const arrE = JSON.parse(e)
    if (Array.isArray(arrA) && Array.isArray(arrE)) {
      if (arrA.length !== arrE.length) return false

      // Exact order first
      if (JSON.stringify(arrA) === JSON.stringify(arrE)) return true

      // Sorted order (for index-return problems)
      const sortedA = [...arrA].sort((x,y)=>x-y).join(",")
      const sortedE = [...arrE].sort((x,y)=>x-y).join(",")
      if (sortedA === sortedE) return true

      // 2D array — sort rows then sort array
      if (Array.isArray(arrA[0])) {
        const flatA = arrA.map((r: any[]) => [...r].sort((x,y)=>x-y).join(",")).sort().join("|")
        const flatE = arrE.map((r: any[]) => [...r].sort((x,y)=>x-y).join(",")).sort().join("|")
        return flatA === flatE
      }
    }
  } catch {}

  return false
}