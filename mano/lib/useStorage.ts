"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "./storage";

export function useStorageState<T>(key: string, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(loadFromStorage(key, initial));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    saveToStorage(key, data);
  }, [key, data, ready]);

  return [data, setData, ready] as const;
}
