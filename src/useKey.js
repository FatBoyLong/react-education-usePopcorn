import { useEffect } from "react";



export function useKey(key, action) {
  useEffect(
    function () {
      function handleKeydown(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }

      document.addEventListener("keydown", handleKeydown);

      return function () {
        document.removeEventListener("keydown", handleKeydown);
      };
    },
    [action, key]
  );
}
