



class Battery {
    constructor(pCellCount) {
        this.cells = Array(pCellCount).fill(new Cell()); 
        this.chargingTime = 0;
        this.dechargingTime = 0;
        this.lastCell = -1;
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
        this.lastCell++; 
        this.cells[this.lastCell].setCharge();
    }

    setDecharge() {
        this.cells[this.lastCell].setDecharge();
        this.lastCell--; 
    }

}