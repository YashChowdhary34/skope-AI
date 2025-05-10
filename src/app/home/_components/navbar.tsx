import { Menu, User } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo/logo.png";
import { Button } from "@/components/ui/button";

export default function LandingPageNavbar() {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-6 h-6" />
        <Image alt="logo" src={Logo} width={40} height={40} />
        Skope-AI
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/home"
          className="bg-[#7320DD] py-2 px-5 font-semibold text-md rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/auth/sign-in">
          <Button className="bg-white hover:bg-white/80 text-black text-base flex gap-2">
            <User fill="#000" />
            Login
          </Button>
        </Link>
      </div>
      LandingPageNavbar
    </div>
  );
}
