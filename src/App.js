import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentpage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((d) => {
        setProducts(d.products);
      });
  }, []);

  const totalProducts = products.length;
  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = currentpage * productsPerPage; // 6 * 10 = 60
  const endIndex = startIndex + productsPerPage; // 60 + 10 = 70

  return (
    <div className="container">
      <h1>Pagination</h1>
      <div className="products-container">
        {products.length === 0 || !products
          ? "No products"
          : products.slice(startIndex, endIndex).map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.thumbnail} height={"200px"} width={"200px"} />
                <p>{product.title}</p>
                <p className="price">${product.price}</p>
              </div>
            ))}
      </div>

      <div className="buttons">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentpage == 0}
        >
          {"<"}
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page == currentpage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentpage == totalPages - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default App;
