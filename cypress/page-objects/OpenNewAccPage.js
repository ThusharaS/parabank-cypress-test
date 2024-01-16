export default class OpenNewAccPage {

    accTypeDropdown() {
        return 'select[id="type"]';
    }
    existingAccDropdown() {
        return 'select[id="fromAccountId"]';
    }
    openNewAccButton() {
        return 'input[value="Open New Account"]'
    }
    accOpeningMessage() {
        return 'h1.title + p';
    }
    accNumberText() {
        return 'a[id="newAccountId"]'
    }
}