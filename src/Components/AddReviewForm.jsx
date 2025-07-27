const AddReviewForm = ({ newReview, setNewReview, handleAddReview }) => {
  return (
    <div className="mt-10 pt-8">
      <h4 className="text-lg font-semibold mb-2 " style={{marginBottom:"20px"}}>Add Your Review</h4>
      <form className="flex flex-col gap-4 justify-center  max-w-lg" onSubmit={handleAddReview}>
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Review"
          className="border p-2 rounded"
          rows={4}
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          required
        ></textarea>
        <div className="flex items-center gap-2">
          <label htmlFor="stars" className="text-sm md:text-lg">Rating:</label>
          <select
            id="stars"
            className="border p-1 rounded text-sm"
            value={newReview.stars}
            onChange={(e) => setNewReview({ ...newReview, stars: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white h-[32px] py-2 px-4 rounded-3xl hover:bg-green-700 transition">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
