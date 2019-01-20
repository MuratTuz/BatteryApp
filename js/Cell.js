



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
        if (this.charge === true) {
            return true;
        }
        return false;
    }
}