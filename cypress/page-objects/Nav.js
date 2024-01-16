export default class Nav {

    openNewAccLink() {
        return 'div#leftPanel li:nth-of-type(1) a';
    }
    accOverviewLink() {
        return 'div#leftPanel li:nth-of-type(2) a';
    }
    transFundLink() {
        return 'div#leftPanel li:nth-of-type(3) a';
    }
    billPayLink() {
        return 'div#leftPanel li:nth-of-type(4) a';
    }
    findTransacLink() {
        return 'div#leftPanel li:nth-of-type(5) a';
    }
    updateContInfoLink() {
        return 'div#leftPanel li:nth-of-type(6) a';
    }
    reqLoanLink() {
        return 'div#leftPanel li:nth-of-type(7) a';
    }
    logoutLink() {
        return 'div#leftPanel li:nth-of-type(8) a';
    }
    pageHeaderText() {
        return 'div#rightPanel h1.title';
    }
}