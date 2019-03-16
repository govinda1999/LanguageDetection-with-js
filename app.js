var fs = require("fs");
var dataset=[];
var weight=[];
var i,j;
var choose,leng=20;
var lang=['english','mandarin','random'];
// var input_  = document.getElementById("letter");
// var result= document.getElementById("result");
var unknown = () =>{
    //result.innerHTML=input_.value;
    // document.write(result.value);
};

window.onload= () =>{
	choose=prompt("Enter 1 for Training else 0");
	console.log(choose);
}

function Read_data(){
	
    for(i=0;i<lang.length;i++){
	let file=fs.readFile("../data/"+lang[i]+".txt",(data,err)=>{
		if (err)
			console.log(err);

		else
		{
			console.log(data);
			dataset.push(data);
		}
	});	
	}
	console.log(dataset);
}

Read_data();
