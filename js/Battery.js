



class Battery {
    constructor(pCellCount) {
        this.cells = Array(pCellCount).fill(new Cell()); // Cell
        this.chargingTime = 0;
        this.dechargingTime = 0;
        this.lastCell = 0;
    }

    getLastCell() {
        return this.lastCell;
    }

    getCellsCount() {
        return this.cells.length;
    }

    getTiming() {
        return (this.chargingTime / this.cells.length) * 1000;
    }

    setChargingTime(pChargingTime) {
        this.chargingTime = pChargingTime;
    }

    setDechargingTime(pDechargingTime) {
        this.dechargingTime = pDechargingTime;
    }

    setCharge() {
        this.cells[this.lastCell].setCharge();
        this.lastCell++; 
    }

    setDecharge() {
        this.lastCell--; 
        this.cells[this.lastCell].setCharge();
    }

}