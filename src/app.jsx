import React, { useState, useEffect } from 'react'; 
import CalculatePoints from "./components/CalculatePoints";
import FetchTransactions from "./components/FetchTransactions";
import ProcessAndParse from "./components/ProcessAndParse"; 
import './components/css/App.css';

/**
 * Render RewardsPoints per customer
 * @param {*} props 
 * @returns 
 */
function RewardsPointsApp(props) {
  const [firstMonthTransactions, setFirstMonthTransactions] = useState(undefined)
  const [secondMonthTransactions, setSecondMonthTransactions] = useState(undefined)
  const [thirdMonthTransactions, setThirdMonthTransactions] = useState(undefined)

  function tableHeader() {
    return (
      <tr>
        <th>Trans Id#</th>
        <th>Month</th>
        <th>CustId</th>
        <th>$Spent</th>
        <th>Award Points</th>
        <th>Customer Total</th>
      </tr>
    )
  }
  const tableheader = tableHeader();

  function tableContent(data) {
    return (
      data.map(function (item, i) {
        return (
          <tr>
            <td>{item.transactionId}</td>
            <td>{item.Month}</td>
            <td>{item.customerId}</td>           
            <td>${item.totalSpent}</td>
            <td>{item.points}</td>
            <td>{item.cumulativePoints}</td>
          </tr>
        )
      })
    )
  };


  useEffect( () => {
    async function fetchData() {
      const results = await FetchTransactions();
      let processedResults = ProcessAndParse(results);
      setFirstMonthTransactions(processedResults.firstMonth);
      setSecondMonthTransactions(processedResults.secondMonth);
      setThirdMonthTransactions(processedResults.thirdMonth);
    }
    fetchData();
  }, []);


  return (
    <>
    <div class="center">
        <p>
            A customer receives 2 points for every dollar spent over $100 in each 
            transaction, plus 1 point for every dollar spent over $50 in each 
            transaction (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

            Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.
        </p>     
      
        <div>          
          <table class="resultsTable">        
            {tableheader}
            {firstMonthTransactions ? (
              <>
                  {tableContent(firstMonthTransactions.customerData)} 
              </>
            ) : (
              <tr>Nothing to see here...</tr>
            )
            }
          </table>
        </div>

        <div>
          <table class="resultsTable">
            {tableheader}
            {secondMonthTransactions ? (
              <>
                {tableContent(secondMonthTransactions.customerData)}
              </>
            ) : (
              <tr>Nothing to see here...</tr>
            )
            }
          </table>
        </div>

        <div>
          <table class="resultsTable">
            {tableheader}
            {thirdMonthTransactions ? (
              <>
                {tableContent(thirdMonthTransactions.customerData)}
              </>
            ) : (
              <tr>Nothing to see here...</tr>
            )
            }
          </table>
        </div>
      </div>
      
  </>
  );

}

export default RewardsPointsApp;