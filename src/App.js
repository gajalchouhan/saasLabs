import logo from './logo.svg';
import './App.css';
import React, { useState,  useEffect } from 'react';

function App() {

  // create a state to store the intial data and current page index value.
  const [data , setData] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const itemPerPage = 5;


  // uses to fetch the call 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch(error) {
        console.log(error);
      }
    } 
    fetchData();
  }, []);

  // Calculate the Index veriable;
  let totalPage = data.length/itemPerPage;
  let startingIndex = (currentPage -1) * itemPerPage;
  let endIndex = startingIndex + itemPerPage;
  let currentPageItem = data.slice(startingIndex, endIndex);

  // help to get previous page
  const handlePreviousPage = () => {
    if(currentPage > 1)
      {
       setCurrentPage(currentPage - 1);
      }  
  }

  // help to get the next page;
  const handleNextPage = () => {
    if(currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="App">
      <table>
        <thead className=''>
          <tr>
            <th>
              S.No.
            </th>
            <th>
              Percentage funded
            </th>
            <th>
              Amount Pledged
            </th>
          </tr>
        </thead>
        <tbody className=''>
          {
            currentPageItem.map((item, index) => {
              return (<tr>
                <td> {startingIndex + index + 1}</td>
                <td> {item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>)
            })
          }
        </tbody>
      </table>

      <div>
        <button className='button' onClick={handlePreviousPage}>
           Previous
        </button>
        <button className='button' onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
