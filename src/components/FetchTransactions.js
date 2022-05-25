async function FetchTransactions() {
  // const response = await fetch('https://mytransactions.com');
  // const transactions = await response.json();
  // return transactions.data;
  const data = require("./test/allTransactions.json")
  return data;
}

module.exports = FetchTransactions;
