import fs from "fs/promises";
import path from "path";
import { Command } from "~/config/commands";

const COMMANDS_FILE_PATH = path.join(process.cwd(), "app", "config", "commands.ts");

export async function addCommand(newCommand: { name: string; command: string }) {
  const content = await fs.readFile(COMMANDS_FILE_PATH, "utf-8");
  const updatedContent = content.replace(
    /export const commands: Command\[\] = \[/,
    `export const commands: Command[] = [
  {
    name: "${newCommand.name}",
    command: "${newCommand.command}",
  },`
  );
  await fs.writeFile(COMMANDS_FILE_PATH, updatedContent);
}