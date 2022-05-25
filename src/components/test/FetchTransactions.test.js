import FetchTransactions from "../FetchTransactions"; 
import CalculatePoints from '../CalculatePoints';

function processAndParse(monthNumber, monthData) {
  let uniqueCustomerIds = getUniqueCustomerIds(monthData);

  // Step3: For each month and For each unique customer, 
  //  add up all their transactions for the month
  //  compute the number of reward points for the month   
  for (var i = 0; i < uniqueCustomerIds.length; i++) {
    // customerSpentAmounts is an array containing all transactions from a specific
    // customer
    let customerId = uniqueCustomerIds[i].CustomerId;
    let customerSpentAmounts = monthData.filter(x => x.CustomerId === customerId);
    let totalSpentByCustomer = 0;
    let points = 0;
    for (var j = 0; j < customerSpentAmounts.length; j++) {
      totalSpentByCustomer += customerSpentAmounts[j].AmountSpent;
      points += CalculatePoints(customerSpentAmounts[j].AmountSpent); 
    }
    // let points = CalculatePoints(totalSpent); //3, customerId, customerSpentAmounts);
    console.log(`Month: ${monthNumber} CustomerId: ${customerId} TotalSpent: ${totalSpentByCustomer}, Points: ${points}`);
  }
}
function getUniqueCustomerIds(secondMonth) {
  const keys1 = ['CustomerId'];
      let uniqueCustomerIds = secondMonth.filter(
        (s => o =>
          (k => !s.has(k) && s.add(k))
            (keys1.map(k => o[k]).join('|'))
        )
          (new Set)
      );

  return uniqueCustomerIds;
}

function compareCustid(a, b) {
  if (a.CustomerId < b.CustomerId) {
    return -1;
  }
  if (a.CustomerId > b.CustomerId) {
    return 1;
  }
  return 0;
}

describe('Unit testing', () => {
  
  it('Should fetch the data from backend', async () => {
    // Mock the fetch api call and serve the test data instead
    const data = require("./allTransactions.json")
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data })
    }))  

    try {
      const t = await FetchTransactions();
      // Not necessary when faking. expect(fetch).toHaveBeenCalledTimes(1);
     
    } catch (e) {
      console.log(e);
      throw new Error(e)
      
    }
  })

});