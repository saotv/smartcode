import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { requireUserId } from "~/utils/auth";
import { commands } from "~/config/commands";
import CommandButton from "~/components/CommandButton";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  return json({ commands });
}

export default function Index() {
  const { commands } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SmartCode Assistant</h1>
        <nav>
          <Link to="/add-command" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
            Add New Command
          </Link>
          <Form action="/logout" method="post">
            <button type="submit" className="ml-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </Form>
        </nav>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commands.map((command) => (
          <CommandButton key={command.name} command={command} />
        ))}
      </div>
    </div>
  );
}