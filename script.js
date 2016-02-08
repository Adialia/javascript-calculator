$(document).ready(function(){
	var inputString = '0';
	var $output = $('p'); 

	// bind event handlers
	$('.number').on('click', addNumberToExpression);
	$('.operation').on('click', addOperatorToExpression)
	$('#dot').on('click', addDotToExpression);
	$('#clear').on('click', clearOutput);
	$('#evaluate').on('click', evaluateExpression)

	//event handlers

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
		if (isOperation(inputString[inputString.length-1])){
			inputString = inputString.slice(-1);
		};
		var array = infixToPostfixArray(inputString);
		//console.log(array);
		var res = evaluatePostfix(array);
		//console.log(res);
		inputString = res.toString();
		render();
	}


	// helper functions
	function render(){
		$output.text(inputString);
	}

	function stringToInfixArray(input){
		var string = input.slice();
		var array = [];
		var re = /[+\-\/\*]/g;
		var tokenArray = string.split(re);

		while(tokenArray.length != 0){
			array.push(tokenArray[0]);
			string = string.slice(tokenArray[0].length);
			if (string[0]){
				array.push(string[0]);
				string = string.slice(1);
			}
			tokenArray.shift();
		}
		return array;
	};

	function infixToPostfixArray(infix) {				
		var  prec = {
			"*": 2,
    		"/": 2,
    		"+": 1,
    		"-": 1	
		};
		var postfix = [];
		var opstack = [];
		var tokenArray = stringToInfixArray(infix);

		tokenArray.forEach(function(token){
			if (isOperation(token)){
				while ((opstack.length != 0) && (prec[opstack[opstack.length-1]] >= prec[token])){
					postfix.push(opstack.pop());
				}
				opstack.push(token);
			}
			else
			{	
				postfix.push(token);
			}
		});

		while (opstack.length != 0){
			postfix.push(opstack.pop());
		};

		console.log(postfix);
		return postfix;
	}

	function evaluatePostfix(postfixArray){
		var operandStack = [];

		postfixArray.forEach(function(token){
			if (isOperation(token)){
				var operand2 = operandStack.pop();
            	var operand1 = operandStack.pop();
            	var result = applyOperation(token,operand1,operand2);
            	operandStack.unshift(result);
			}
			else{
				operandStack.push(parseFloat(token));
			}
		});
		return operandStack.pop();
	};

	function applyOperation(op,op1,op2){
		if (op === "*"){
			return op1 * op2;
		}
		else if (op === "/"){
			return op1 / op2;
		}
		else if (op === "+"){
			return op1 + op2;
		}
		else if (op === "-"){
			return op1 - op2;
		}
	};

	function isOperation(string){
		return ((string == '*') || (string == '+') || (string == '-') || (string == '/'))
	};

});