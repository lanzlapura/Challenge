import { db } from './firebase.js';
import { getFirestore, collection, addDoc,writeBatch, doc, getDoc, onSnapshot,getDocs, deleteDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const form = document.getElementById("get");

form.addEventListener("submit", addItem);

function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("toDoInput");

    if (text.value.trim() !== "") {
        addDoc(collection(db, "todo-list"), {
            text: text.value,
            status: "active"
        })
            .then(() => {
                text.value = "";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

function getItems() {
    const colRef = collection(db, "todo-list");

    return getDocs(colRef)
        .then((snapshot) => {
            let items = [];
            snapshot.docs.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id });
            });
            return items;
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}

function setupRealtimeListener() {
    const colRef = collection(db, "todo-list");

    onSnapshot(colRef, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        generateItems(items);
    });
}

getItems().then((items) => {
    console.log(items);
    generateItems(items);
});

setupRealtimeListener();

function generateItems(items) {
    let itemsHTML = "";
    let activeItemCount = 0;
    
    items.forEach((item) => {
        if (item.status === "active") {
            activeItemCount++;
        }
      itemsHTML += `
        <div class="toDoItem">
          <div class="check">
            <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked":""}">
              <img src="./pictures/check.png">
            </div>
          </div>
          <div class="toDoText ${item.status == "completed" ? "checked":""}">
            ${item.text}
          </div>
        </div> 
      `;
    });
    document.querySelector(".toDoItems").innerHTML = itemsHTML;
    document.getElementById("itemsLeftCounter").textContent = `${activeItemCount} item${activeItemCount !== 1 ? 's' : ''} left`;

    createEventListener();
    
}

function createEventListener() {
    let toDoCheckMarks = document.querySelectorAll(".toDoItem .check-mark");
    toDoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            markedCompleted(checkMark.dataset.id);
        });
    });
}



function markedCompleted(id) {
    const docRef = doc(db, "todo-list", id);

    getDoc(docRef)
        .then((doc) => {
            if (doc.exists()) {
                let status = doc.data().status;

                if (status === "active") {
                    return updateDoc(docRef, {
                        status: "completed"
                    });
                } else if (status === "completed") {
                    return updateDoc(docRef, {
                        status: "active"
                    });
                }
            }
        });
}

document.getElementById("filterAll").addEventListener("click", function () {
    getItems().then((items) => {
        generateItems(items);
    });
});

document.getElementById("filterActive").addEventListener("click", function () {
    getItemsByStatus("active");
});

document.getElementById("filterCompleted").addEventListener("click", function () {
    getItemsByStatus("completed");
});

function getItemsByStatus(status) {
    const colRef = collection(db, "todo-list");

    return getDocs(colRef)
        .then((snapshot) => {
            let items = [];
            snapshot.docs.forEach((doc) => {
                const data = { ...doc.data(), id: doc.id };

                if (data.status === status) {
                    items.push(data);
                }
            });
            generateItems(items);
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}

