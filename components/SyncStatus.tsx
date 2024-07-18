"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "./providers/contextProvider";
import { RxCheck, RxReload } from "react-icons/rx";

function updateStatusMessage(message: string) {
  const pattern = /\./g;
  const dotLength = message.match(pattern)?.length;

  if (dotLength === 3) {
    return "Saving";
  } else if (dotLength === 2) {
    return "Saving...";
  } else if (dotLength === 1) {
    return "Saving..";
  } else {
    return "Saving.";
  }
}

export default function SyncStatus() {
  const { state } = useAppContext();
  const [statusMessage, setStatusMessage] = useState("Saving");
  const syncedMessage = useRef("");

  useEffect(() => {
    if (state.isSynced) {
      return;
    }
    const intervalId = setInterval(() => {
      setStatusMessage(updateStatusMessage(statusMessage));
    }, 250);

    return () => {
      clearInterval(intervalId);
      syncedMessage.current = "Saved!";
    };
  }, [state.isSynced, statusMessage]);

  if (state.isSynced) {
    return (
      <div className="flex gap-1">
        <RxCheck size={16} color="gray" />
        <span className="text-xs text-stone-500 dark:text-stone-400">{syncedMessage.current}</span>
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      <RxReload size={16} color="gray" className="animate-spin" />
      <span className="text-xs text-stone-500 dark:text-stone-400">{statusMessage}</span>
    </div>
  );
}
