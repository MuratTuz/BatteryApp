



$(function(){

    let battery = undefined;
    let timer = undefined;

    function createCell() {
        for (let index = 0; index < battery.getCellsCount(); index++) {
            $('.battery').append(`<div class ="cell-empty" id="cell${index}"></div>`);
            $('.info').html(`<p>Battery charge %0</p>`);
        }
    }

    function setChargeButtonListener() {
        $('#charge-button').on('click', () => {
            if (timer) {
                clearInterval(timer);
            }
            let chargingTime = $('#charging-time').val();
            battery.setChargingTime(chargingTime);
            timer = setInterval(() => {
                battery.setCharge();
                const index = battery.getLastCell();
                $('.info').html(`<p>Battery charge %${(index + 1) * 10}</p>`);
                cellColor(index);
                if (index === (battery.getCellsCount() - 1)) {
                    clearInterval(timer);
                }
            }, battery.getTiming());
        });
    }

    function setDechargeButtonListener() {
        $('#decharge-button').on('click', () => {
            if (timer) {
                clearInterval(timer);
            }
            let dechargingTime = $('#decharging-time').val();
            battery.setChargingTime(dechargingTime);
            timer = setInterval(() => {
                battery.setDecharge();
                const index = battery.getLastCell() + 1;
                $(`#cell${index}`).css('background-color', `#F5F5F5`);
                $('.info').html(`<p>Battery charge %${index * 10}</p>`);
                cellColor(index - 1);
                if (index === 0) {
                    clearInterval(timer);
                }
            }, battery.getTiming());
        });
    }

    function init() {
        battery = new Battery(10); // Default 10 cells of battery
        createCell();
        setChargeButtonListener();
        setDechargeButtonListener();
    }

    /**
     * 
     * @param {*} cellNumber
     * 
     * This function change cells' color as transparently as possible regarding to cell count. The function
     * changes first half of the battery cells from red to yellow step by step and then changes other half from yellow 
     * to green dramatically.
     * red = 0XFF0000
     * yellow = 0xFFFF00
     * (dark)green = 0X006400
     * 
     */
    function cellColor(cellNumber) {
        let count = Math.floor(battery.getCellsCount() / 2);
        let rate1 = Math.floor((0XFF / count) * (cellNumber + 1)).toString(16);
        let rate2 = Math.floor(0XFFFF00 - ((0XFF9B00 / count) * (cellNumber + 1 - count))).toString(16);
        while (rate2.length < 6) rate2 = "0" + rate2;

        for (let index = 0; index < cellNumber + 1; index++) {
            if (cellNumber < count) {
                $(`#cell${index}`).css('background-color', `#FF${rate1}00`);
            } else {
                $(`#cell${index}`).css('background-color', `#${rate2}`);
            }            
        }

    }

    init();
})