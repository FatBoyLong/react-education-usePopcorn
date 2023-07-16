import { useState, useEffect } from "react";

// coping constant variable from App
const KEY = "f9fb5bfd";

export function useMovies(query) {
  // state from App
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // using callback
      // callback?.();

      // browser API for control HTTP requests
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // setIsLoading STATE for rendering loading component while fetching data
          setIsLoading(true);

          // setError STATE setter for reload error state. We only set error in catch block and never reset it
          // So we always get an error (because initial value of error is "") and render <ErrorMessage /> in <Box />
          setError("");

          // {signal: controller.signal} is usage of browser API for control HTTP requests AbortController
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error("Something went wrong...");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          // setIsLoading(false);
        } catch (err) {
          // checking for abort error
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          // use setIsLoading here cos after throwing error in try block code execution will be stopped.
          setIsLoading(false);
        }
      }

      // guard statement
      // start execution of fetchMovies() only if query length ib greater than 3
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // commented after refactoring custom hook
      // for close MovieDetails after new search
      // handleCloseMovie();

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, isLoading };
}
