var Apptable=angular.module('Apptable',['crimeTableModule','FilterModule','IntegerModule','SortingRecordsModule','paginationModule','ValidatedFormModule']);

Apptable.controller('mainCtrl',function mainCtrl($scope,$http,orderByFilter){
  $scope.resetValue='';
  $scope.pageSize=4,
  $scope.total_pages=0;
  // $scope.pages=[];
  var pageIndex=1;
  var end=(pageIndex*$scope.pageSize);
  var start=0;


// =========== Code To Fetch Data From JSON File =============

  $http.get('crime.json').then(function(response){
    $scope.crimes=response.data;
    $scope.crimes=orderByFilter($scope.crimes, '+year');
    $scope.crimesCopy=$scope.crimes;
    $scope.Updatedcrimes=$scope.crimes;
    total_pages = Math.ceil($scope.crimes.length / $scope.pageSize);
// console.log(total_pages);
// console.log($scope.pageSize);
    // $scope.restcrimes=$scope.crimes;
    // $scope.template="<input type='text'>"
    $scope.paging(pageIndex);
  });


// =============== Code For Dynamic Paging =================

$scope.paging=function(pindex){
  pageNo=pindex;
$scope.pages=[];
// console.log($scope.pages);
  total_pages = Math.ceil($scope.crimes.length / $scope.pageSize);
  if((pindex*$scope.pageSize)>$scope.crimes.length){
    end=$scope.crimes.length;
    start=(((pindex-1)*$scope.pageSize));
  }
  else{
     end=(pindex*$scope.pageSize);
     start=(end-$scope.pageSize);
  }

for(var i=1;i<=total_pages;i++){
$scope.pages.push(i);
}
    $scope.crimes=orderByFilter($scope.crimes, '+year');
    $scope.restcrimes=$scope.crimes.slice(start,end);
    // console.log($scope.crimes.length);
    // console.log($scope.restcrimes.length);
    // console.log(pindex);
    // console.log($scope.restcrimes.length);
    // console.log($scope.restcrimes);
    // console.log(start);
    // console.log(end);
    // console.log($scope.pages);
    // console.log(total_pages);
    // console.log($scope.crimes)
    // console.log("inside paging");
    // console.log(typeof $scope.crimes[0].year);
  }


// ======= Adding New Record into Table Code ===========

$scope.AddData=function(){

$scope.obj={};
$scope.obj.year=$scope.add_year.toString();
$scope.obj.under=$scope.add_under.toString();
$scope.obj.over=$scope.add_over.toString();
$scope.crimes.push($scope.obj);
$scope.crimesCopy=$scope.crimes;
// console.log("Add Data Function Called");
// console.log($scope.obj);
// console.log($scope.crimes);
// console.log(typeof $scope.obj.year);
$scope.paging(pageIndex);
}


// ===============Reset Code=================

$scope.reset=function(){
  $scope.add_year=$scope.resetValue;
  $scope.add_over=$scope.resetValue;
  $scope.add_under=$scope.resetValue;
}

// ============= Previous Page Code===========

$scope.prev=function(){
  pageNo=(pageNo-1);
  if(pageNo>0){

    $scope.paging(pageNo);
  }
  else{
    $scope.paging(total_pages);
  }
};


// ================ Next Page Code ================

$scope.next=function(){
pageNo=(pageNo+1);
if(pageNo<=total_pages){

  $scope.paging(pageNo);
}
else{
  $scope.paging(pageIndex);
}
};


// ==========Delete Records From Table Code===============

$scope.DeleteData=function (value){
  // console.log(value.$$hashKey.split(":")[1]);
  for(var k=0;k<$scope.crimes.length;k++){
    if($scope.crimes[k].year==value){
      for(var j=k;j<(($scope.crimes.length)-1);j++){
        $scope.crimes[j].year=$scope.crimes[j+1].year;
        $scope.crimes[j].under=$scope.crimes[j+1].under;
        $scope.crimes[j].over=$scope.crimes[j+1].over;
      }
      $scope.crimes.pop();
      $scope.crimesCopy=$scope.crimes;
      break;
    }
  }
  $scope.paging(pageNo);
}


// ========== Sorting Increasing And Decreasing Code =========

// $scope.propertyName = 'year';
 $scope.reverse = false;

 $scope.sortBy = function(propertyName) {
   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
     $scope.crimes.reverse();
   $scope.propertyName = propertyName;
  //  $scope.restcrimes=$scope.crimes.slice(start,end);
  //  $scope.reversepaging(pageIndex);
 };


// ========= To Filter Data which Include Input Value and Above Values========

$scope.propertyValue='year';

$scope.Above=function(){
  ind=undefined;
  $scope.crimes=$scope.crimesCopy;

  // console.log($scope.propertyValue);

if($scope.apply_constraint!=undefined && $scope.apply_constraint!='' && $scope.propertyValue!=undefined){

  // console.log($scope.apply_constraint+' inside if caluse');
  // console.log($scope.crimes);

  if($scope.propertyValue=='year'){
    for(var v=0;v<$scope.crimes.length;v++){
      // console.log($scope.crimes[v][$scope.propertyValue]);
      if($scope.crimes[v][$scope.propertyValue]>=$scope.apply_constraint){
        ind=v;
        break;
      }
    }

  }

else if($scope.propertyValue=='over' || $scope.propertyValue=='under'){

  $scope.crimes=orderByFilter($scope.crimes, $scope.propertyValue);
  // console.log($scope.crimes);
  for(var v=0;v<$scope.crimes.length;v++){
    // console.log($scope.crimes[v][$scope.propertyValue]);

    if($scope.crimes[v][$scope.propertyValue]>=$scope.apply_constraint){
      ind=v;
      break;
    }
  }
}



// console.log(ind);
$scope.filteredCrimes=[];
  for(var n=ind;n<$scope.crimes.length;n++){
    // console.log($scope.filteredCrimes);

    $scope.filteredCrimes.push($scope.crimes[n]);
  }
  $scope.crimes=$scope.filteredCrimes;
  // console.log($scope.filteredCrimes);
  // console.log($scope.crimes);
  $scope.paging(pageIndex);
}

else {
  // console.log('Empty inside else');
  $scope.crimes=$scope.Updatedcrimes;
  $scope.paging(pageIndex);
}
};

});
