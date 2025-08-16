import { Star } from "lucide-react";


interface StarRatingProps {
  rating: number; // e.g., 3.5, 4, 5
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<Star key={i} className="text-yellow-500" />);
    } else {
      stars.push(<Star key={i} className="text-gray-400" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}
