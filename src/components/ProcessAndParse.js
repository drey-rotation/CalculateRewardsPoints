import FetchTransactions from "./FetchTransactions";
import CalculatePoints from './CalculatePoints';

function ProcessAndParse(transactionData) {

  try {

    // Step2: Data Prep: Separate the data into months and sort by customerId
    let firstMonth = transactionData.filter(x => x.Month === 1);
    firstMonth.sort(compareCustid);

    let secondMonth = transactionData.filter(x => x.Month === 2);
    secondMonth.sort(compareCustid);

    let thirdMonth = transactionData.filter(x => x.Month === 3);
    thirdMonth.sort(compareCustid);

    /************************************************************ */
    // Step2: Get the unique CustomerIds from the data
    // for first month
    const month1CustomerData = ParseByCustomer(1, firstMonth);
    const month2CustomerData = ParseByCustomer(2, secondMonth);
    const month3CustomerData = ParseByCustomer(3, thirdMonth);

    return {
      firstMonth: { data: firstMonth,  customerData: month1CustomerData}, 
      secondMonth: { data: secondMonth, customerData: month2CustomerData },
      thirdMonth: { data: thirdMonth, customerData: month3CustomerData }
    }

  } catch (e) {
    console.log(e);
    throw new Error(e)

  }

}
function ParseByCustomer(monthNumber, monthData) {
  let uniqueCustomerIds = getUniqueCustomerIds(monthData);
  let retVal = [];

  // Step3: For each month and For each unique customer, 
  //  add up all their transactions for the month
  //  compute the number of reward points for the month   
  for (var i = 0; i < uniqueCustomerIds.length; i++) {
    // customerSpentAmounts is an array containing all transactions from a specific
    // customer
    let customerId = uniqueCustomerIds[i].CustomerId;
    let customerTransactions = monthData.filter(x => x.CustomerId === customerId);
    let totalSpentByCustomer = 0;
    let points = 0; 
    let cumulativePoints=0;
    for (var j = 0; j < customerTransactions.length; j++) {
      
      totalSpentByCustomer += customerTransactions[j].AmountSpent;
      points = CalculatePoints(customerTransactions[j].AmountSpent);
      cumulativePoints += points;
      retVal.push(
        { transactionId: uniqueCustomerIds[i].TransactionId, 
          customerId: customerId, 
          points: points, 
          Month: monthNumber, 
          totalSpent: customerTransactions[j].AmountSpent,
          cumulativePoints: cumulativePoints}
      );
    }

    monthData[i].points = points;
    // let points = CalculatePoints(totalSpent); //3, customerId, customerSpentAmounts);
    console.log(`Month: ${monthNumber} CustomerId: ${customerId} TotalSpent: ${totalSpentByCustomer}, Points: ${points}`);

  }

  return retVal;
}

function ParseByCustomer1(monthNumber, monthData) {
  let uniqueCustomerIds = getUniqueCustomerIds(monthData);
  let retVal = [];

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

    monthData[i].points = points;

    // let points = CalculatePoints(totalSpent); //3, customerId, customerSpentAmounts);
    console.log(`Month: ${monthNumber} CustomerId: ${customerId} TotalSpent: ${totalSpentByCustomer}, Points: ${points}`);


    // retVal.push( { customerId: customerId, totalSpent: totalSpentByCustomer, points: points})
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

// describe('Unit testing', () => {

//   it('Should process and parse data', async () => {
//     // Mock the fetch api call and serve the test data instead
//     const data = require("./allTransactions.json")
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ data })
//       }))

//     try {
//       // Step 1: fetch the data
//       const t = await FetchTransactions();
//       expect(fetch).toHaveBeenCalledTimes(1);

//       // Step2: Data Prep: Separate the data into months and sort by customerId
//       let firstMonth = t.filter(x => x.Month === 1);
//       firstMonth.sort(compareCustid);

//       let secondMonth = t.filter(x => x.Month === 2);
//       secondMonth.sort(compareCustid);

//       let thirdMonth = t.filter(x => x.Month === 3);
//       thirdMonth.sort(compareCustid);

//       /************************************************************ */
//       // Step2: Get the unique CustomerIds from the data
//       // for first month
//       processAndParse(1, firstMonth);
//       processAndParse(2, secondMonth);
//       processAndParse(3, thirdMonth);

//     } catch (e) {
//       console.log(e);
//       throw new Error(e)

//     }
//   })

// });

export default ProcessAndParse;