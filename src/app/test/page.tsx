"use client";

import * as React from "react";

import Loader from "@/components/global/loader";

export default function ProgressDemo() {
  return <Loader className="w-screen h-full flex" state color="#111"></Loader>;
}
