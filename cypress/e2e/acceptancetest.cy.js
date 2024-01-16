import AccOverviewPage from "../page-objects/AccOverviewPage";
import HomePage from "../page-objects/HomePage";
import LoginPage from "../page-objects/LoginPage";
import RegisterPage from "../page-objects/RegisterPage";
import OpenNewAccPage from "../page-objects/OpenNewAccPage";
import TransferFundPage from "../page-objects/TransferFundPage";
import Nav from "../page-objects/Nav";


let accNo
let transferAmount
let usercred

describe('para-bank app', () => {
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const homePage = new HomePage();
    const accOverviewPage = new AccOverviewPage();
    const transferFundPage = new TransferFundPage();
    const openNewAccPage = new OpenNewAccPage();
    const nav = new Nav();

    beforeEach(() => {
      cy.visit('/')
    })

    it('create new user', () => {
        cy.get(loginPage.registerButton()).should('be.visible').click();
        var rand = Math.floor(Math.random() * 101);
        var phoneAndssn = Math.floor((Math.random() + Math.floor(Math.random()*9)+1) * Math.pow(10, 8));
        Cypress.env('usernamepass', 'test'+rand)
        cy.get(registerPage.firstNameInputTextLabel()).type('test'+rand);
        cy.get(registerPage.lastNameInputTextLabel()).type('test'+rand);
        cy.get(registerPage.streetInputTextLabel()).type('3/673 Bourke St');
        cy.get(registerPage.cityInputTextLabel()).type('Melbourne');
        cy.get(registerPage.stateInputTextLabel()).type('Victoria');
        cy.get(registerPage.zipcodeInputTextLabel()).type('3000');
        cy.get(registerPage.phoneNumberInputTextLabel()).type(phoneAndssn);
        cy.get(registerPage.ssnInputTextLabel()).type(phoneAndssn);
        cy.get(registerPage.usernameInputTextLabel()).type(Cypress.env('usernamepass'));
        cy.get(registerPage.passwordInputTextLabel()).type(Cypress.env('usernamepass'));
        cy.get(registerPage.repeatedPasswordInputTextLabel()).type(Cypress.env('usernamepass'));
        cy.get(registerPage.registerButton()).click();
        cy.get(homePage.welcomeMessage()).should('have.text', "Welcome "+Cypress.env('usernamepass'));
        cy.get(homePage.accCreationMessage()).should('have.text', "Your account was created successfully. You are now logged in.");

        usercred = Cypress.env('usernamepass')
    })

    it('verify global navigation', () => {
        //Login
        cy.get(loginPage.usernameInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.passwordInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.loginButton()).click();

        cy.get(nav.openNewAccLink()).click()
        cy.get(nav.pageHeaderText()).should('have.text', 'Open New Account')

        cy.get(nav.accOverviewLink()).click()
        cy.get(nav.pageHeaderText()).should('have.text', 'Accounts Overview')

        cy.get(nav.transFundLink()).click()
        cy.get(nav.pageHeaderText()).should('have.text', 'Transfer Funds')

        cy.get(nav.billPayLink()).click()
        cy.get(nav.pageHeaderText()).first().should('have.text', 'Bill Payment Service')

        cy.get(nav.findTransacLink()).click()
        cy.get(nav.pageHeaderText()).should('have.text', 'Find Transactions')

        cy.get(nav.updateContInfoLink()).click()
        cy.get(nav.pageHeaderText()).should('have.text', 'Update Profile')

        cy.get(nav.reqLoanLink()).click()
        cy.get(nav.pageHeaderText()).should('contains.text', 'Apply for a Loan')
    })

    it('create savings account', () => {
        //Login
        cy.get(loginPage.usernameInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.passwordInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.loginButton()).click();

        cy.get(nav.openNewAccLink()).click()
        cy.get(openNewAccPage.accTypeDropdown()).select('SAVINGS')
        cy.wait(500).get(openNewAccPage.openNewAccButton()).click()
        cy.get(openNewAccPage.accOpeningMessage()).should('have.text', 'Congratulations, your account is now open.')

        cy.get(openNewAccPage.accNumberText()).invoke('text').then((text) => {
            Cypress.env('accNo', text)
        })
    })

    it('verify savings account balance', () => {
        //Login
        cy.get(loginPage.usernameInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.passwordInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.loginButton()).click();

        cy.get(nav.accOverviewLink()).click()
        cy.wait(500).get(accOverviewPage.newAccNumber()).should('have.text', Cypress.env('accNo'))
        cy.get(accOverviewPage.newAccBalance()).should('have.text', '$100.00')
    })

    it('transfer funds from the newly created savings account', () => {
        //Login
        cy.get(loginPage.usernameInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.passwordInputField()).type(Cypress.env('usernamepass'));
        cy.get(loginPage.loginButton()).click();

        transferAmount = Math.floor(Math.random() * 11);
        cy.get(nav.transFundLink()).click()
        cy.wait(500).get(transferFundPage.amountInputField()).type(transferAmount)
        cy.wait(500).get(transferFundPage.fromAccount()).select(Cypress.env('accNo'))
        cy.get(transferFundPage.transferButton()).click()

        cy.get(transferFundPage.transferConfirmationMessage()).should('contains.text', '$'+transferAmount+'.00 has been transferred from account #'+Cypress.env('accNo'))

        accNo = Cypress.env('accNo')
    })

})


describe('Find Transactions API Test', () => {
    context('GET /parabank/services_proxy/bank/accounts/${accNo}/transactions/amount/${transferAmount}', () => {
        it('Test Find Transactions API', () => {
            cy.request({
                method: 'GET',
                url: `https://${usercred}:${usercred}@parabank.parasoft.com/parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accNo}/transactions/amount/${transferAmount}`,
                auth: {
                    username: usercred,
                    password: usercred,
                }
            }).then((response) => {
                expect(response).to.have.property('status').to.equal(200)
                expect(response.body).to.have.property('accountId').to.equal(accNo)
                expect(response.body).to.have.property('amount').to.equal(transferAmount)
            })
        })
    })
})
  