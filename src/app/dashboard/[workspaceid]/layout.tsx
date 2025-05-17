import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

export default async function Layout({
  params: { workspaceId },
  children,
}: Props) {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect("auth/sign-in");
  if (!auth.user.workspace.length) redirect("auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  //react-query state management for server so that we can prefetch workspace related data
  const queryClient = new (await import("@tanstack/react-query")).QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex h-screen w-screen">
          <Sidebar activeWorkspaceId={workspaceId} />
          <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
            <GlobalHeader workspace={hasAccess.data.workspace} />{" "}
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
