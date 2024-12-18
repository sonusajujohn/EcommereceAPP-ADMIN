import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/listproducts")
      .then((response) => {
        console.log("Product Data:", response.data);
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
      price: 1500,
      totalQuantity: 100,
      sizeQuantities: {
        "6": 10,
        "7": 15,
        "8": 20,
        "9": 30,
        "10": 15,
        "11": 10,
      },
      description: "Updated product description",
      topCategory: "women",
      subCategory: "heels",
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
    // Show confirmation dialog before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
    if (isConfirmed) {
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
    } else {
      console.log("Delete operation canceled.");
    }
  };
  

  

  // Define columns for the DataGrid
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
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
      ),
    },
  ];

  const productColumns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/${params.row.image}`} // Adjust the URL if required
          alt={params.row.title}
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "color", headerName: "Color", width: 120 },
    { field: "price", headerName: "Price (₹)", width: 120 },
    { field: "totalQuantity", headerName: "Total Quantity", width: 150 },
    { field: "topCategory", headerName: "Top Category", width: 150 },
    { field: "subCategory", headerName: "Sub Category", width: 180 },
    { field: "description", headerName: "Description", width: 250 },
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
