export default class RegisterPage {

    firstNameInputTextLabel() {
        return 'input[id="customer.firstName"]';
    }
    lastNameInputTextLabel() {
        return 'input[id="customer.lastName"]';
    }
    streetInputTextLabel() {
        return 'input[id="customer.address.street"]';
    }
    cityInputTextLabel() {
        return 'input[id="customer.address.city"]';
    }
    stateInputTextLabel() {
        return 'input[id="customer.address.state"]';
    }
    zipcodeInputTextLabel() {
        return 'input[id="customer.address.zipCode"]';
    }
    phoneNumberInputTextLabel() {
        return 'input[id="customer.phoneNumber"]';
    }
    ssnInputTextLabel() {
        return 'input[id="customer.ssn"]';
    }
    usernameInputTextLabel() {
        return 'input[id="customer.username"]';
    }
    passwordInputTextLabel() {
        return 'input[id="customer.password"]';
    }
    repeatedPasswordInputTextLabel() {
        return 'input[id="repeatedPassword"]';
    }
    registerButton() {
        return 'input[value="Register"]';
    }
}
