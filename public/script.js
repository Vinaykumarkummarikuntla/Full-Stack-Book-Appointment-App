// User details stored in the database
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

// Show user details on screen
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

// Show details on screen
function displayUserDetails(user) {
  const parentNode = document.getElementById("userDetails");
  const childHTML = `<li id=${user.id}> ${user.name} - ${user.mail} - ${user.phonenumber}
                            <button onclick = deleteUser('${user.id}')> Delete User </button>
                            <button onclick = editUserDetails('${user.id}')>Edit User </button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Delete user details in database
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
// Edit user details
function editUserDetails(userId) {
  axios
    .get(`http://localhost:3000/editdetails/${userId}`)
    .then((response) => {
      console.log("the response data", response.data);
      const userDetails = response.data;

      const { id, name, mail, phonenumber } = userDetails;
      console.log("the edit values", id, name, mail, phonenumber);

      editUser(id, name, mail, phonenumber);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Populate fields
function editUser(userId, userName, userEmail, userPhoneNumber) {
  document.getElementById("name").value = userName;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhoneNumber;
  deleteUserInScreen(userId);
}
