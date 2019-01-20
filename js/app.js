



$(function(){

    let battery = undefined;
    let timer = undefined;

    function createCell() {
        for (let index = 0; index < 10; index++) {
            $('.battery').append(`<div class ="cell-decharged" id="cell${index}"></div>`);
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
                $(`#cell${index}`).removeClass('cell-decharged').addClass('cell-charged');
                $('.info').html(`<p>Battery charge %${(index + 1) * 10}</p>`);
                if (index === battery.getCellsCount()) {
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
                $(`#cell${index}`).removeClass('cell-charged').addClass('cell-decharged');
                $('.info').html(`<p>Battery charge %${index * 10}</p>`);
                if (index === 0) {
                    clearInterval(timer);
                }
            }, battery.getTiming());
        });
    }

    function init() {
        battery = new Battery(10);
        createCell();
        setChargeButtonListener();
        setDechargeButtonListener();
    }

    init();
})