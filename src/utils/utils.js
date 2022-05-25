import CalculatePoints from '../components/CalculatePoints';


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

exports.compareCustid = function(a, b) {
  if (a.CustomerId < b.CustomerId) {
    return -1;
  }
  if (a.CustomerId > b.CustomerId) {
    return 1;
  }
  return 0;
}

exports.processAndParse = function(monthNumber, monthData) {
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





