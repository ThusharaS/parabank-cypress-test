export default class TransferFundPage {

    amountInputField() {
        return 'input[id="amount"]';
    }
    fromAccount() {
        return 'select[id="fromAccountId"]';
    }
    toAccount() {
        return 'select[id="toAccountId"]';
    }
    transferButton() {
        return 'input[value="Transfer"]'
    }
    transferConfirmationMessage() {
        return 'h1.title + p';
    }
}