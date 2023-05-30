
const isValid = function (value) {
    if (typeof value === undefined || value == null || value.length == 0) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
 
 const isValidEmail = function (mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) return true;
      return false;
  };

  const isValidPassword = function (password) {
    if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)) return true;
    return false;
  };
  

     const isValidTicket = function validateTicketArray(ticketArray) {
    // Validate row count
    for(let i=0;i<ticketArray.length;i++){
      if(ticketArray[i].length !== 6) {
        return false;
    }
    }
  
   // check the numbers in asscending order in column
  //  for(let i=0;i<ticketArray.length;i++){
  //         for(let j=0;j<ticketArray[i].length-1;j++){  
            
  //           for(let k=0;k<ticketArray[i][j].length;k++){
  //             console.log(ticketArray[i][j][k] ,ticketArray[i][j+1][k])
  //            if(ticketArray[i][j][k] > ticketArray[i][j+1][k]){
  //              return false;
  //            }
  //           }
  //           // console.log(ticketArray[i][j])
  //         } 
  //         console.log("a")
  // }

  for(let i=0;i<ticketArray.length;i++){
            for(let j=0;j<ticketArray[i].length;j++){  
              for(let k=0;k<ticketArray[i][j].length;k++){
                 if(ticketArray[i][j][k] === 0){
                    ticketArray[i][j][k] = 'X'
                 }
              }
            } 
    }

  //check the numbers are only between 1 to 90 and the ticekt is unique
  for (let i = 0; i < ticketArray.length; i++) {
    const subArray = ticketArray[i];
    const seenNumbers = new Set();
    for (let j = 0; j < subArray.length; j++) {
      const row = subArray[j];
      for (let k = 0; k < row.length; k++) {
        const number = row[k];
        if (number < 1 || number > 90 ||seenNumbers.has(number)) {
          return false;
        }
        seenNumbers.add(number);
      }
    }
  }

    return true;
  }
  

  


  module.exports = {isValidEmail ,isValidPassword ,isValid ,isValidTicket}












  









  