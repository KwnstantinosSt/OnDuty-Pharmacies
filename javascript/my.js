
function date(){
    var d = new Date();
    var n = d.toDateString();
    $("#date")[0].innerText = n;
       
}


function createDiv(){
    var div = document.createElement("div");
    div.setAttribute("id","Shadowdivs");
    div.setAttribute("class","container p-3 my-3 bg-dark text-white text-center");
    document.body.insertBefore(div,document.body.childNodes[6]);
    var h1 = document.createElement("h1");
    var b = document.createElement("b");
    var i = document.createElement("i");
    i.setAttribute("id","pharName");
    var br = document.createElement("br");
    h1.appendChild(b);
    b.appendChild(i);
    div.appendChild(h1);
    div.appendChild(br);
    var p1 = document.createElement("p");
    p1.setAttribute("id","phone");
    var p2 = document.createElement("p");
    p2.setAttribute("id","address");
    var p3 = document.createElement("p");
    p3.setAttribute("id","orario");
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
}

function createSpace(){
    var div = document.createElement("div");
    div.setAttribute("class","container");
    div.setAttribute("id","kena");
    document.body.insertBefore(div,document.body.childNodes[9]);
    var hr = document.createElement("hr");
    div.appendChild(hr);

}


function fillData(data){
    var i;
    counter=0;

    for(i=0;i<data.data.length;i++){
        createDiv();
        createSpace();
    }


    for(i=0;i<$("div[id=Shadowdivs]").length;i++){
        if(counter == data.data.length){break;}
    $("div[id=Shadowdivs]")[i].children[0].innerText = data.data[counter].title;
    $("div[id=Shadowdivs]")[i].children[2].innerText = data.data[counter].phone;
    $("div[id=Shadowdivs]")[i].children[3].innerText = data.data[counter].address;
    $("div[id=Shadowdivs]")[i].children[4].innerText = data.data[counter].orario;
    counter++;
 }

 CheckOpenNowPharmacy();


}



function CheckOpenNowPharmacy(){
   //console.log($("div[id=Shadowdivs]").length);

   for(var i=0;i<$("div[id=Shadowdivs]").length;i++){

    var openNow = $("div[id=Shadowdivs]")[i].children[4].textContent;
    var check = /ΑΝΟΙΧΤΟ ΤΩΡΑ/.test(openNow);
    if(check){
        $("div[id=Shadowdivs]")[i].children[4].style.color = "yellow";
        
        }

   }


}



function selPharm(){
    $("#perioxi")[0].innerText = $("#selected").find(":selected").text();
    var reg = $("#selected").val();
    clearSite();

    $.ajax({
        url: "api/read.php",
        data: {"region": reg},
        success:fillData
      });

}


function clearSite(){

    for(var i=0;i<$("div[id=Shadowdivs]").length;i++){
        $("div[id=Shadowdivs]").remove();
        $("div[id=kena]").remove();
    }

}