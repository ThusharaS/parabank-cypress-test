export default class AccOverviewPage {

    newAccNumber() {
        return 'table[id="accountTable"] tr:nth-child(2) td:nth-child(1) a';
    }
    newAccBalance() {
        return 'table[id="accountTable"] tr:nth-child(2) td:nth-child(1) + td'
    }
}