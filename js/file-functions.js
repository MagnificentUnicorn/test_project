function loadFileAsText(input){
  let restore_button = document.getElementById('restore-file');
  restore_button.classList.add('d-none');
  let  reader = new FileReader();
  reader.onload = function(e) {
    editor.setValue(e.target.result);
    let element = document.getElementById('store-container');
    element.innerHTML = e.target.result;
  }
  reader.readAsText(input.files[0]);
  input.value = String();
}

function returnInitialCode(){
	let storage = document.getElementById('store-container');
	editor.setValue(storage.value);
  let restore_button = document.getElementById('restore-file');
  restore_button.classList.add('d-none');
}