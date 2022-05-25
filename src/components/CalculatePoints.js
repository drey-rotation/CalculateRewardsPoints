// A customer receives 2 points for every dollar spent over $100 in each 
// transaction, plus 1 point for every dollar spent over $50 in each 
// transaction
//   (e.g.a $120 purchase = 2x$20 + 1x$50 = 90 points).


function CalculatePoints(transactionAmount) { 
  var points = 0;
  if (transactionAmount <= 50) return points;

  points = (transactionAmount - 50);  // every dollar spent over $50
  if (transactionAmount > 100) {
    points += (transactionAmount - 100) * 2; // every dollar spent over $100*2
  }
  
  return Math.floor(points);
}


export default CalculatePoints;