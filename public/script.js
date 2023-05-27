// user details stored in the database/server
function saveToServer(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phonenumber = event.target.phonenumber.value;

  const obj = { name, email, phonenumber };

  axios
  .post("http://localhost:3000/postuserdetails", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      document.body.innerHTML =
        document.body.innerHTML + "<h2> Something went wrong </h2>";
    });
}

//refresh window  - show user details on screen
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/userdetails")
    .then((response) => {
      const userDetails = response.data.UserDetails;
      for (let i = 1; i < userDetails.length; i++) {
        displayUserDetails(userDetails[i]);
      }
    })
    .catch((err) => {
      console.log(err);
      document.body.innerHTML =
        document.body.innerHTML +
        "<h2>Something went wrong from getting user details from server</h2>";
    });
});

function displayUserDetails(user) {
  // console.log(user.name);
  // console.log(user.mail);
  // console.log(user.phonenumber);
  console.log("the id is ",user.id);

  const parentNode = document.getElementById("userDetails");
  const childHTML = `<li id=${user.id}> ${user.name} - ${user.mail} - ${user.phonenumber}
                            <button onclick = deleteUser('${user.id}')> Delete User </button>
                            <button onclick = editUserDetails('${user.id}','${user.name}','${user.mail}','${user.phonenumber}')>Edit User </button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function deleteUser(userId) {
  axios
    .delete(`http://localhost:3000/userdelete/${userId}`)
    .then((response) => {
      console.log(response);
      deleteUserInScreen(userId);
    })
    .catch((error) => {
      console.log(error);
    });
}



// Delete user details on screen
function deleteUserInScreen(userId) {
  parentNode = document.getElementById("userDetails");
  childNode = document.getElementById(`${userId}`);
  parentNode.removeChild(childNode);
  alert("User deleted");
}

// // Edit user details
function editUserDetails(userId, userName, userEmail, userPhoneNumber) {
  document.getElementById("name").value = userName;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhoneNumber;
  deleteUserInScreen(userId);
}
