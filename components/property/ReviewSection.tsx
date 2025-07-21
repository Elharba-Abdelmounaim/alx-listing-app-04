import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded">
            <p className="font-semibold">{review.name}</p>
            <p className="text-yellow-500">Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
