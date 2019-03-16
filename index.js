const fs=require('fs');
var data=require('./public/data/eng.json');
const express = require('express');
const app= express();
const port=3000;
app.use(express.static('./public'));
// app.use(express.static('./'));
app.use(express.static('./public/js'));

app.set('views','./public');
app.set('view engine','twig');


app.get('/',(req,res)=>{
    
    res.render('index',{});
});

app.get('/search', function (req, res) {
  res.json(data);
});
var dataset=[];
var weight=[];
var i,j;
var choose,leng=20;
var lang=['english','mandarin','random'];
// var input_  = document.getElementById("letter");
// var result= document.getElementById("result");
// var unknown = () =>{
//     // result.innerHTML=input_.value;
//     // document.write(result.value);
// };

// window.onload= () =>{
// 	choose=prompt("Enter 1 for Training else 0");
// 	console.log(choose);
// }

// function Read_data(){
	
//     for(i=0;i<lang.length;i++){
// 	let file=fs.readFileSync("./public/data/"+lang[i]+".txt",'utf-8')
// 	// ,(data,err)=>{
// 	// 	if (err)
// 	// 		console.log(err);

// 	// 	else
// 	// 	{
// 	// 		console.log(data.toString());
// 	// 		dataset.push(data);
// 	// 	}
// 	dataset.push(file.toString());
// 	// });	
// 	}
// 	// choose=prompt("Enter 1 for Training else 0");
// 	console.log(dataset);
// }

// Read_data();
app.listen(port,()=> console.log('Connected to port 3000'));

// module.export={
// 	"dataset":dataset
// };