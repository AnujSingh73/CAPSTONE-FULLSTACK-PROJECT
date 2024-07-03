

import Utility from './Utilities/util.js';


import Do from './Midlayer/midlayer.js';

const Title ='Portfolio Management - ES6 Demo';
const Description='This Demo illustrates ES6 features.'; 

Utility.SetElementValue('lblTitle',Title);
Utility.SetElementValue('lblTitleDescription',Description);



setInterval(()=>Do.DisplaySecurities(), 1000);


Do.DisplayRecommendations();


Do.setAvailableBalance();


const SecurityForm=Utility.GetElementById('frmsecurity');

Utility.bind('btnSubmitSecurity','click',(e)=>{///* 1. Which method from utiltity will replace bind method here and will help you to bind click event to btnSubmitSecurity */
  e.preventDefault();                                                         
  let newSecurity=Utility.FetchFormValues(SecurityForm);
  
  Do.AddSecurity(newSecurity)
    .then(successMessage=>
    {
      console.log(successMessage);
      Utility.ResetFormValues(SecurityForm);
    })                                                                                                                    
    .catch(errorMessage=>alert(errorMessage));                                                           
});

Do.setAvailableSecuritiesForBuyOrSell();

Do.enableFormResetWhenRequired(SecurityForm);

Do.setTransactionUtility();
 


 





