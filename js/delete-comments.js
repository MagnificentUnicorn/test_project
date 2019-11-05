function mainCommentRemover(){
    let code = editor.getValue();
    let restore_button = document.getElementById('restore-file');
    restore_button.classList.remove('d-none');
    let output = removeComments(code.split(''));
    editor.setValue(output);
    if (editor_state === true){
        let element = document.getElementById('store-container');
        element.value = output;
        editor_state = false;
    }
}

function clearString(string, num1, num2){
    let output = string.substring(0, string.length - (num1 - num2 - 1));
    return output;
}

function identifySymbolType(string){
    let output = false;
    if (string === undefined){ 
        output = true; 
    } 
    else {
        if (string.trim() === '') { 
            output = true; 
        }
    }
    return output;
}

function checkIfStartFromNewline(counter, code_array){
    let check_value = null;
    do {
        check_value = code_array[counter];
        if ( check_value === '\n'){
            break;
        }
    	counter = counter - 1; 
    }  while ( identifySymbolType(check_value) && (counter > 0));
    return { symbol: check_value, number: counter};
}

function removeComments(code_array) {
    let output = String();

    let stringChar = null;
    let blockComment = {newline: false, value: false};
    let inlineComment = {newline: false, value: false};
    let inRegex = false;

    let check_object = null;
    
    for (let i = 0; i < code_array.length; i++) {
        let removeLine = false;
        if (!stringChar && !inRegex && !blockComment.value && !inlineComment.value) {
          switch (code_array[i]) {
            case '"':
            case "'":
              stringChar = code_array[i];
              break;
            case '/':
              let newline = null;
              switch (code_array[i + 1]){
                case '*': 
                	blockComment.value = true;
    				check_object = checkIfStartFromNewline(i - 1, code_array);
                    blockComment.newline = identifySymbolType(check_object.symbol);
                    if (blockComment.newline){ output = clearString(output, i, check_object.number); }
                  break;
                case '/':
				    inlineComment.value = true;
    				check_object = checkIfStartFromNewline(i - 1, code_array);
                    inlineComment.newline = identifySymbolType(check_object.symbol);
                    if (inlineComment.newline){ output = clearString(output, i, check_object.number); }
                   break;
                default: 
                  inRegex = true;
                  break;
              }
            }
        }
        else {
            if (stringChar && ( (code_array[i] === stringChar && code_array[i - 1] != '\\') || (code_array[i] === '\n') ) ) {
                stringChar = null;
            }
            if (inRegex && ( (code_array[i + 1] === '/' && code_array[i] !== '\\') || code_array[i + 1] === '\n') ) {
                inRegex = false;
            }
            if (blockComment.value ) {
            	if (code_array[i] === '/' && code_array[i - 1] === '*') {
                    do { i = i + 1; } 
                    while ((code_array[i] !== '\n') && ( i < code_array.length));
                    if ( blockComment.newline ) { removeLine = true; }
            		blockComment.value = false;
            		blockComment.newline = false;
            	}
            }
            if (inlineComment.value) {
            	if ( code_array[i] === '\n'){
                    if ( inlineComment.newline ) { removeLine = true; }
            		inlineComment.value = false;
            		inlineComment.newline = false;
            	}
            }
        }
        if (!blockComment.value && !inlineComment.value && !removeLine) {
            output += code_array[i];
        }
    }
    return output;
}