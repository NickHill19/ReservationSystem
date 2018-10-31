// Check if user is signed in upon start
(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
        }
        else{
            uid = null;
            window.location.replace("index.html");
        }
      });
})();

// Display mattress data as soon as script begins running
(function () {
    var content;
    var database = firebase.database().ref("mattresses").orderByChild("reserved").on('value', function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var RoomNumber = childSnapshot.key;
            var Reserved = childSnapshot.val().reserved;
            if (Reserved == false){
                content += '<tr>';
                content += '<td><a href="mattress.html">' + RoomNumber + '</a></td>';  // column1
                content += '<td>' + Reserved + '</td>';  // column2
                content += '</tr>';
            }
        });
        $('#ex-table').append(content);
    });
})();

// Sign user out when button clicked
function signOut() {
    firebase.auth().signOut();
}

// Listen for click on the sign out button
document.querySelector("#signOut").addEventListener("click", signOut, false);
