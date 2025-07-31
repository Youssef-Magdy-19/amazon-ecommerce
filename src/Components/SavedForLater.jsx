import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ShoppingCart, Trash2 } from 'lucide-react';
import SavedForLaterCard from './SavedForLaterCard';

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
    if (savedForLater.length === 0) {
        return null;
    }

    return (
        <div className="saved-for-later bg-white py-3 px-3 mt-4">
            <h2 className="text-xl font-bold mb-1 pb-2">
                Saved for Later ({savedForLater.length} items)
            </h2>
            <div className="sm:p-3 sm:border border-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0.5rem]">
                {savedForLater.length === 0 && <p className='text-lg text-center'>No Items saved for later</p>}
                {savedForLater.map((product , index) => (
                    <SavedForLaterCard key={index} product={product} onMoveToCart={handleMoveToCart} onRemove={removeFromSavedForLater} />
                ))}
            </div>
        </div>
    );
};

export default SavedForLater