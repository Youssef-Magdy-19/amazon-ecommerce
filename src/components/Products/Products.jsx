import axios from "axios";
import { useContext, useState } from "react";
import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import StarRating from "../StarRating/StarRating";
import { Helmet } from "react-helmet";
import style from "./Products.css";

export default function Products() {
  localStorage.removeItem("code");
  localStorage.removeItem("verifycode");

  let {
    addToCart,
    addToWishList,
    setWishListNumber,
    getWishList,
    deleteWishList,
    setDataWishList,
    getCart,
  } = useContext(cartContext);
  const [matchingProductIds, setMatchingProductIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  async function getProducts(page = currentPage) {
    const productsPerPage = 12;
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${productsPerPage}`
    );
  }

  let { data, isLoading } = useQuery(
    ["products", currentPage],
    () => getProducts(currentPage),
    {
      cacheTime: 3000,
      refetchInterval: 3000,
    }
  );
  let products = data?.data.data;

  useEffect(() => {
    (async () => {
      await getCart();
      let dataa = await getWishList();
      let wish = dataa.data?.data;
      // Check if products and wish are defined
      if (products && wish) {
        const isMatch = products.some((product) => {
          return wish.some((wishedItem) => {
            // Compare properties (e.g., assuming 'id' is a unique identifier)
            return product.id === wishedItem.id;
          });
        });

        if (isMatch) {
          // console.log('Some products match the wish list.');
          const matchingProductIds = products
            .filter((product) =>
              wish.some((wishedItem) => product.id === wishedItem.id)
            )
            .map((matchingProduct) => matchingProduct.id);
          setMatchingProductIds(matchingProductIds);
        } else {
        }
      } else {
      }
    })();
  }, [data?.data.data, getWishList, products]);

async function handleAdd(productId) {
  const data = await addToCart(productId);
  if (data?.status === "success") {
    toast.success("Product added to cart");
  } else {
    toast.error("Something went wrong");
  }
}



  async function addToMyWishList(e, id) {
    if (!matchingProductIds.includes(id)) {
      e.target.classList.replace("fa-regular", "fa-solid");
      let { data } = await addToWishList(id);
      // console.log(data.data.length);
      if (data.status === "success") {
        toast.success(data.message);
        setWishListNumber(data.data.length);
      }
    } else {
      e.target.classList.replace("fa-solid", "fa-regular");
      let data = await deleteWishList(id);
      // console.log(data.data.data.length);
      if (data.status === 200) {
        setDataWishList(data.data.data);
        setWishListNumber(data.data.data.length);
        toast.error("Product removed from wishlist");
      }
    }
  }

  const productsPerPage = 10;
  const totalPages = Math.ceil(data?.data.totalPages / productsPerPage) || 5;

  return (
    <>
      <div className="row mb-4" style={{ marginTop: "110px" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Explore our curated collection of high-quality products. Shop now for the best deals!"
          />
          <title>Products</title>
        </Helmet>
        {!isLoading ? (
          <>
            {data?.data.data.map((product) => {
              return (
                <div className="col-md-4 col-lg-3" key={product._id}>
                  <div className={`card product ${style.pad} mb-5`}>
                    <div className="card-body">
                      <Link to={`/details/${product._id}`}>
                        <img
                          src={product.imageCover}
                          className="w-100 mb-2"
                          alt={product.title}
                        />
                        <p className="text-main text-nowrap">
                          {product.category.name}
                        </p>
                        <h6 className={` fw-bold mb-4 ${style.spac}`}>
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </h6>
                        <div className="d-flex justify-content-between">
                          <StarRating rating={product.ratingsAverage} />
                          <span className={`${style.fs9} text-muted mt-1`}>
                            ({product.sold})
                          </span>
                        </div>
                        <span>{product.price}EGP</span>
                      </Link>
                      <div className="d-inline float-end ">
                        <button
                          onClick={(e) => {
                            addToMyWishList(e, product._id);
                          }}
                          className="btnAction"
                        >
                          <i
                            className={`fa-${
                              matchingProductIds.includes(product._id)
                                ? "solid"
                                : "regular"
                            } fa-heart fs-5`}
                          ></i>
                        </button>
                      </div>
                      <button
                        onClick={() => handleAdd(product._id)}
                        className="btn btn-warning w-100 text-white"
                      >
                        <i className="fa-solid fa-cart-plus me-1"></i> Add to
                        Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <nav aria-label="Page navigation">
              <ul className="pagination m-auto justify-content-center my-5">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link rounded-2"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {/*             {[...Array(totalPages).keys()].map((page) => (
              <li key={page + 1} className={`page-item ${currentPage === page + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(page + 1)}>
                  {page + 1}
                </button>
              </li>
            ))} */}

                <li
                  className={` ms-3  page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link rounded-2"
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next page
                  </button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <div className=" vh-100 d-flex justify-content-center align-items-center">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#c57b1aff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </>
  );
}
