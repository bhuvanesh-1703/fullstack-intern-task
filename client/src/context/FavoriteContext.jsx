import { createContext, useState, useCallback, useEffect } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Initialize favorite count from localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("favoriteCount");
    if (storedCount) {
      setFavoriteCount(parseInt(storedCount, 10));
    }
  }, []);

  // Update favorite count and persist to localStorage
  const updateFavoriteCount = useCallback((count) => {
    const newCount = Math.max(0, count); // Ensure count doesn't go below 0
    setFavoriteCount(newCount);
    localStorage.setItem("favoriteCount", newCount.toString());
  }, []);

  // Increment favorite count
  const incrementFavoriteCount = useCallback(() => {
    setFavoriteCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("favoriteCount", newCount.toString());
      return newCount;
    });
  }, []);

  // Decrement favorite count
  const decrementFavoriteCount = useCallback(() => {
    setFavoriteCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      localStorage.setItem("favoriteCount", newCount.toString());
      return newCount;
    });
  }, []);

  const value = {
    favoriteCount,
    updateFavoriteCount,
    incrementFavoriteCount,
    decrementFavoriteCount,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
