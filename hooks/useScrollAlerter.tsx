import React, { useEffect } from "react";

/**
 * Hook that alerts when scroll is detected
 */
export default function useScrollAlerter(callback: () => void) {
  useEffect(() => {
    function handleScroll(this: Document, event: Event) {
      callback();
    }
    // Bind the event listener
    document.addEventListener("scroll", handleScroll);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
