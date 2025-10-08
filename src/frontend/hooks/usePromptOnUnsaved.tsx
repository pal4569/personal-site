import { useEffect, useRef, useState } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export function usePromptOnUnsaved(isUnsaved: boolean) {
  const ignorePromptRef = useRef(false);
  const [ignorePrompt, setIgnorePrompt] = useState(false);

  useBeforeUnload((event) => {
    if (isUnsaved && !ignorePromptRef.current) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
  ignorePromptRef.current = ignorePrompt;
  const blocker = useBlocker(isUnsaved && !ignorePromptRef.current);

  useEffect(() => {
    console.log(ignorePromptRef.current);
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Leave anyway?"
      );
      if (confirmLeave) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  return { ignorePromptRef, setIgnorePrompt };
}
 