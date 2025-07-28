import { Star, StarHalf, Star as StarFilled } from "lucide-react";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarFilled key={i} size={16} className="text-yellow-500 fill-yellow-500" />);
    } else if (rating > i - 1 && rating < i) {
      stars.push(<StarHalf key={i} size={16} className="text-yellow-500 fill-yellow-500" />);
    } else {
      stars.push(<Star key={i} size={16} className="text-gray-400" />);
    }
  }
  return stars;
};

const Reviews = ({ product, reviews }) => {
  const staticReviews = [
    {
      name: "Brooke",
      date: "6 August 2024",
      stars: 4,
      text: "It turned out to be my favorite dress of this summer. It is extremely versatile and flattering. Love it!",
    },
    {
      name: "Elva S. D.",
      date: "11 August 2023",
      stars: 5,
      text: "Bien hecho, bonita tela y bonita caída, fresco y casual. La marca lo dice!!",
    },
  ];

  return (
        <div className="flex flex-col gap-6 w-[90%] ">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
    
          <div className="flex items-center gap-4 mb-4">
            <p className="text-2xl text-yellow-600 font-bold">
              ★ {product.rating?.rate?.toFixed(1)}
            </p>
            <p className="text-gray-600">out of 5</p>
          </div>
    
          <div className="flex flex-col gap-4 max-w-[300px] mb-6">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <p className="w-8">{star}</p>
                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div
                    className="h-full bg-yellow-500 rounded"
                    style={{
                      width: `${Math.floor(Math.random() * 80) + 5}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
    
          {/* User Submitted Reviews */}
          {reviews.length > 0 &&
            reviews.map((review, i) => (
              <div key={`user-${i}`} className="border-t pt-4">
                <p className="font-medium">{review.name}</p>
                <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                <div className="flex gap-1 my-1">{renderStars(review.stars)}</div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}

      {/* Static Reviews */}
      {staticReviews.map((review, i) => (
        <div key={`static-${i}`} className="border-t pt-4">
          <p className="font-medium">{review.name}</p>
          <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
          <div className="flex gap-1 my-1">{renderStars(review.stars)}</div>
          <p className="text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
