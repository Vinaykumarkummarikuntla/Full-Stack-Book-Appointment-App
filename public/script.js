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

// //refresh window  - show user details on screen
// window.addEventListener("DOMContentLoaded", () => {
//   axios
//     .get("https://crudcrud.com/api/da7471657e27485d867224b8ca7e0afb/details/")
//     .then((response) => {
//       for (let i = 0; i < response.data.length; i++) {
//         displayUserDetails(response.data[i]);
//       }
//       //   console.log(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       document.body.innerHTML =
//         document.body.innerHTML +
//         "<h2>Something went wrong from getting user details from server</h2>";
//     });
// });

// function displayUserDetails(user) {
//   console.log(user.name);
//   console.log(user.email);
//   console.log(user.phonenumber);
//   console.log(user._id);

//   const parentNode = document.getElementById("userDetails");
//   const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} - ${user.phonenumber}
//                             <button onclick=deleteUser('${user._id}')> Delete User </button>
//                             <button onclick=editUserDetails('${user._id}','${user.name}','${user.email}','${user.phonenumber}')>Edit User </button>
//                          </li>`;

//   parentNode.innerHTML = parentNode.innerHTML + childHTML;
// }

// // Delete user details in server-side
// function deleteUser(userId) {
//   axios
//     .delete(
//       `https://crudcrud.com/api/da7471657e27485d867224b8ca7e0afb/details/${userId}`
//     )
//     .then((response) => {
//       console.log(response);
//       deleteUserInScreen(userId);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// // Delete user details on screen
// function deleteUserInScreen(userId) {
//   parentNode = document.getElementById("userDetails");
//   childNode = document.getElementById(`${userId}`);
//   parentNode.removeChild(childNode);
//   alert("User deleted");
// }

// // Edit user details
// function editUserDetails(userId, userName, userEmail, userPhoneNumber) {
//   document.getElementById("name").value = userName;
//   document.getElementById("email").value = userEmail;
//   document.getElementById("phone").value = userPhoneNumber;
//   deleteUserInScreen(userId);
// }
