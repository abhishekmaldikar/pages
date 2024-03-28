import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const formattedData = await response.json();
      setData(formattedData);
    } catch (e) {
      alert("failed to fetch data")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


 
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table style={{width : "118rem" ,height : "50rem" }}>
        <tbody>
        <tr style={{textAlign : "start" ,backgroundColor : "lightgreen",color : "white"}}>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {currentItems.map((obj) => (
          <tr >
            <td>{obj.id}</td>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
            <td>{obj.role}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div style={{display : "flex" , gap : "5px"}}>
        <button onClick={prevPage} style={{height : "50px" , backgroundColor : "lightgreen" ,border : "none",borderRadius : "4px"}} disabled={currentPage === 1}>Previous</button>
        <div style={{backgroundColor : "lightgreen" , borderRadius : "3px", width : "50px"}}>{currentPage}</div>
        <button onClick={nextPage}  style={{height : "50px" , backgroundColor : "lightgreen", border : "none",borderRadius : "4px"}} disabled={indexOfLastItem >= data.length}>Next</button>
      </div>
    </div>
  );
}

export default App;
