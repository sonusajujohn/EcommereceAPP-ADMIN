import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Revenue from "../../components/revenue/Revenue";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widgets/Widget";
import "./Home.css";
// import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
     <div className="homeContainer">
        <Navbar />
         <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Revenue/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {/*<div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>*/}
      </div> 
    </div>
  );
};

export default Home;
