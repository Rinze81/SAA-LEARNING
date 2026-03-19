"use client";

import { useEffect, useState } from "react";
import { buildHomeSnapshot, readPersistedHomeState } from "@/lib/home/home-data";
import type { HomeSnapshot } from "@/lib/home/types";

export function useHomeDashboard() {
  const [snapshot, setSnapshot] = useState<HomeSnapshot>(() =>
    buildHomeSnapshot({}),
  );

  useEffect(() => {
    setSnapshot(buildHomeSnapshot(readPersistedHomeState()));
  }, []);

  return snapshot;
}
