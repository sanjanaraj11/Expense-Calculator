var app = angular.module("expApp", []);
app.controller("expCtrl",['$scope', '$http', function($scope,$http) {
    // $scope.xbutton = true;
    // $scope.digitsOnly = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    $scope.items = [];
    $scope.total = 0.00000;

    $http.get('/api/showexp/')
        .then(function(response){
            var len = response.data.length;
            
            for (var i=0;i<len;i++) { 
                var name = response.data[i].desc;
                var amount = response.data[i].amt;
                $scope.total += response.data[i].amt;
                $scope.items.push({desc: name, amt: amount, xbutton: true});                
             };
        });

    $scope.insertNew = function() {
        $scope.items.push({desc: $scope.newDesc.toLowerCase(), amt: $scope.newAmt, xbutton: true});
        $scope.total += $scope.newAmt;

        var expense = {};
        expense.exp_name = $scope.newDesc.toUpperCase();
        expense.exp_amt = $scope.newAmt;
        $http.post('/api/insertexp/',data=expense,headers={"Content-Type":"application/json"}).
        then(function(response) {
            // alert('Added Expense - ' + JSON.stringify(expense)); 
         }, function(response) {
            console.log(JSON.stringify(expense));
        alert("Oops!!!! an error occurred while adding your expense.");
      });       
    };
    $scope.newDesc="";
    $scope.newAmt="";

    $scope.delItem = function(key,x) {  
        x.xbutton = false;
        $scope.total -= x.amt;
        var oldlist = $scope.items
        $scope.items = []
        angular.forEach(oldlist,function(x){
            if(x.xbutton) $scope.items.push(x);
        });

        var expense = {};
        expense.exp_name = x.desc;
        expense.exp_amt = x.amt;
        $http.post('/api/delexp/',data=expense,headers={"Content-Type":"application/json"}).
        then(function(response) {
            // alert('Added Expense - ' + JSON.stringify(expense)); 
         }, function(response) {                
            console.log(JSON.stringify(expense));
        alert("Oops!!!! an error occurred while deleting your expense.");
      });
    };

    // $scope.showItems = function() {
        
    // };


}]);