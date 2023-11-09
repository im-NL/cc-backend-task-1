const prompt = require("prompt-sync")();

class Expense{
  constructor(amount, category, date, description) {
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
  }
}

var expenses = [];
var limit = Infinity

function listExpenses() {
  if(expenses.length == 0) {
    console.log("You have no expenses");
    return;
  }
  console.log("Here is a list of all your expenses: ")
  expenses.forEach(expense => {
    console.log(expense.description + ": " + expense.amount);
  })
}
// list expenses on a given date
function listD() {
  let date = prompt("Enter the date on which you want to see your expenses: ")
  if(expenses.length == 0) {
    console.log("You have no expenses");
    return;
  }
  console.log("Here is a list of all your expenses on " + date + " (dd-mm-yyyy format): ")
  expenses.forEach(expense => {
    if(expense.date == date) {
      console.log(expense.description + ": " + expense.amount);
    }
  })
}

function totalExpenses() {
  let total = 0;
  expenses.forEach(expense => {
    total += expense.amount;
  })
  return total;
}

function addExpense() {
  if(totalExpenses() > limit) {
    console.log(totalExpenses() + " exceeds the limit of " + limit + ". Cannot add");
    return;
    }
  var expense = prompt("Please enter the expense description: ")
  var amount = prompt("Please enter the expense amount: ")
  var category = prompt("Please enter the expense category: ")
  var date = prompt("Please enter the expense date: ")
  // get todays date 
  // if (date == "") {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();
  //   date = dd + "-" + mm + "-" + yyyy;
  //   console.log(date)
  // }
  // was having issues with incorrect timezone considered as today's date 
  var expense = new Expense(amount, category, date, expense)
  expenses.push(expense)
  console.log("Expense added!")
}

function changeLimit() {
  limit = parseInt(prompt("Please enter the new limit: "))
  console.log("Limit changed to " + limit)
}

// creating a dict with functions as values for easier scaling
var funcs = {
    "list": listExpenses,
    "listd": listD,
    "add": addExpense,
    "changelimit": changeLimit, 
    // "remove": removeExpense,
    
}

function runtime() {
  let input = prompt("What would you like to do? (write h for help):\n ");
  if (input in funcs) {
      funcs[input]();
  
  } else if (input == "h") {
      console.log("list: lists all expenses")
      console.log("listd: lists all expenses on a given date")
      console.log("add: adds an expense")
      console.log("changelimit: changes the expense limit")
      console.log("h: prints this help message")
      console.log("q: quits the program")
  } else if (input == "q") {
      return;
  } else {
      console.log("Invalid command")
  }
  runtime()
}

runtime()