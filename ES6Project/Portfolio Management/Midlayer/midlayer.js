/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


import {ClassifiedSecurities as SecurityData, RecomendedSecurities } from '../Data/MockData.js';
import Utility from '../Utilities/util.js';
import Security from '../Entities/Security.js';


const PassRecommendationToForm=(/* 1. Pass Name and Sector as destructured parameters */)=>{
  const formControlName=Utility.GetElementById('Name');
  const formControlSector=Utility.GetElementById('Sector');

  formControlName.value=Name;
  formControlSector.value=Sector;
};

const ShowRecommendedSecurityDetails=(recommendedScrip)=>{

  let premiumContent=Reflect.ownKeys(recommendedScrip).filter(i=>typeof i=='symbol')[0];
  let recommendationDetailsHtml=`<div class="card">
           <div class="card-header">
               News about
           </div>
           <div class="card-body">
               <h5 class="card-title">$/* 2. Write code here to show the name of the recommended script */</h5>
               <p class="card-text">${recommendedScrip[premiumContent]}</p>
               <a class="btn btn-success" id="btnAddReco">Select Security</a>                                        
           </div>
           </div>`;

  let detailsControl= Utility.GetElementById('divSecurityDetails'); 
  detailsControl.innerHTML= recommendationDetailsHtml;  

  Utility.AddEventListener('btnAddReco',3/* 3. Put the appropriate button event */,PassRecommendationToForm.bind(this,recommendedScrip));
};

const GetTop=([first,,,,...remaining])=>{

  return [first,...remaining];
};


const setAvailableBalance=(quote=0,amount='/* 4. Set the default amount as 26000 */')=>{
  const balance=Utility.GetElementById('balanceDisplay');
  if(quote==0){
    balance.innerText=amount;       
  }else{
    let previousBalance=Number(balance.innerText);
    let UpcomingBalance=previousBalance-quote;
    if(UpcomingBalance>0){
      balance.innerText=Utility.RoundOff(UpcomingBalance,2);
      return true;
    }else{
      return false;
    }

  }

};



const ValidateSecurity=(securityToBeAdded)=>{

  let IsValid=false;
  let ValidationMessage='Valid';

  /* 5. Extract Name,Price,Quantity as securityToBeAdded as destructured values */


  if(Name=='NA' || Price=='NA'||Quantity=='NA'){

    ValidationMessage='Name,Price or Quantity cannot be empty';
    return {IsValid,ValidationMessage};
  }else if(SecurityData.map(i=>i.Name==securityToBeAdded.Name).length>0){/* 6. Find the appropriate array method to replace map to make this work*/

    ValidationMessage='Security already exists';
    return {IsValid,ValidationMessage};
  }
  else if(!setAvailableBalance(Number(securityToBeAdded.Quantity)*Number(securityToBeAdded.Price))){

    ValidationMessage='You are running low on balance';
    return {IsValid,ValidationMessage};
  }else{
    IsValid=true;
    return {IsValid,ValidationMessage};
  }
};

class Do{

  static DisplaySecurities()
  {


    let SecuritiesTableControl= Utility.GetElementById('tblSecurities');

    let thead=`
                     <thead class="thead-dark">
                               <tr>`+
                                      Object.keys(SecurityData[0])
                                        .filter/* 7. Identity the appropriate array function which replaces filter method and which works on another array by working on the keys */(i=>`<th scope="col">${i}</th>`)
                                        .join('') +                         
                              ` </tr>
                     </thead>               
                     `;


    let tbody=`
                     <tbody>`+
                    SecurityData.map(i=>`
                                             <tr>   
                                             /* 8. Identify the operator which will display Name,Price,Quantity and FNOAvailable */                                                                   
                                                 <td>{i.Name} (${i.showLivePrice()})</td>
                                                 <td>{i.Price}</td>
                                                 <td>{i.Quantity}</td>                                                                                                                <td>${i.Sector}</td>
                                                 <td>{i.FNOAvailable}</td>                                          
                                                 </tr>
                                          `)
                      .join('') +                                               
                                         '</tbody>';
    // construct the final table                           
    // SecuritiesTableControl.innerHTML=/* 9. Set this equals to thead and tbody which you are generating above */;


  }







  static DisplayRecommendations(){

    let RecommendedSecuritiesListControl= Utility.GetElementById('ulrecommendations');


    let lisRecommendations= GetTop(RecomendedSecurities).map(i=>`
             <li class="list-group-item d-flex justify-content-between align-items-center">
                 ${i.Name}
                 <span class="badge badge-primary badge-pill badgereco" id="${i.ID}">view</span>
             </li>
        `).join('');
    RecommendedSecuritiesListControl.innerHTML=lisRecommendations;

    let allSpans=Utility.GetElementByClassName('badgereco');
    [...allSpans].forEach(i=>{
      Utility.AddEventListener(i.id,'click',ShowRecommendedSecurityDetails.bind(this,RecomendedSecurities[i.id]));
    });

  }




  static AddSecurity(securityToBeAdded){
    return new Promise((resolve,reject)=>{

      setTimeout(()=>{

        const ValidationData=ValidateSecurity(securityToBeAdded);
        if(ValidationData.IsValid)
        {
          console.log('Adding your security...');
          SecurityData.push(new Security(securityToBeAdded));

          this.DisplaySecurities();

          this.setAvailableSecuritiesForBuyOrSell();
          resolve('Security added sucessfully');    
        }else{
          reject(ValidationData.ValidationMessage);
        }  

      },3000);
    });     
  }

  static enableFormResetWhenRequired(SecurityForm){
    Utility.AddEventListener('btnResetSecurity','click',(e)=>{
      e.preventDefault();    
      Utility.ResetFormValues(SecurityForm);                                                     
    });  
  }

  static setAvailableBalance(){

    setAvailableBalance();
  }

  static buyOrSellSecurity(txType){
    const secIndex= Number(Utility.GetElementById('AvailableSecurities').value);
    let availableQty=Number(SecurityData[secIndex].Quantity);
    let qtyToBuyOrSell=Number(Utility.GetElementById('txQuantity').value);
    let livePrice=Number(SecurityData[secIndex].showLivePrice().split('▲')[0]);

    let newQty=0;
    let margin=qtyToBuyOrSell*livePrice;
    let balanceOk=false;

    if(txType=='sell'){
      if(qtyToBuyOrSell<=availableQty){
        newQty=availableQty-qtyToBuyOrSell;
        balanceOk=setAvailableBalance(-margin);
      }
    }else{

      newQty=availableQty+qtyToBuyOrSell;
      balanceOk=setAvailableBalance(margin);
    }
    if(balanceOk){
      SecurityData[secIndex].Quantity=newQty;
      this.DisplaySecurities();
    }else{
      alert('Illegal transaction');
    }

  }

  static setAvailableSecuritiesForBuyOrSell(){
    const secDpDn=Utility.GetElementById('AvailableSecurities');
    if(secDpDn){
      const secDpdnHtml= [...SecurityData].map((sec,index)=>`<option value="${index}">${sec.Name}</option>`);
      secDpDn.innerHTML=secDpdnHtml;
    }

  }

  static setTransactionUtility(){
    Utility.ToggleVisibility('jmbTransact'); 
    Utility.AddEventListener('txSec','click',(e)=>{
      Utility.ToggleVisibility('jmbTransact');                                           
      e.preventDefault();
    });


    Utility.AddEventListener('txBuy','click',(e)=>{this.buyOrSellSecurity('buy'),e.preventDefault();});
    Utility.AddEventListener('txSell','click',(e)=>{this.buyOrSellSecurity('sell'),e.preventDefault();});
  }

}

export default Do;