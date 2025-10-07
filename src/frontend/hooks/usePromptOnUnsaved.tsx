import { useEffect, useRef } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export function usePromptOnUnsaved(isUnsaved: boolean) {
  const ignorePromptRef = useRef(false);

  useBeforeUnload((event) => {
    if (isUnsaved && !ignorePromptRef.current) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  const blocker = useBlocker(isUnsaved && !ignorePromptRef.current);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Leave anyway?"
      );
      if (confirmLeave) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  return ignorePromptRef;
}
 