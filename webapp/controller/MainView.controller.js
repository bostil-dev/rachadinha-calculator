sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("calculator.controller.MainView", {
        /**
         * Attributes
         */

        _oModelRachadinha: null,

        onInit() {
            this._oModelRachadinha = new JSONModel({
                min: 1,
                max: 100,
                percentage: 95,
                council: [
                    { name: "Foo", salary: "15000" },
                    { name: "Bar", salary: "25000" },
                ],
                total: ""
            })

            this.getView().setModel(this._oModelRachadinha, "rachadinha")
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

        },

        onRacharMaster(oEvent) {

            const aCouncil = this._oModelRachadinha.getProperty("/council")
            const aSalary = aCouncil.map((oGhostEmployee) => {
                return +oGhostEmployee.salary
            })
            let fTotalSalary = aSalary.reduce((acc, cur) => {
                return acc + cur
            }, 0);

            let fTotalRachada = fTotalSalary * (+this._oModelRachadinha.getProperty("/percentage") / 100)

            this._oModelRachadinha.setProperty("/total", fTotalRachada)
        }

    });
});