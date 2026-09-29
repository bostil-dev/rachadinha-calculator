sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("calculator.controller.MainView", {
        onInit() {

        },

        onRachar(oEvent) {

            const oSlider = this.byId("slider")
            const oList = this.byId("list")
            const oTitle = this.byId("title")

            const aItems = oList.getItems()
            const aSalary = aItems.map((oInputListItem) => {
                return +oInputListItem.getContent()[0].getValue()
            })
            let fTotalSalary = aSalary.reduce((acc, cur) => {
                return acc + cur
            }, 0);

            let fTotalRachada = fTotalSalary * (oSlider.getValue() / 100)

            oTitle.setText(fTotalRachada)

        }
    });
});