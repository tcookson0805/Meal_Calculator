
///// MENU OBJECT /////
var Menu = {
  lasagna : 15,
  gnocchi : 12,
  bread : 7,
  linguine: 17,
  pizza: 12
}

///// TABLE CONSTRUCTOR FUNCTION ////
var Table = function(){
  this.diners = [];
}

///// ADDS DINER TO TABLE /////
Table.prototype.addDiner = function(diner){
  this.diners.push(diner)
}

///// PREPARES BILL //////
Table.prototype.getBill = function(tax, tip){
  var tax = tax;
  var tip = tip;
  var receipt = {
    total: 0,
    totalTip: 0,
    breakdown: this.diners
  }
  
  var dinerArray = receipt.breakdown;
  
  for(var i = 0; i < dinerArray.length; i++){
    var diner = dinerArray[i];
    var taxOwed = diner.mealCost * (tax/100);
    diner.taxOwed = taxOwed;
    receipt.total = receipt.total + (diner.mealCost + taxOwed);
  }
  
  receipt.totalTip = (receipt.total * (tip/100));
  this.totalTip = receipt.totalTip;
  this.totalBill = receipt.totalTip + receipt.total;

  for(var i = 0; i < dinerArray.length; i++){
    var diner = dinerArray[i];
    diner.tipOwed = (receipt.totalTip / dinerArray.length);
    diner.totalCost = diner.mealCost + diner.taxOwed + diner.tipOwed;
  }
  
  this.receipt = receipt;
}

///// DINER CONSTRUCTOR FUNCTION /////
var Diner = function(name){
  this.name = name,
  this.dishes = [],
  this.mealCost = 0;
}

///// ADDS DISH TO DINER'S ORDER /////
Diner.prototype.addDish = function(dish){
  if(Menu.hasOwnProperty(dish)){
    this.dishes.push({dish: Menu[dish]})
    this.mealCost = this.mealCost + Menu[dish];
  }else{
    console.log('Sorry, that item is not on the Menu')
  }
}



/////////

/////// CREATES 3 HYPOTHETICAL DINERS //////
var Dan = new Diner('Dan');
var Jim = new Diner('Jim');
var Tom = new Diner('Tom');

////// CREATES 1 HYPOTHETICAL TABLE ///////
var table1 = new Table();

////// ADDS THE DINERS TO TABLE //////
table1.addDiner(Dan);
table1.addDiner(Jim);
table1.addDiner(Tom);

//// EACH DINER ORDERS OFF MENU////
Dan.addDish('lasagna');
Dan.addDish('bread')
Jim.addDish('pizza');
Tom.addDish('gnocchi');

table1.getBill(5, 20);

console.log('RECEIPT', table1.receipt)



