export default function minifyFlutterStackTrace(
  trace: string,
  packageName: string
): string {
  const lines = trace.replace(/\r/g, "").split(/\n/g).filter(Boolean);
  const visited = new Set<string>();
  const deduplicated: string[] = [];

  const lastIndex = lastIndexOfPackageLog(lines, packageName);
  console.info(
    { lastIndex, packageName, len: lines.length },
    "minifyFlutterStackTrace"
  );

  const lastContextIndex =
    lastIndex < 0 ? lines.length : Math.min(lastIndex + 5, lines.length);
  console.info({ lastContextIndex, len: lines.length }, "lastContextIndex");

  for (const line of lines.slice(0, lastContextIndex)) {
    const each = /^#\d+\s+/.test(line)
      ? line.substring(line.indexOf(" ") + 1).trim()
      : line;
    if (visited.has(each)) {
      continue;
    }
    deduplicated.push(each);
    visited.add(each);
  }
  return deduplicated.join("\n");
}

function lastIndexOfPackageLog(lines: string[], packageName: string): number {
  let lastIndex = -1;
  const target = `package:${packageName}`;
  for (let index = 0; index < lines.length; ++index) {
    const line = lines[index];
    if (line.includes(target)) {
      lastIndex = index;
    }
  }
  return lastIndex;
}
