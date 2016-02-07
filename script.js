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

	function infixToPostfix(infix){
		var postfix = '';
		var stack = [];

		for (var i = 0; i < infix.length; i++){
			 if ((infix[i] >= '0') && (infix[i] <= '9')){
			 	postfix += infix[i];
			 };
			 else if ((infix[i] == '*') || (infix[i] == '+') || (infix[i] == '-') || (infix[i] == '/')){
			 	if (stack.length === 0){
			 		stack.push(infix[i]);
			 	}
			 	else {
			 		while (stack.length != 0){

			 		}
			 	}


			 }
		}

		return postfix;
	}

});