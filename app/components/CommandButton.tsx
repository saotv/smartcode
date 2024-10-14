import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { Command } from "~/config/commands";

export default function CommandButton({ command }: { command: Command }) {
  const fetcher = useFetcher();
  const [params, setParams] = useState<Record<string, string>>({});

  const handleExecute = () => {
    fetcher.submit(
      { command: command.command, ...params },
      { method: "post", action: "/execute-command" }
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{command.name}</h2>
      {command.params?.map((param) => (
        <input
          key={param.name}
          type={param.type}
          placeholder={param.name}
          className="w-full p-2 mb-2 border rounded"
          onChange={(e) => setParams({ ...params, [param.name]: e.target.value })}
          required={param.required}
        />
      ))}
      <button
        onClick={handleExecute}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        disabled={fetcher.state !== "idle"}
      >
        {fetcher.state === "submitting" ? "Executing..." : "Execute"}
      </button>
      {fetcher.data && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(fetcher.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}