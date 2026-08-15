"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { type IntakeFormType } from "@/lib/intake/contracts";
import {
  getIntakeDraftKey,
  parseIntakeDraft,
  serializeIntakeDraft,
} from "@/lib/intake/drafts";

type UseIntakeDraftOptions<T> = {
  formType: IntakeFormType;
  contextId?: string;
  data: T;
  dataSchema: z.ZodType<T>;
  isEmpty: (data: T) => boolean;
  restore: (data: T) => void;
};

export function useIntakeDraft<T>({
  formType,
  contextId,
  data,
  dataSchema,
  isEmpty,
  restore,
}: UseIntakeDraftOptions<T>) {
  const [wasRestored, setWasRestored] = useState(false);
  const didRestore = useRef(false);
  const saveTimer = useRef<number | null>(null);
  const key = getIntakeDraftKey(formType, contextId);
  const serializedData = JSON.stringify(data);

  useEffect(() => {
    if (didRestore.current) return;
    didRestore.current = true;

    const result = parseIntakeDraft(localStorage.getItem(key), dataSchema);
    if (result.status === "restored") {
      restore(result.data);
      setWasRestored(true);
    } else if (result.status === "expired" || result.status === "invalid") {
      localStorage.removeItem(key);
    }
  }, [dataSchema, key, restore]);

  useEffect(() => {
    if (!didRestore.current) return;
    const snapshot = JSON.parse(serializedData) as T;
    saveTimer.current = window.setTimeout(() => {
      if (isEmpty(snapshot)) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializeIntakeDraft(snapshot));
      }
    }, 400);

    return () => {
      if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    };
  }, [isEmpty, key, serializedData]);

  const clearDraft = useCallback(() => {
    if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    saveTimer.current = null;
    localStorage.removeItem(key);
    setWasRestored(false);
  }, [key]);

  return { wasRestored, clearDraft };
}
