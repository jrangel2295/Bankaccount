function logTransaction(){

    let currentAmount = document.getElementById("amount").value;
    let currentPayee = document.getElementById("payee").value
    let recentTransaction = new Transaction(currentAmount, currentPayee); 
  
    let lineItem = document.createElement("li"); 
    document.getElementById("transList").appendChild(lineItem);
    lineItem.append(JSON.stringify(recentTransaction));
  }
  
  
  class BankAccount{
  
    accountNumber;
    owner;
    transactions;
    
    constructor(inputAccountNumber, inputOwner){
      this.accountNumber = inputAccountNumber;
      this.owner = inputOwner;
      this.transactions = [];  
    }
      
    balance(){
        
      
      let currentBalance = 0; 
    
      
      for(let i = 0; i < this.transactions.length; i++){  
        let transactionAmount = this.transactions[i].amount;
        currentBalance += transactionAmount;
      } 
      return currentBalance; 
    }
    
    deposit(incomingPayments){
      //if amount of incoming payment transaction(instance) is less than 0, then log following statement, else push the incoming payment to transactions array
      if(incomingPayments.amount < 0){
        console.log("You cannot deposit a negative amount of money."); 
      }else{
        this.transactions.push(incomingPayments); 
      }
    }
    
    charge(payee, outgoingPayments){
    
      if(outgoingPayments.amount > 0){
        //if amount of outgoing payment transaction (instance) is greater than 0 then log following statement, else if current bankaccount balance (for whichever instance) plus the amount of outgoing payment results in negative funds then log next statement. If neither condititon is met then push the charge to transactions array 
        console.log('Amount must be negative because you are charging/debiting your account.'); 
      }else if(this.balance() + outgoingPayments.amount < 0 ){
        console.log('Cannot approve this transaction of ' + outgoingPayments.amount + ' dollars to/for ' + outgoingPayments.payee + ' due to insufficient funds in your account. Will result in overdraft. The overdraft amount would be ' + (this.balance() - Math.abs(outgoingPayments.amount)) + ' dollars.');
      }else{
        this.transactions.push(outgoingPayments); 
      }
    }
  }
    
  class Transaction{
    
    date; 
    amount;
    payee;
    
    constructor(inputAmount, inputPayee){
      this.amount = inputAmount;
      this.payee = inputPayee; 
      this.date = new Date(); 
    }
  }
    
  class SavingsAccount extends BankAccount{
    
    interestRate; 
    
    constructor(inputAccountNumber, inputOwner, inputInterestRate){
      super(inputAccountNumber, inputOwner);
      this.interestRate = inputInterestRate / 100; 
    }
    
    accrueInterest(){
      let interestAmount = this.balance() * this.interestRate;
      let totalAmount = interestAmount + this.balance(); 
    
      return 'The amount of interest generated is ' + interestAmount + ' and the account total is now ' + totalAmount; 
    }
  }
    
  /// new instance of bank account created below (1st one):///
  
  const johnChecking = new BankAccount('185767', 'Johnny Rangel'); 
  
  document.getElementById("name").value = johnChecking.owner;
  document.getElementById("currentAccount").innerHTML =  johnChecking.owner;
  document.getElementById("accountnumber").value = johnChecking.accountNumber;
    
  
    
  ///new transaction instances created below for johns checking:///
    
  const incomeCheck = new Transaction(1230.00, 'income payment from job');
  //console.log(incomeCheck);
    
  const dividendPayment = new Transaction(400.00, 'payout from current investments');
  //console.log(dividendPayment); 
    
  const phoneBillPayment = new Transaction(-75.00, 'payment to AT&T for wireless service');
  //console.log(phoneBillPayment);
    
  const rent = new Transaction(-1000.00, 'rent payment');
  //console.log(rent); 
    
  const tvPurchase = new Transaction(-500.00, 'payment for new tv');
  //console.log(tvPurchase); 
    
  const workoutEquipment = new Transaction(-4000.00, 'payment for workout equip');
  //console.log(workoutEquipment);
    
  ///transactions, updated balances, snapshot of john account below: ///
  
  document.getElementById("balance").value = johnChecking.balance(); 
    
    
  ///new instance of savings account created below:///
    
  const jimmySavings = new SavingsAccount('18456746', 'Jimmy Johnson', 2.0);
  //console.log(jimmySavings); 
    
  ///new transaction for jimmySavings(deposit):/// 
    
  const trustFundDeposit = new Transaction(5781.00, 'continue from trust fund');
  //console.log(trustFundDeposit); 
    
  ////activity below for jimmySavings account:////
    
  //jimmySavings.deposit(trustFundDeposit); 
  //console.log(jimmySavings);
  //jimmySavings.balance(); 
  //console.log(jimmySavings.accrueInterest()); 
    
