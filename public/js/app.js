var dataset=[];
var weight=[];
var b=[];
// var i,j;
var choose,leng=20,alpha=26;
var lang=['english','mandarin'];
var input_  = document.getElementById("letter");
var result= document.getElementById("result");
let unknown = () =>{
    result.innerHTML=input_.value;
    test_unknown(input_.value);
};
window.onload= () =>{
	choose=prompt("Enter 1 for Training else 0");
	console.log(choose);
}

function Read_data(language,k){
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "../data/"+language+".txt", true);
 	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let raw=this.responseText;
      let data=raw.split("\n");
      for(let j=0;j<data.length;j++){
      	let row=data[j].split(",");
      	dataset.push([row[0].toUpperCase(),k]);

      }
    }
  };
  xhttp.send(); 
}

for(let i=0;i<lang.length;i++){
Read_data(lang[i],i);
}

window.setTimeout(call_after,10000);

function call_after(){
	flowcontrol();
}

var learning=0.2;
var iteration=100000;
function sigmod(z){
	return 1/(1+Math.exp(-1*z));jm
}

function dsigmod_dz(z){
	return sigmod(z)*(1-sigmod(z));
}
function train(){
	for(let i=0;i<lang.length;i++){
		var raw_weight=[];
		for(let j=0;j<leng;j++){
			var lower=[];
			for(let k=0;k<alpha;k++){
				lower.push(Math.random());
			}
			raw_weight.push(lower);
		}
		weight.push(raw_weight);
		b.push(Math.random());
	}
	for(let i=0;i<iteration;i++){
		console.log("I");
		let get=Math.floor((Math.random() * (dataset.length-1)));
		let point=dataset[get];
		let target=new Array(lang.length).fill(0);
		target[point[1]]=1;
		let input_12=[];
		for(let j=0;j<leng;j++){
			input_12.push(new Array(alpha).fill(0));
		}
		// console.log(point);
		for(let j=0;j<point[0].length;j++){
			let k=point[0].charCodeAt(j)-65;
			if(k>=0 && k<alpha){
				input_12[j][k]=1;
			}
		}
		for(let j=0;j<lang.length;j++){
			let z=b[j];
			for(let k=0;k<leng;k++){
				for(let l=0;l<alpha;l++){
					z+=weight[j][k][l]*input_12[k][l];
				}
			}
			// console.log(z);
			let Pred=sigmod(z);
			let error=Math.pow((Pred-target[j]),2);
			let derror_dpred=2*(Pred-target[j]);
			let dPred_dz=dsigmod_dz(z);
			for(let k=0;k<leng;k++){
				for(let l=0;l<alpha;l++){
					let derror_dweight=derror_dpred*dPred_dz*input_12[k][l];
					weight[j][k][l]-=learning*derror_dweight;
				}
			}

			b[j]-=learning*derror_dpred*dPred_dz;
			// console.log(b);
			// console.log(error);
		}
	}
	display();
}


function flowcontrol(){
	console.log("dataset "+dataset.length);
	if(choose==1){
		// result.innerHTML="Training Started";
		console.log("Training Started");
		train();
		// result.innerHTML="Training Ends";
		console.log("Training Ends");
		let correct=test_dataset();
		result.innerHTML="Accurary "+((correct*100)/dataset.length);
		console.log("Accurary "+((correct*100)/dataset.length));
	}
	else{
		let file_name=prompt("Enter file name");
		getCalculated(file_name);
		window.setTimeout(display,5000);
	}
	
}

function getCalculated(file_name){
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "../data/"+file_name+".txt", true);
 	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let raw=this.responseText;
      let data=raw.split("\n");
      let l=0;
      for(let i=0;i<lang.length;i++){
		let raw_weight=[];
		for(let j=0;j<leng;j++){
			var lower=[];
			for(let k=0;k<alpha;k++){
				lower.push(parseFloat(data[l]));
				l++;
			}
			raw_weight.push(lower);
		}
		weight.push(raw_weight);
	  }
	  for(let i=0;i<lang.length;i++){
	  	b[i]=parseFloat(data[l]);
	  	l++;
	  }
    }
  };
  xhttp.send();
}

function display(){
	for(let i=0;i<lang.length;i++){
		console.log(weight[i]);
		console.log(b[i]);
		let correct=test_dataset();
		result.innerHTML="Accurary "+((correct*100)/dataset.length);
		console.log("Accurary "+((correct*100)/dataset.length));
	}
}

function test_dataset(){
	let correct=0;
	for(let i=0;i<dataset.length;i++){
		let get=Math.floor((Math.random() * (dataset.length-1)));
		let point=dataset[get];
		let target=new Array(lang.length).fill(0);
		let output=new Array(lang.length).fill(0);
		target[point[1]]=1;
		let input_12=[];
		for(let j=0;j<leng;j++){
			input_12.push(new Array(alpha).fill(0));
		}
		// console.log(point);
		for(let j=0;j<point[0].length;j++){
			let k=point[0].charCodeAt(j)-65;
			if(k>=0 && k<alpha){
				input_12[j][k]=1;
			}
		}
		for(let j=0;j<lang.length;j++){
			let z=b[j];
			for(let k=0;k<leng;k++){
				for(let l=0;l<alpha;l++){
					z+=weight[j][k][l]*input_12[k][l];
				}
			}
			// console.log(z);
			output[j]=(sigmod(z));
		}
		let max_pred=output[0];
		let pos=0;
		for(let j=0;j<lang.length;j++){
			if(max_pred<output[j]){
				pos=j;
				max_pred=output[j];
			}
		}
		// console.log("pos"+pos);
		if(pos==point[1]){
			correct++;
		}
     }
     return correct;
}

function test_unknown(point){
	point=point.toUpperCase();
	console.log(point);
	let output=new Array(lang.length).fill(0);
	let input_12=[];
	for(let j=0;j<leng;j++){
		input_12.push(new Array(alpha).fill(0));
	}
	// console.log(point);
	for(let j=0;j<point.length;j++){
		let k=point.charCodeAt(j)-65;
		if(k>=0 && k<alpha){
			input_12[j][k]=1;
		}
	}
	console.log(input_12);
	for(let j=0;j<lang.length;j++){
		let z=b[j];
		for(let k=0;k<leng;k++){
			for(let l=0;l<alpha;l++){
				z+=weight[j][k][l]*input_12[k][l];
			}
		}
		// console.log(z);
		output[j]=(sigmod(z));
	}
	let max_pred=output[0];
	let pos=0;
	for(let j=0;j<lang.length;j++){
		if(max_pred<output[j]){
			pos=j;
			max_pred=output[j];
		}
	}
	result.innerHTML=lang[pos].toUpperCase();
	console.log(lang[pos].toUpperCase()+" "+(max_pred*100));
	console.log(output);
}