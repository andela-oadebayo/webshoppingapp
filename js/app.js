var shopItemInput = document.getElementById("itemInput"),
	addButton = document.getElementsByTagName("button")[0],
	unacquiredItemHolder = document.getElementById("recentItems"),
	acquiredItemHolder = document.getElementById("previousItems");;
 

 //function to create new Item List
 var  createNewItemElement = function(newString){
 	//create a list item

 	var listItem = document.createElement("li");
 	//input(checkbox)
 	var checkBox = document.createElement("input");
	//label
 	var label = document.createElement("label");
	//input(text)
 	var input = document.createElement("input");
 	input.classList.add("save");
	//button.edit
 	var editButton = document.createElement("button");
	//button.delete
 	var deleteButton = document.createElement("button");

	//Modfication of the newly created element
	checkBox.type = "checkbox";
	input.type = "text";

	editButton.innerText = "edit";
	editButton.className = "edit";
	deleteButton.innerText = "delete";
	deleteButton.className = "delete";

	label.innerText = newString;

	//Appending each elements to the parent item
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(input);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}
//End of Function to create new Item List

//Adding a new Shoping Item to our Shoping List
var addShopItem = function(){
	console.log("add new shop item");
	//create a new list item with text from the new task
		var inputs = shopItemInput.value;
		if (inputs == undefined || inputs == ""){
			alert("Pls type a valid item");
		}
		else{
			var listItem = createNewItemElement(inputs);
			unacquiredItemHolder.appendChild(listItem);
			bindItemEvents(listItem, acquiredShopItem);
			shopItemInput.value = "";		
		}

}
//End of adding new Shoping Item to 0ur Shopping list
 


//Edit existing Shopping Item
var editShopItem = function(){
	console.log("edit shopping item");

	var listItem = this.parentNode;
	var editBtn = listItem.getElementsByTagName('button')[0];

	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode");

	//if the  class of the patrent has .editMode
	if(containsClass){
		//swicth from edit .editMode
		//label text become the inputs output
		//change button back to edit
		label.innerText = editInput.value;
		editBtn.innerText = "edit";
	}	
	else {
		//switch to edit mode
		//inputs value becomes the label's text
		//change the edit button to save onclick of edit button
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}
		//toogle .editMode on the parent
		listItem.classList.toggle("editMode");
}


//Delete an Existing Item
var deleteShopItem = function(){
	console.log("delete an item...");

	//remove the parent list item from the ul
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}


//Mark an item as Acquired
var acquiredShopItem = function(){
	console.log("Item acquired...");
	//Append the task list item to the acquired section
	var listItem = this.parentNode;
	acquiredItemHolder.appendChild(listItem); 
	bindItemEvents(listItem, unacquiredShopItem);
}

//Mark an item as unacquired
var unacquiredShopItem = function(){
	console.log("Item not acquired...");
	//Append the task list item to the unacquired section
	var listItem = this.parentNode;
	unacquiredItemHolder.appendChild(listItem);
	bindItemEvents(listItem, acquiredShopItem);
}


var bindItemEvents = function(itemList, checkBoxEventHandler){
	console.log("Bind lits items....");
	//select it's 
	var checkBox = itemList.querySelector("input[type=checkbox]");
	var editButton = itemList.querySelector("button.edit");
	var deleteButton = itemList.querySelector("button.delete");

		//bind editShopItem to edit button
		editButton.onclick = editShopItem;

		//bind deleteShopItem to the delete button
		deleteButton.onclick = deleteShopItem;

		//bind checkBoxEventHandler to checkbox	
		checkBox.onchange = checkBoxEventHandler;
}
	
//Set the click handler to the addShopItem  function
addButton.onclick = addShopItem;

//transverse over unacquiredShopItem ul li items
for(var i = 0; i < unacquiredItemHolder.children.length; i++ ){
	//bind events to list items children(itemAcquired)
	bindItemEvents(unacquiredItemHolder.children[i], acquiredShopItem)
}

//transverse over acquiredShopItem ul li items
for(var i = 0; i < acquiredItemHolder.children.length; i++ ){
	//bind events to list items children(itemUnacquired)
	bindItemEvents(acquiredItemHolder.children[i], unacquiredShopItem);
}


 


