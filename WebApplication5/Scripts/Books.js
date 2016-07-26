angular.module('books', [
    'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'
])

     .service('BooksModel', ['$http', '$q', function ($http, $q) {
         var model = this,
             URLS = {
                 FETCH: '/Home/GetBooks'
             },
             books;


         function cacheBooks(result) {
             books = result;
             return books;
         }


         model.getBooks = function () {
             var deferred = $q.defer();

             if (books) {
                 deferred.resolve(books);
             } else {
                 $http.get(URLS.FETCH).then(function (response) {
                     deferred.resolve(cacheBooks(response.data));
                 });
             }
             return deferred.promise;
         };
     }])

.controller('BooksListCtrl', ['$scope', 'BooksModel', function ($scope, BooksModel) {
    $scope.gridOpts = { data: [] };

    BooksModel.getBooks()
          .then(function (books) {
              console.log(books);

              $scope.gridOpts = { data: books };

          });

    $scope.addData = function () {
        $scope.gridOpts.data.push({
            author: "Gambardella, Matthew",
            description:"An in-depth look at creating applications ↵      with XML.",
            genre: "Computer",
            id:"bk101",
            price:            44.95,
            publish_date :"/Date(970351200000)/",
            title:"XML Developer's Guide"
        });
    };
    
    $scope.save = function ($http) {
        $scope.books = $scope.gridOpts.data;
        $http({
            method: 'POST',
            url: '/Home/Save',
            data: $scope.books
        });

        
    };


}]);


   