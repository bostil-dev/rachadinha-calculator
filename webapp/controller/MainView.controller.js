sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (
    Controller,
    JSONModel,
    MessageToast) => {
    "use strict";

    return Controller.extend("calculator.controller.MainView", {
        /**
         * Attributes
         */

        _oModelRachadinha: null,
        _oResourceBundle: null,

        onInit() {

            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle()

            const oRachadaData = {
                min: 1,
                max: 100,
                percentage: 95,
                council: [
                    { name: "Wellington", salary: "15000" },
                    { name: "Wal", salary: "25000" },
                    { name: "Tercio", salary: "" },
                    { name: "Nathalia Q.", salary: "" },
                ],
                total: ""
            }
            oRachadaData.total = this._calculateRachadinha(
                oRachadaData.percentage,
                oRachadaData.council.map((oGhost) => +oGhost.salary)
            )
            this._oModelRachadinha = new JSONModel(oRachadaData)


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
        },

        onRacharContinuamenteAteAPFAparecerPorra: function (oEvent) {

            const aCouncil = this._oModelRachadinha.getProperty("/council")
            const aSalary = aCouncil.map((oGhostEmployee) => {
                return +oGhostEmployee.salary
            })
            const fPercentage = +this._oModelRachadinha.getProperty("/percentage")
            let fTotalRachada = this._calculateRachadinha(fPercentage, aSalary)
            this._oModelRachadinha.setProperty("/total", fTotalRachada)
        },

        onAskQueirozToRachar: function (oEvent) {
            const sMessage = this._oResourceBundle.getText("MessageQueirozAlreadyRachou")
            MessageToast.show(sMessage)
        },


        _calculateRachadinha: function (fPercentage, aSalary) {

            let fTotalSalary = aSalary.reduce((acc, cur) => {
                return acc + cur
            }, 0);

            return (fTotalSalary * (fPercentage / 100)).toFixed(2)
        }

    });
});