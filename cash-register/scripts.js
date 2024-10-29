function countDrawer(cid) {
    let sum = 0;
    for (let currency in cid) {
      sum = Math.round((sum + cid[currency][1]) * 100) / 100;
    }
    return sum;
  }
  
  function canMakeChange(change, cid) {
    let divisibles = {
      "0": 10000,
      "1": 2000,
      "2": 1000,
      "3": 500,
      "4": 100,
      "5": 25,
      "6": 10,
      "7": 5,
      "8": 1
    };
    let change_bank = [];
    // console.log(change);
    let cash_out = 0;
    let check = false;
    cid = cid.reverse();
    change = Math.round(change * 100);
    // console.log("change:", change);
  
    // Iterate through cid dict
    for (let currency in cid) {
        // For each denomination: 
        // Convert into cents ( * 100)
        // console.log("checking", cid[currency][0]);
        let currency_str = currency.toString()
        let cash_in_cents = Math.round(cid[currency][1] * 100);
        // If result > 0:
        // console.log("change bank start: ", change_bank);
        if (cash_in_cents > 0) {
          // If change - cash_out >= cash_in_cents for this denomination:
          if (change - cash_out >= cash_in_cents) {
            // cash_out += cash_in_cents
            cash_out += cash_in_cents;
            // console.log("cash out: 1", cash_out);
            // Check change_bank for element with key equal to cid[currency][0]
              if (change_bank.length == 0) {
                change_bank.push([cid[currency][0], cash_in_cents / 100]);
                // console.log("change bank amended: 1", change_bank);
              }
              else {
                let check = false;
                for (let denomination in change_bank) {
                  if (change_bank[denomination][0].includes(cid[currency][0])) {
                    change_bank[denomination][1] += cash_in_cents / 100;
                    // console.log("change bank amended: 2", change_bank);
                    check = true;
                  }
                }
                if (!check) {
                    change_bank.push([cid[currency][0], cash_in_cents / 100]);
                    // console.log("change bank amended: 2.5", change_bank);
                  }
              }
            }
        // Else (only option would be for change still needed to be LESS than cash_in_cents for this denomination)
          else {
          // If change - cash_out >= divisibles[currency_str] (meaning we can use at least one of this denomination to make more change):
            if (change - cash_out >= divisibles[currency_str]) {
              // Caclulate how many of this denomination we can use (e.g. get me the number of quarters we can use, until the remaining change needed is less than one quarter denomination) 
              // Add to cash_out
              let remaining = (change - cash_out);
              let amount = remaining % divisibles[currency_str];
              // console.log("amount: ", amount);
              cash_out += (remaining - amount);
              // console.log("cash out: 2", cash_out);
              // Check change_bank for element with key equal to cid[currency][0]
            if (change_bank.length == 0) {
              // console.log("hello");
              change_bank.push([cid[currency][0], (remaining - amount) / 100]);
              // console.log("change bank amended: 3", change_bank);
              }
            else {
              let check = false;
              for (let denomination in change_bank) {
                if (change_bank[denomination][0].includes(cid[currency][0])) {
                  // console.log("true");
                  change_bank[denomination][1] += (remaining - amount) / 100;
                  // console.log("change banke amended: 4", change_bank);
                  check = true;
                }
              }
              if (!check) {
                change_bank.push([cid[currency][0], (remaining - amount) / 100]);
                // console.log("change bank amended: 2.5", change_bank);
              }
            }
        }
      } 
        }
      }
      if (cash_out == change) {
        // console.log("change bank match!");
        check = true;
        return change_bank;
      }
      return check;
  }
  
  function checkCashRegister(price, cash, cid) {
    let response = {
      "status": '',
      "change": []
    }
    let change = cash - price;
    console.log(cid);
    // If needed change > cid total OR canMakeChange returns false, set appropriate response
    if (((cash - price) > countDrawer(cid)) || !canMakeChange(change, cid)) {
      response.status = 'INSUFFICIENT_FUNDS';
      // console.log(response);
      return response;
    }
    // Else if needed change < cid total AND canMakeChange returns a dictionary:
    else if ((cash - price) <= countDrawer(cid) && canMakeChange(change, cid)) {
      // console.log("hello");
      // Set change field to return value of canMakeChange()
      response.change = canMakeChange(change, cid);
      // console.log("function call: ", canMakeChange(change, cid));
      // If cid total > needed change, stay open
      if (countDrawer(cid) > countDrawer(canMakeChange(change, cid))) {
        response.status = "OPEN";
      }
      // Else (cid total <= needed change), close (set change value to input value)
      else {
        response.status = "CLOSED";
        response.change = cid;
      }
    }
    // console.log("end");
    console.log(response);
    return response;
  }

  function buttonClick() {
    document.querySelector(".submit-button").addEventListener("click", () => {
        let cid = [];
        cid.push(["ONE HUNDRED", parseFloat(document.querySelector("#hundred").value)]);
        cid.push(["TWENTY", parseFloat(document.querySelector("#twenty").value)]);
        cid.push(["TEN", parseFloat(document.querySelector("#ten").value)]);
        cid.push(["FIVE", parseFloat(document.querySelector("#five").value)]);
        cid.push(["ONE", parseFloat(document.querySelector("#one").value)]);
        cid.push(["QUARTER", parseFloat(document.querySelector("#quarter").value)]);
        cid.push(["DIME", parseFloat(document.querySelector("#dime").value)]);
        cid.push(["NICKEL", parseFloat(document.querySelector("#nickel").value)]);
        cid.push(["PENNY", parseFloat(document.querySelector("#penny").value)]);
        let price = parseFloat(document.querySelector("#price").value);
        let cash = parseFloat(document.querySelector("#cash").value);

        cid = cid.reverse();

        let check = checkCashRegister(price, cash, cid);
        console.log("check:", check);
        let result = document.createElement("div");
        result.textContent = JSON.stringify(check, null, 2);
        console.log(result);
        document.querySelector(".result").appendChild(result);

    })
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    buttonClick();
  });  

//   checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  // canMakeChange(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);