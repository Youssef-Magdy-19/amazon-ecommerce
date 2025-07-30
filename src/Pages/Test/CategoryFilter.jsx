"use client"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 btn-m">
      <div className="flex flex-wrap justify-center align-center gap-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === "all"
              ? "bg-amber-300 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`padd px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
              selectedCategory === category
                ? "bg-amber-300 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category.replace("'", "")}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
