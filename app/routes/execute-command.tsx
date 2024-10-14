import { json, type ActionFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/utils/auth";
import { transformCommand } from "~/utils/commandTransformer";
import { logAudit } from "~/utils/audit";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const command = formData.get("command");

  if (typeof command !== "string") {
    return json({ error: "Invalid command" }, { status: 400 });
  }

  const transformedCommand = transformCommand(command);

  try {
    const { stdout, stderr } = await execAsync(transformedCommand);
    const result = stdout || stderr;
    logAudit(userId, transformedCommand, result);
    return json({ result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAudit(userId, transformedCommand, `Error: ${errorMessage}`);
    return json({ error: errorMessage }, { status: 500 });
  }
}