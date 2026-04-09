"use client";

import { useEffect, useState } from "react";
import {
  buildClientHomeSnapshot,
  buildHomeSnapshot,
  readPersistedHomeState,
} from "@/lib/home/home-data";
import type { HomeSnapshot } from "@/lib/home/types";
import { STUDY_SYNC_EVENT } from "@/lib/review/storage";

export function useHomeDashboard() {
  const [snapshot, setSnapshot] = useState<HomeSnapshot>(() =>
    buildHomeSnapshot({}),
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setSnapshot(buildClientHomeSnapshot(readPersistedHomeState()));
      } catch {
        // スナップショット生成が失敗しても初期値のまま継続
      } finally {
        setIsHydrated(true);
      }
    };

    sync();
    window.addEventListener(STUDY_SYNC_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(STUDY_SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    snapshot,
    isHydrated,
  };
}
