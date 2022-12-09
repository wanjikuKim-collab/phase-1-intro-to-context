// Your code here
//populates a record from an Array
function createEmployeeRecord(employee){
    const employeeRecord={
        firstName:employee[0],
        familyName:employee[1],
        title:employee[2],
        payPerHour:employee[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
    return employeeRecord;
}
createEmployeeRecord()

//process an Array of Arrays into an Array of employee records
function createEmployeeRecords(employees){
    const employeesRecords = []
    employees.map(employee=>employeesRecords.push(createEmployeeRecord(employee)))
    return employeesRecords
}   
createEmployeeRecords()

//it adds a timeIn event Object to an employee's record of timeInEvents when 
//provided an employee record and Date/Time String and returns the updated record
function createTimeInEvent(employeeRecord,dateStamp){
   employeeRecord.timeInEvents.push(
    {
        type: "TimeIn",
        hour:Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
   )
   return employeeRecord;
}

//it adds a timeOut event Object to an employee's record of timeOutEvents
// when provided an employee record and Date/Time String and returns the updated record
function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}

//hoursWorkedOnDate calculates the hours worked when given an employee record and a date
function hoursWorkedOnDate(employeeRecord, date){
    for(let i in employeeRecord.timeInEvents){
        if(employeeRecord.timeInEvents[i].date === date){
            return (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100
        }
    }
}

//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(employeeRecord, date){
    const payOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return payOwed;
}

//allWagesFor aggregates all the dates' wages and adds them together
function allWagesFor(employeeRecord){   
    let total = employeeRecord.timeInEvents.reduce((accumulator, timeInElement) => {
        let total = wagesEarnedOnDate(employeeRecord, timeInElement.date)
        return accumulator += total;
    }, 0)
    return total;
}

//calculatePayroll aggregates all the dates' wages and adds them together
function calculatePayroll(arrayOfEmployees){
    const reducer = (accumulator, employee) => {
        let totalWages = allWagesFor(employee);
        return accumulator += totalWages;
    }
   return arrayOfEmployees.reduce(reducer, 0)
}

