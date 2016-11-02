// Testing storage methods
const commentItem = "comment";
const commentDataBase = "commentDataBase";
const commentTable = "comment";

document.getElementById("save").addEventListener("click", function() {
  let receivedComment = document.getElementById("comment").value;

  // Testing localStorage
  localStorage.setItem(commentItem, receivedComment);
  console.log("Comment localStorage: " + localStorage[commentItem]);

  // Testing indexedDB
  // Open or create DB
  let indexedDB = window.indexedDB;
  let open = indexedDB.open(commentDataBase);

  // Create the schema
  open.onupgradeneeded = function() {
    let db = open.result;
    let store = db.createObjectStore(commentTable, {keyPath: "id"});
    let index = store.createIndex("commentIndex", "comment");
  };

  open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction(commentTable, "readwrite");
      let store = tx.objectStore(commentTable);
      let index = store.index("commentIndex");

      // Add some data
      store.put({id: 1, comment: receivedComment});

      // Query the data
      let getComment = store.get(1);
      getComment.onsuccess = function() {
        console.log("Comment IndexedDB: " + getComment.result.comment);
      };

      // Close the db when the transaction is done
      tx.oncomplete = function() {
          db.close();
      };
  }
});

document.getElementById("clear").addEventListener("click", function() {
  // localStorage
  localStorage.removeItem(commentItem);
  console.log("Comment localStorage: " + localStorage[commentItem]);

  // indexedDB
  // Open or create DB
  let indexedDB = window.indexedDB;
  let open = indexedDB.open(commentDataBase);

  open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction(commentTable, "readwrite");
      let store = tx.objectStore(commentTable);

      var objectStoreRequest = store.delete(1);

      objectStoreRequest.onsuccess = function(event) {
        console.log("Comment deleted");
      };

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
  }
});
