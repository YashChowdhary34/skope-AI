import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  // Authentication
  const auth = await onAuthenticateUser();

  console.log("Auth response:", auth);

  if (auth.status === 200 || auth.status === 201) {
    if (auth.user?.workspace && auth.user.workspace[0]?.id) {
      redirect(`/dashboard/${auth.user.workspace[0].id}`);
    } else {
      redirect("/auth/sign-in");
    }
  } else {
    redirect("/auth/sign-in");
  }
}
