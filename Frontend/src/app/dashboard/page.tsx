"use client";

import ReviewCard from "@/components/ReviewCard";
import { reviewsType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, ServerCrash } from "lucide-react";

const DashboardPage = () => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery<reviewsType[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/reviews/reviews");
      console.log(response.data);
      return response.data.reviews;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 space-y-4">
        <ServerCrash className="text-red-500 w-10 h-10" />
        <p className="text-gray-600 text-lg">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Customer Reviews
        </h1>
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20">
            <h1 className="text-gray-500 text-xl">No Reviews Found</h1>
            <p className="text-gray-400">Try again later or check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
