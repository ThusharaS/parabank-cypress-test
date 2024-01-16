export default class LoginPage {

    usernameInputField() {
        return 'input[name="username"]';
    }
    passwordInputField() {
        return 'input[name="password"]';
    }
    loginButton() {
        return 'div.login input.button';
    }
    registerButton() {
        return "#loginPanel p:nth-of-type(2) a";
    }
}