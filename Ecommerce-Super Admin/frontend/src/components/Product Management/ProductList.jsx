import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/listproduct")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      });
  }, []);

  // Handle Add New Product
  const handleAddNew = () => {
    navigate("/addproduct");
  };

  // Handle Edit (PUT) request
  const handleEdit = (productId) => {
    const updatedProduct = {
      brand: "Updated Brand",
      title: "Updated Product Title",
      color: "Updated Color",
      price: 1200,
      discountedPrice: 999,
      discountedPercentage: 16.8,
      topCategory: "men",
      subCategory: "casuals",
    };

    axios
      .put(`http://localhost:5000/api/product/editproduct/${productId}`, updatedProduct)
      .then((response) => {
        console.log("Product updated:", response.data);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  // Handle Delete (DELETE) request
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/api/product/deleteproduct/${productId}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  // Define columns for the DataGrid
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="viewButton"
              onClick={() => alert(`Viewing product: ${params.row.title}`)}
            >
              View
            </button>
            <button
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const productColumns = [
    { field: "_id", headerName: "ID", width: 120 },
    { field: "image", headerName: "Image", width: 150, renderCell: (params) => (
        <img src={params.row.image} alt={params.row.title} style={{ width: "100px", height: "auto" }} />
      ),
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "color", headerName: "Color", width: 120 },
    { field: "price", headerName: "Price (₹)", width: 100 },
    // { field: "discountedPrice", headerName: "Discounted Price (₹)", width: 150 },
    // { field: "discountedPercentage", headerName: "Discount %", width: 150 },
    { field: "topCategory", headerName: "Top Category", width: 120 },
    { field: "subCategory", headerName: "Sub Category", width: 180 },
  ];

  return (
    <div className="productlist">
      <div className="productlistTitle">
        Product Listing Page
        <button className="addButton" onClick={handleAddNew}>
          Add Product
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
      <DataGrid
        className="datagrid"
        rows={products}
        columns={[...productColumns, ...actionColumn]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductList;
