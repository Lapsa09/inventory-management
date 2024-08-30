import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

function Rating({ rating }: RatingProps) {
  return (
    <div className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          color={i < rating ? "#FFC107" : "#E4E5E9"}
          className="w-4 h-4"
        />
      ))}
    </div>
  );
}

export default Rating;
