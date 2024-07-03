/* eslint-disable no-unused-vars */


class Utility{
 
  static SetElementValue(elementID,elementValue){
    const control=document.getElementById(elementID);
    control.innerHTML=elementValue;
  }

  static GetElementById(elementID){
    return document.getElementById(elementID);
  }

  static GetElementValue(elementID){
    const control=document.getElementById(elementID);
    return control.innerHTML;
  }

  static GetElementByTagName(tagName){
    return document.getElementsByTagName(tagName);
        
  }

  static ToggleVisibility(elementID){
    var x = document.getElementById(elementID);
          
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }     
  }

  static ShuffleArray(array) {
    console.log(array);
    var currentIndex = array.length, temporaryValue, randomIndex;

    
    while (0 !== currentIndex) {

      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static GetElementByClassName(className){
    return document.getElementsByClassName(className);
        
  }

  static AddEventListener(elementID,eventType,fnCallback){
    const control=document.getElementById(elementID);
  /* 1. Use the correct function which will bind up the event and the function callback to control variable above created */
  }


  static RoundOff(number, precision) {
    var shift = function (number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }  
      var numArray = ('' + number).split('e');
      return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  static FetchFormValues(form){
  
    const formElements=[...form.elements].filter(/* 2. Use filter condition where element type is not submit */);                                        
    const formDataObject={};
  
    formElements.forEach(i=>{
      formDataObject[i.id]=i.value?i.value:(i.checked?'Yes':'NA');
    });
   
    return formDataObject;
  }

  static ResetFormValues(form){
    
    const formElements=[...form.elements].filter(i=>i.type!=='submit');                                        
      
    
    formElements.forEach(i=>{
      i.value=null;
    });
       
  }
}


export default Utility;


