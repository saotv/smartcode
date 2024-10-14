export function transformCommand(command: string): string {
  const isWindows = process.platform === "win32";

  if (isWindows) {
    // Transform Unix commands to Windows equivalents
    if (command === "pwd") {
      return "cd";
    }
    // Add more transformations as needed
  }

  return command;
}