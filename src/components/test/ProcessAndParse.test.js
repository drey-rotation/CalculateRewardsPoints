import FetchTransactions from "../FetchTransactions"; 
import CalculatePoints from '../CalculatePoints';
import { processAndParse, compareCustid } from "../../utils/utils";

describe('Integration testing', () => {
  
  it('Should process and parse data', async () => {
    // Mock the fetch api call and serve the test data instead
    const data = require("./allTransactions.json")
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data })
    }))  

    try {
      // Step 1: fetch the data
      const t = await FetchTransactions();
      // not necessary when faking it all. expect(fetch).toHaveBeenCalledTimes(1);
     
      // Step2: Data Prep: Separate the data into months and sort by customerId
      let firstMonth = t.filter(x => x.Month === 1);
      firstMonth.sort(compareCustid);

      let secondMonth = t.filter(x => x.Month === 2);
      secondMonth.sort(compareCustid);

      let thirdMonth = t.filter(x => x.Month === 3);     
      thirdMonth.sort(compareCustid);

      /************************************************************ */
      // Step2: Get the unique CustomerIds from the data
      // for first month
      processAndParse(1, firstMonth);
      processAndParse(2, secondMonth);
      processAndParse(3, thirdMonth);

    } catch (e) {
      console.log(e);
      throw new Error(e)
      
    }
  })

});