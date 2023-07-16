import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // we can pass into useState PURE callback function, that returns value. NO ARGUMENTS REQUIRES IN CALLBACK.
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    // if no storedValue app will be broken

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // updates when value changes
  useEffect(
    function () {
      // setting data (movie) in local storage. localStorage.setItem(key name, value)
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
