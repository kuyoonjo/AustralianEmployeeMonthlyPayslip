"use strict";

const taxRatesJsonPath = './taxRates.json'

class Employee {
	constructor(firstName, lastName, annualSalary, pensionRate, paymentStartDate) {
		check()
		
		this.firstName = firstName
		this.lastName = lastName
		this.annualSalary = annualSalary
		this.pensionRate = pensionRate
		this.paymentStartDate = paymentStartDate
		
		function isPositiveInt(n) {
			// The coding exercise specifies annual salary should be a positive integer.
			// However, I think it should be a natural number(include 0).
		    return Number(n) === n && n % 1 === 0 && n >= 0;
		}
		
		function isIn0to50(s) {
			var f = parseFloat(s)
			return f >= 0 && f <= 50
		}
		
		// check valid inputs
		function check() {
			[firstName, lastName, annualSalary, pensionRate, paymentStartDate].forEach(arg => {
				if(arg === undefined)
					throw 'Constructor needs 5 parameters'
			})
			
			if(!isPositiveInt(annualSalary))
				throw 'Annal salary should be a positive integer'
			if(!isIn0to50(pensionRate))
				throw 'Pension rate should be in [0%, 50%]'
		}
	}
	
	getPeriod() {
		return this.paymentStartDate
	}
	
	getGrossIncome() {
		return Math.round(this.annualSalary / 12)
	}
	
	getIncomeTax() {
		var taxRates = JSON.parse(require('fs').readFileSync(taxRatesJsonPath, 'utf8'))
		var incomeTax;
		
		taxRates.some(taxRate => {
			if(this.annualSalary >= taxRate.from && (taxRate.to == 'unlimited' || this.annualSalary <= taxRate.to)) {
				incomeTax = (taxRate.base + (this.annualSalary - taxRate.from) * taxRate.over) / 12
				return true
			}
		})
		
		return Math.round(incomeTax)
	}
	
	getNetIncome() {
		return this.getGrossIncome() - this.getIncomeTax()
	}
	
	getPensionContribution() {
		var pensionRate = parseFloat(this.pensionRate) / 100.0
		return Math.round(this.getGrossIncome() * pensionRate)
	}
	
	static importJSON(jsonString) {
		var objs = JSON.parse(jsonString)
		return objs.map(obj => new Employee(obj.firstName, obj.lastName, obj.annualSalary, obj.pensionRate, obj.paymentStartDate))
	}
	
	static exportJSON(employees) {
		return JSON.stringify(employees)
	}
}

exports.Employee = Employee