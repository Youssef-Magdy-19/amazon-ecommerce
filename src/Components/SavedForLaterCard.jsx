
const SavedForLaterCard = ({ product, onMoveToCart, onRemove }) => (
  <div className="p-2 sm:py-4 sm:px-3 bg-gray-100 sm:bg-white sm:border border-gray-200">
    <div className="flex flex-row sm:flex-col items-center sm:items-center sm:justify-between gap-4 w-full">
      {/* صورة المنتج */}
      <div className="w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] md:w-[150px] md:h-[150px] flex-shrink-0 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      {/* تفاصيل وزرار */}
      <div className="flex-1 w-full flex flex-col gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg mb-1">{product.title.slice(0,18)} ...</h3>
          <p className="font-bold text-lg tracking-wide mb-1">{product.price} EGP</p>
          <p className="text-green-600 text-[14px]">{product.count > 100 ? 'Available' : (<span className="text-red-600"> Only  {product.quantity}  left</span>)}</p>
          <p className="text-blue-500 text-[14px]">15 days of replacement</p>
        </div>
        {/* زرار الشاشات الكبيرة */}
        <div className="hidden sm:flex flex flex-col gap-2 mt-2 sm:mt-0">
          <button
            className="rounded-full bg-white text-black border border-gray-800 hover:bg-black hover:border-white hover:text-white py-[2.5px] px-[10px]"
            onClick={() => onMoveToCart(product)}
          >
            Move to cart
          </button>
          <button
            className="rounded-full bg-white text-black border border-gray-800 hover:bg-black hover:border-white hover:text-white py-[2.5px] px-[10px]"
            onClick={() => onRemove(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    {/* زرار الشاشات الصغيرة */}
    <div className="block sm:hidden flex gap-2 mt-2 sm:mt-0">
      <button
        className="rounded-full flex-1 bg-white text-black border border-gray-800 hover:bg-black hover:border-white hover:text-white py-[2.5px] px-[10px]"
        onClick={() => onMoveToCart(product)}
      >
        Move to cart
      </button>
      <button
        className="rounded-full flex-1 bg-white text-black border border-gray-800 hover:bg-black hover:border-white hover:text-white py-[2.5px] px-[10px]"
        onClick={() => onRemove(product.id)}
      >
        Delete
      </button>
    </div>
  </div>
);

export default SavedForLaterCard