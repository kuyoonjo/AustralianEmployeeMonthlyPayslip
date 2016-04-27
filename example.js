const AustralianEmployeeMonthlyPayslip = require('./index.js')

var e = new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', 60050, '9%', '01 March – 31 March')

console.log(e.getGrossIncome(), e.getIncomeTax() ,e.getNetIncome(), e.getPensionContribution(), e.getPeriod())