/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


/* 1. Import util.js in this file*/
/* 2. You have to export this class as default*/

class Security{

  constructor({Name}){            
    this.Name=Name;
    /* 3. Create a constructor with values Name,Price,Quantity,Sector,FNOAvaialble*/
  }
  
  showLivePrice(){
    let randomLogic=Math.ceil(Math.random()*100,1)%2;
    let livePrice=0;
    if(randomLogic){
      livePrice=Utility.RoundOff(Number(this.Price)+Math.random(),2);
    }else{
      livePrice=Utility.RoundOff(Number(this.Price)-Math.random(),2);
    }
    return; /* 4. Use ternary operator, if price is less than live price, then show live price with arrow up else show live price with arrow down*/
  }         
}
