import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AppSearchContext } from "./AppSearchContext.jsx";

export const AppSearchProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Something went wrongxs.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <AppSearchContext.Provider value={{ query, results, loading, error }}>
      {children}
    </AppSearchContext.Provider>
  );
};
