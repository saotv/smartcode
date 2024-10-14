import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth";
import { addCommand } from "~/utils/commands";

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const command = formData.get("command");

  if (typeof name !== "string" || typeof command !== "string") {
    return json({ error: "Invalid form submission" }, { status: 400 });
  }

  try {
    await addCommand({ name, command });
    return redirect("/");
  } catch (error) {
    return json({ error: "Failed to add command" }, { status: 500 });
  }
}

export default function AddCommand() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Command</h1>
      <Form method="post" className="max-w-md">
        {actionData?.error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{actionData.error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Command Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="command" className="block text-gray-700 text-sm font-bold mb-2">
            Command
          </label>
          <input
            type="text"
            id="command"
            name="command"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Command
        </button>
      </Form>
    </div>
  );
}