import { useState } from 'react'
import { Star } from 'lucide-react'

export function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              className="hidden"
            />
            <Star
              className={`cursor-pointer transition-colors duration-200 ${
                ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              fill={ratingValue <= (hover || rating) ? 'currentColor' : 'none'}
            />
          </label>
        )
      })}
    </div>
  )
}

