const express=require("express");
const bodyParser=require("body-parser");

var deli=[{
    latitude: 30, longitude: 100,

   name:"Sannidhi",
    ph:6361348235 
},
{
    latitude: 13, longitude: 90,
    name:"Saiesh",
    ph:6878532375
},
{
    latitude: 120, longitude: 120,
    name:"Anish",
    ph:9945090755
},
{
    latitude: 200, longitude: 200,
    name:"Gauthum",
    ph:6361348235
},
{
    latitude: 250, longitude: 250,
    name:"Shyam",
    ph:9387258725
}
]

const app=express();
app.use(express.static('public'))

app.use(express.urlencoded());

app.use(bodyParser.json());

app.set('view engine' , 'ejs');
app.set('views' , './public/views');

var data = {
    lat:0,
    long:0
}

app.get("/", function (req, res)  {
    res.render('first');
});

app.get("/burger", function(req, res) {
    res.render('index');
 });

app.post("/postLocation", function (req, res)  {
    let user;
   console.log(req.body);
    user=req.body;

    var ulat=user.latitude;
    var ulong=user.longitude;
    var dist=1000000;
    var ind=-1;
    


    for(let i = 0; i<5; i++){
        lat=deli[i].latitude;
        lon=deli[i].longitude;
        var temp=((ulat-lat)*(ulat-lat))+((ulong-lon)*(ulong-lon));
        if(temp<dist){
           dist=temp;
           ind = i;
        }
    }
    let latitude = deli[ind].latitude;
    let longitude = deli[ind].longitude;
    deli[ind].latitude=ulat;
    deli[ind].longitude=ulong;
     
  





console.log("Assigned Delivery Boy->"+deli[ind].name+"  Location--> Latitude: "+latitude+"  Longitude: "+longitude);



res.send({'name': deli[ind].name
 ,        'ph':deli[ind].ph
});


});

app.listen(3000,function(){
    console.log("server started on port 3000");   
});
