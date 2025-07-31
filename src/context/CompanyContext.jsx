import React, { createContext, useContext, useEffect, useState } from "react";
import { businesses as businessesApi, reviews } from "../api/api";

const CompanyContext = createContext();

// Demo mode: always provide a default company

export function CompanyProvider({ children }) {
  // Add review-related state
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  // No API calls, always has at least one company

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all reviews (assuming reviews.list returns all reviews)
        const reviewData = await reviews.list();
        const all = reviewData;
        setAllReviews(all);

        // Calculate total reviews
        setTotalReviews(all.length);

        // Calculate average rating (only if there are reviews)
        if (all.length > 0) {
          const avg =
            all.reduce((sum, r) => sum + (Number(r.overall_rating) || 0), 0) /
            all.length;
          setAvgRating(Number(avg.toFixed(2)));
        } else {
          setAvgRating(0);
        }

//         // const recommendCount = all.filter(review => review.would_recommend).length;
//         // console.log("total recommend",recommendCount)
// const recommendationPercentage = (recommendCount / all.length) * 100;
// console.log("Recommendation %:", recommendationPercentage.toFixed(0) + "%");



        // Get 10 most recent reviews (sorted by created_at desc)
        const sorted = [...all].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRecentReviews(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching company or review data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        totalReviews,
        avgRating,
        recentReviews,
        allReviews,
        recommendation,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
