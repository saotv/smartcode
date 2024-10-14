import { type ActionFunctionArgs } from "@remix-run/node";
import { logout } from "~/utils/auth";

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

export default function Logout() {
  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}