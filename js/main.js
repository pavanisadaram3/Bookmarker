//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save Bookmark
function saveBookmark(e){
    //Prevent form from submitting
    e.preventDefault();
    
    //Get form values
    var siteName = document.getElementById('siteName').value ;
    var siteUrl = document.getElementById('siteUrl').value ;
     if(!validateForm(siteName,siteUrl)){
         return false;
     }
    

    var bookmark ={
        name: siteName,
        url:siteUrl
    }
     
    /*
    // //Local Storage Test
    // localStorage.setItem('test','Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    */

    //Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
      //init array
      var bookmarks = [];
      //add to array
       bookmarks.push(bookmark);
      //set to LocalStorage
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        //get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to localstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));


    }
}

//Delete bookmark
function deleteBookmark(url){
  //Get bookmarks form localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop throught bookmarks
  for(var i=0; i<bookmarks.length;i++){
      if(bookmarks[i].url == url){
          //remove from array
          bookmarks.splice(i,1);
      }
  }
  //re-set back to localstorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}
//clear form
document.getElementById('myForm').reset();

//re-fetch bookmarks
fetchBookmarks();

//Fetch bookmarks
function fetchBookmarks(){
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';
    for(var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class = "well">'+
                                      '<h3>'+name+
                                      '<a class ="btn btn-default" target ="_blank" href="'+url+'">visit</a>'+
                                      '<a onclick ="deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a>'+
                                      '</h3>'+
                                      '<div>';
    }
    // console.log(bookmarksResults);

    //console.log(bookmarks);
}

//validate form
function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill in the form ');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('please use a valid URL');
        return false;
    }
    return true;
}


