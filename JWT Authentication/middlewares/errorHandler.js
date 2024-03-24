function errorHandler(error) {
  let errorObject = { email: "", password: "" };

  //during login
  if (error.message == "incorrect email") {
    errorObject["email"] =
      "User with that email does not exist, try again with a different email!";
    return errorObject;
  }

  if (error.message == "incorrect password") {
    errorObject["password"] = "Incorrect password, please try again!";
    return errorObject;
  }

  //unique email
  if (error.code === 11000) {
    errorObject["email"] =
      "That email is already registered, Please enter a different email!";
    return errorObject;
  }

  //user validation failed
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      let { path, message } = properties;
      errorObject[path] = message;
    });
  }

  return errorObject;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = { errorHandler };
