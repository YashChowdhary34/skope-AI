"use client";

import { WorkSpace } from "@/generated/prisma";
import { usePathname } from "next/navigation";

type Props = {
  workspace: WorkSpace;
};

const GlobalHeader = ({ workspace }: Props) => {
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];

  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#707070] text-xs tracking-wide">
        {workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl font-bold">
        {pathName && !pathName.includes("folder")
          ? pathName.charAt(0).toUpperCase() + pathName.slice(1).toLowerCase()
          : "My Library"}
      </h1>
    </article>
  );
};

export default GlobalHeader;
