$(document).ready(function () {
    var imgbook = $("#imgbook");
    var descbook = $("#descbook");
    var titledoc = $("#titledoc");
    var getdesc, getimg;
    if (descbook) {
        var searchbook = "https://www.googleapis.com/books/v1/volumes?q=" + titledoc.text();
        $.getJSON(searchbook, function () {
            console.log("success");
        })
        .done(function (data) {
            console.log (data.items);
            var i=0;
            while (i<data.items.length){
                if (data.items[i].volumeInfo.imageLinks!=undefined){
                    if(data.items[i].volumeInfo.imageLinks.thumbnail!=undefined){
                        var getimg = data.items[i].volumeInfo.imageLinks.thumbnail;
                        i=data.items.length;
                    }
                }
                i++;
            }
            console.log(getimg);
            
            var i=0;
            while (i<data.items.length){
                if (data.items[i].volumeInfo.description!=undefined){
                    var getdesc = data.items[i].volumeInfo.description;
                    i=data.items.length;
                }
                i++;
            }
            console.log(getdesc);
            imgbook.attr("src",getimg);
            descbook.text(getdesc);
        })
    }
});
