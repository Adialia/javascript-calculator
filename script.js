$(document).ready(function(){
	var inputString = '0';

	// event handlers
	$('.number').on('click', addNumberToExpression);
	$('.operation').on('click', addOperatorToExpression)
	$('#dot').on('click', addDotToExpression);
	$('#clear').on('click', clearOutput);
	$('#evaluate').on('click', evaluateExpression)

	function render(){
		$('p').text(inputString);
	}

	function addNumberToExpression(){
		var number = $(this).text();
		if (inputString === '0'){
			inputString = number;
		}
		else {
			inputString += number;
		}
		render();
	};

	function addOperatorToExpression(){
		var operator = $(this).text();
		var re = /[-\+*\/]/g;
		if (inputString[inputString.length-1] === '.'){
			inputString = inputString.slice(0,-1);
		}
		if (inputString[inputString.length-1].search(re) === -1 ){
			inputString += operator;
		}
		else{
			inputString = inputString.slice(0,-1)+operator;
		};
		render();
	}

	function addDotToExpression(){
		if (inputString[inputString.length-1] !== '.'){
		//find last full number
			var re = /[-\+*\/]/g;
			var lastNumber;
			for (var i = inputString.length-1; i >= 0; i-- ){
				if (inputString[i].search(re) !== -1){
					lastNumber = inputString.slice(i+1,inputString.length);
					i = 0;
				} 
			};
			if (!lastNumber){
				lastNumber = inputString.slice(); 
			}
			if (lastNumber.search(/\./) == -1){
				inputString += '.';	
			}
			render();
		}																																																																																																																																																																																																										
	};

	function clearOutput(){
		inputString = '0';
		render();
	}

	function evaluateExpression(){

	}

	function createTokenArray(string){
		console.log("createTokenArray");
		var array = [];
		var re = /[+-\//*]/g;
		var tokenArray = string.split(re);

		//console.log(tokenArray.length, tokenArray);
		while(tokenArray.length != 0){
			array.push(tokenArray[0]);
			//console.log(array, tokenArray);
			var opIndex = string.indexOf(tokenArray[0])+tokenArray[0].length;
			//console.log(opIndex, string,tokenArray[0] );
			//console.log("opIndex",opIndex, "string", string);
			if (string[opIndex]){
				array.push(string[opIndex]);
			}
			tokenArray.shift();
			console.log("ONE!!!", array);
		}

		console.log("final aray", array);
		return array;
	}

	function infixToPostfix(infix){
		var  prec = {
			"*": 2,
    		"/": 2,
    		"+": 1,
    		"-": 1	
		};
		var postfix = [];
		var opstack = [];
		//var re = /[+-\//*]/g;
		var tokenArray = createTokenArray(infix);

		console.log(infix);
		console.log(tokenArray);
		tokenArray.forEach(function(token){
			if (((token >= '0') && (token <= '9')) || (token == '.')){
				postfix.push(token);
			}
			else if ((token == '*') || (token == '+') || (token == '-') || (token == '/')){
				while ((opstack.length != 0) && (prec[opstack[opstack.length]] >= prec[token])){
					postfix.push(opstack.pop());
				}
				opstack.push(token);
			}
		})

		while (opstack.length != 0){
			postfix.push(opstack.pop());
		}

		console.log(postfix);
		return postfix;
	}

	function evaluatePostfix(postfixArray){
		
	}

	console.log(infixToPostfix("10+5*2"));

});