const firebaseConfig = {
  apiKey: "AIzaSyD3OMCfRawUdBpjJ4W2gaa6OE0q_7UQzVI",
  authDomain: "todo-app-8aa94.firebaseapp.com",
  projectId: "todo-app-8aa94",
  storageBucket: "todo-app-8aa94.appspot.com",
  messagingSenderId: "191476333483",
  appId: "1:191476333483:web:0c79984ab76c86277e70ee",
  measurementId: "G-PDJK0XCQ75"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);




var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function (data) {
  var li = document.createElement("li");
  var liText = document.createTextNode(data.val().value);
  li.appendChild(liText);


  var delBtn = document.createElement("button");
  var delText = document.createTextNode("DELETE");
  delBtn.setAttribute("class", "btn");
  delBtn.setAttribute('id',data.val().key)
  delBtn.setAttribute("onclick", "delItem(this)")
  delBtn.appendChild(delText);


  var editBtn = document.createElement("button");
  var editText = document.createTextNode("EDIT");
  editBtn.setAttribute("class", "btn");
  editBtn.setAttribute('id',data.val().key)
  editBtn.setAttribute("onclick", "editItem(this)");
  editBtn.appendChild(editText);


  li.appendChild(delBtn);
  li.appendChild(editBtn);

  list.appendChild(li);

})

function add() {
  var todo_item = document.getElementById("todo-item");
  var database = firebase.database().ref('todos');
  var key = database.push().key;
  var todo = {
    value: todo_item.value,
    key: key
  }
  database.child(key).set(todo)
  todo_item.value = "";
}


function delItem(e) {
  firebase.database().ref('todos').child(e.id).remove()
  e.parentNode.remove();
}

function editItem(e) {
  console.log(e.id)
  var val = prompt("Edit Your Value ", e.parentNode.firstChild.nodeValue);
  var editTodo = {
    value : val,
    key : e.id
  }
  firebase.database().ref('todos').child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = val;
}

function delAll() {
  list.innerHTML = ""
}


