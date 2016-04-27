const AustralianEmployeeMonthlyPayslip = require('../index.js')

describe("David Rudd Example", () => {
	var e = new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', 60050, '9%', '01 March – 31 March')
	
	it("'s gross income should be 5004", () => {
		expect(e.getGrossIncome()).toBe(5004)
	})
	
	it("'s income tax should be 922", () => {
		expect(e.getIncomeTax()).toBe(922)
	})
	
	it("'s net income should be 4082", () => {
		expect(e.getNetIncome()).toBe(4082)
	})
	
	it("'s pension contribution should be 450", () => {
		expect(e.getPensionContribution()).toBe(450)
	})
	
	it("'s pay period should be 01 March – 31 March", () => {
		expect(e.getPeriod()).toBe('01 March – 31 March')
	})
})

describe("Exception Example", () => {
	it("shold throw an exception Constructor needs 5 parameters", () => {
		expect(() => {
			new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', -1, '9%', '01 March – 31 March')
		}).toThrow()
	})
	it("should throw an exception Annal salary should be a positive integer", () => {
		expect(() => {
			new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', -1, '9%', '01 March – 31 March')
		}).toThrow()
	})
	
	it("should throw an exception Pension rate should be in [0%, 50%]", () => {
		expect(() => {
			new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', 60050, '59%', '01 March – 31 March')
		}).toThrow()
	})
	
	it("should throw an exception Pension rate should be in [0%, 50%]", () => {
		expect(() => {
			new AustralianEmployeeMonthlyPayslip.Employee('David', 'Rudd', 60050, '-1%', '01 March – 31 March')
		}).toThrow()
	})
})

describe("Import/Export Example", () => {
	// David,Rudd,60050,9%,01 March – 31 March
	// Ryan,Chen,120000,10%,01 March – 31 March
	var jsonObj = [
		{
			"firstName": "David", 
			"lastName": "Rudd", 
			"annualSalary": 60050, 
			"pensionRate": "9%", 
			"paymentStartDate": "01 March – 31 March"
		},
		{
			"firstName": "Ryan", 
			"lastName": "Chen", 
			"annualSalary": 120000, 
			"pensionRate": "10%", 
			"paymentStartDate": "01 March – 31 March"
		}
	]
	var jsonString = JSON.stringify(jsonObj)
	var employees = AustralianEmployeeMonthlyPayslip.Employee.importJSON(jsonString)
		
	it("should contains two employees", () => {
		expect(employees.length).toBe(2)
	})
	
	it("should contains data", () => {
		["firstName", "lastName", "annualSalary", "pensionRate", "paymentStartDate"].forEach(key => {
			[0, 1].forEach(index => {
				expect(employees[index][key]).toBe(jsonObj[index][key])
			})
		})
		console.log('Employees:', employees)
	})
	
	it("should exports data", () => {
		var exportedJSON = AustralianEmployeeMonthlyPayslip.Employee.exportJSON(employees)
		expect(exportedJSON).toBe(jsonString)
		console.log('exported JSON:', exportedJSON)
	})
})