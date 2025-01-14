import { useState } from "react";
import { StarRating } from "./StarRating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function ReviewModal({ isModalOpen, setIsModalOpen, productId }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.user);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to submit a review");
      navigate("/sign-in");
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/reviews/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          reviewerName: user.name || "Anonymous",
          reviewerEmail: user.email,
        }),
      });
      toast.success("Review submitted successfully!");
      setIsModalOpen(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 inline-flex items-center justify-center w-full rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
      >
        Write a review
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
