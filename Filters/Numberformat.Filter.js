angular.module('FilterModule',[])
.filter('NumSupScrpt',function(){
  return function(x){
    if (x==1){
      return 1+"st";
    }
    else if(x==2){
      return 2+"nd";
    }
    else if(x==3){
      return 3+"rd";
    }
    else {
      return x +"th";
    }
  }
});
