function createLogin() {
    var form = document.createElement("form");
    form.setAttribute('id',"loginForm");
    form.setAttribute('method',"post");

    ////////////////////////////////////////////////////////////////////////////

    var emailDiv = document.createElement("div");
    var emailLabel = document.createElement("label"); //label element, email
    emailLabel.setAttribute('for',"email");
    emailLabel.innerHTML = "Email";

    var emailInput = document.createElement("input"); //input element, email
    emailInput.setAttribute('type',"email");
    emailInput.setAttribute('name',"email");

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    ////////////////////////////////////////////////////////////////////////////

    var passwordDiv = document.createElement("div");
    var passwordLabel = document.createElement("label"); //label element, email
    passwordLabel.setAttribute('for',"password");
    passwordLabel.innerHTML = "Password";

    var passwordInput = document.createElement("input"); //input element, password
    passwordInput.setAttribute('type',"password");
    passwordInput.setAttribute('name',"password");

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    ////////////////////////////////////////////////////////////////////////////

    var inputDiv = document.createElement("div");
    var submitInput = document.createElement("input"); //input element, Submit button
    submitInput.setAttribute('id',"signin");
    submitInput.setAttribute('type',"submit");
    submitInput.setAttribute('value',"Login");
    inputDiv.appendChild(submitInput);

    ////////////////////////////////////////////////////////////////////////////

    form.appendChild(emailDiv);
    form.appendChild(passwordDiv);
    form.appendChild(inputDiv);

    return form;
}
