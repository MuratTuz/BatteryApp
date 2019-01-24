



class Cell {
    constructor() {
        this.charge = false;
    }

    setCharge() {
        this.charge = true;
    }

    setDecharge() {
        this.charge = false;
    }

    checkCharge() {
        return this.charge;
    }
}