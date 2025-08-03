import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ width, response }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { cart, setSearchResults } = useContext(GlobalContext)

    // fetch data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get("https://fakestoreapi.com/products", { timeout: 100000 })
                setProducts(response.data)
                setFilteredProducts(response.data)
            } catch (err) {
                setError("Failed to fetch products")
                console.error("Error fetching products:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])


    // filter products from search
    const onSearchHandler = (e) => {
        e.preventDefault()
        navigate('/products/')
        let filterSearch = products.filter((product) => product.title.toLowerCase().includes(input.toLowerCase()))
        setSearchResults(filterSearch)
        setInput('')
    }

    return (
        <>
            {/* Search */}
            < form
                onSubmit={onSearchHandler}
                className={`search flex flex-1 bg-white text-gray-500 ${response} rounded min-w-[${width}px]`}
            >
                <input
                    type="text"
                    placeholder="Search Amazon.eg"
                    className="border-0 outline-0 w-[70%]"
                    style={{ padding: '8px 12px' }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-yellow-500 cursor-pointer"
                    style={{ padding: '0 10px', borderRadius: '0 4px 4px 0', marginLeft: 'auto' }}
                    onClick={() => navigate('/products')}
                >
                    <img src="/images/search.png" />
                </button>
            </form >
        </>
    )
}
export default Search