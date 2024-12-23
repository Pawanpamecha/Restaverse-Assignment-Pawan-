import { reviewsType } from "@/type";
import { Star } from "lucide-react";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";

interface ReviewCardProps {
  review: reviewsType;
}

const convertStarRating = (rating: string): number => {
  const ratings: { [key: string]: number } = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  return ratings[rating.toUpperCase()] || 0;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const starCount = convertStarRating(review.starRating);
  const totalStars = 5;

  const filledStars = [];
  const emptyStars = [];

  for (let i = 0; i < starCount; i++) {
    filledStars.push(
      <Star
        key={`filled-${i}`}
        className="text-yellow-500"
      />
    );
  }

  for (let i = 0; i < totalStars - starCount; i++) {
    emptyStars.push(
      <Star
        key={`empty-${i}`}
        className="text-gray-300"
      />
    );
  }

  return (
    <div className="w-[350px] min-h-[200px] bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Image
          src={"/placeholder.jpg"}
          alt={review.reviewer.displayName}
          height={100}
          width={100}
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="text-lg font-bold">{review.reviewer.displayName}</h3>
          <p className="text-gray-500 text-sm">{review.creatTime}</p>
        </div>
        <BsGoogle className="ml-auto" />
      </div>

      <div>
        <p className="text-gray-700">{review.comment}</p>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex">
          {filledStars}
          {emptyStars}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
