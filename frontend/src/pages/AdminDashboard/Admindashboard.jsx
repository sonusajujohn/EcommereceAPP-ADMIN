import React, { useState } from "react";
import "./AdminDashboard.css"; // CSS file for styling
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Bar } from "react-chartjs-2";
import { TrendingUp } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Pie } from "react-chartjs-2"; // Importing Pie chart

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Pie chart data for customer sentiment
const CustomerSentimentPieChart = () => {
  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [60, 25, 15], // Example data in percentage
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"], // Colors for each sentiment
        borderColor: ["#ffffff", "#ffffff", "#ffffff"], // Border color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

// Chart Data for Monthly Sales
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Monthly Sales",
      data: [120, 200, 300, 500, 700, 800, 500, 400, 300, 100, 200, 400],
      backgroundColor: "#3f51b5",
      borderRadius: 8,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" },
    title: { display: true, text: "Sales Overview (Last 12 Months)" },
  },
};

// Sales Data for Monthly Overview
const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "#E5D68A",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customers",
    color: "#22CB5C",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "#DE4839",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88k",
    title: "Revenue",
    color: "#12B0E8",
    icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (product) => {
    console.log("Saving product:", product);
    // Here you would update the product in your state or API
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleSave(editedProduct);
    handleClose();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => navigate("/admindashboard")}>
            <DashboardIcon className="sidebar-icon" /> Dashboard
          </li>
          <li className="sidebar-item" onClick={() => navigate("/productlist")}>
            <InventoryIcon className="sidebar-icon" /> ProductManagement
          </li>
          <li className="sidebar-item" onClick={() => navigate("/categorymanagement")}>
            <CategoryIcon className="sidebar-icon" /> CategoryManagement
          </li>
          <li className="sidebar-item" onClick={() => navigate("/orders")}>
            <ShoppingCartIcon className="sidebar-icon" /> OrderManagement
          </li>
          <li className="sidebar-item" onClick={() => navigate("/users")}>
            <PeopleIcon className="sidebar-icon" /> UserManagement
          </li>
          <li className="sidebar-item" onClick={() => navigate("/")}>
            <LogoutIcon className="sidebar-icon" /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Monthly Overview and Shop with Shoztop in one line */}
        <div className="overview-container">
          {/* Shop with Shoztop Section */}
          <Card className="achievement-card">
            <CardContent>
              <div className="achievement-header">
                <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
                  Shop with Shoztop
                </Typography>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2784/2784439.png"
                  alt="Trophy"
                  className="trophy-icon"
                />
              </div>
              <Typography variant="body2">Congratulations 🥳</Typography>
              <Typography variant="h5" className="highlighted-text">
                420.8K
              </Typography>
              <Button size="small" variant="contained" className="view-sales-button">
                View Sales
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <Card className="monthly-overview">
            <h3>Monthly Overview</h3>
            <Grid container spacing={3}>
              {salesData.map((item, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <div className="overview-item">
                    <div
                      className="overview-icon"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="overview-title">{item.title}</h4>
                      <p className="overview-stats">{item.stats}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>

        <div className="chart-cards-container">
  

  <Card className="chart-card1">
    <h3 className="chart-title">Monthly Sales Chart</h3>
    <Bar data={data} options={options} />
  </Card>


  <Card className="chart-card">
    <h3 className="chart-title">Customer Sentiment Analysis</h3>
    <CustomerSentimentPieChart />
  </Card>
</div>

        {/* Dashboard Overview */}
        <div className="dashboard-cards">
          <Card className="dashboard-card">
            <h3>Total Products</h3>
            <p className="card-data">120</p>
            <Button
              variant="contained"
              className="card-button"
              onClick={() => navigate("/admin/productlist")}
            >
              View Products
            </Button>
          </Card>

          <Card className="dashboard-card">
            <h3>Pending Orders</h3>
            <p className="card-data">15</p>
            <Button
              variant="contained"
              className="card-button"
              onClick={() => navigate("/admin/orders")}
            >
              View Orders
            </Button>
          </Card>

          <Card className="dashboard-card">
            <h3>Categories</h3>
            <p className="card-data">5</p>
            <Button
              variant="contained"
              className="card-button"
              onClick={() => navigate("/admin/categorymanagement")}
            >
              Manage Categories
            </Button>
          </Card>

          <Card className="dashboard-card">
            <h3>Registered Users</h3>
            <p className="card-data">350</p>
            <Button
              variant="contained"
              className="card-button"
              onClick={() => navigate("/admin/users")}
            >
              View Users
            </Button>
          </Card>
        </div>
      </div>

      {/* Edit Product Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            value={editedProduct.name}
            name="name"
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Product Price"
            fullWidth
            value={editedProduct.price}
            name="price"
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Product Quantity"
            fullWidth
            value={editedProduct.quantity}
            name="quantity"
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
