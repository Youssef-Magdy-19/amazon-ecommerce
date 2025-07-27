import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ShoppingCart, Trash2 } from 'lucide-react';

const SavedForLater = () => {
    // 1. بنجيب الداتا والدوال من الكونتكست
    const { 
        savedForLater, 
        removeFromSavedForLater, 
        addProductToCart, 
        removeProductFromCart 
    } = useContext(GlobalContext);

    const handleMoveToCart = (product) => {
        // 2. بنضيف المنتج للكارت ونمسحه من هنا
        addProductToCart(product);
        removeFromSavedForLater(product.id);
    };

    // لو مفيش منتجات محفوظة، مش هنظهر حاجة
    // if (savedForLater.length === 0) {
    //     return null;
    // }

    return (
        <div className="saved-for-later bg-white rounded-lg p-4 mt-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
                Saved for Later ({savedForLater.length} items)
            </h2>
            <div className="space-y-4">
                {savedForLater.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-2 border rounded-md">
                        <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
                        
                        <div className="flex-grow">
                            <h3 className="font-semibold">{product.title}</h3>
                            <p className="text-lg font-bold text-gray-800">{product.price.toFixed(2)} EGP</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <button 
                                onClick={() => handleMoveToCart(product)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-3 py-1 rounded flex items-center gap-1"
                            >
                                <ShoppingCart size={16} />
                                Move to Cart
                            </button>
                            <button
                                onClick={() => removeFromSavedForLater(product.id)}
                                className="text-red-500 hover:bg-red-100 text-sm px-3 py-1 rounded flex items-center gap-1"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedForLater