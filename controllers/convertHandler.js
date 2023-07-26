const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

function ConvertHandler() {

  const inputRegex = /^(\d*(?:\.\d+)?|\.\d+)(\/\d*(?:\.\d+)?|\.\d+)?([a-z]+)$/i

  const units = {
    "gal": {
      spelledOut: "gallons",
      convertibleTo: "l",
      conversion: galToL
    },
    "l": {
      spelledOut: "liters",
      convertibleTo: "gal",
      conversion: 1/galToL
    },
    "mi": {
      spelledOut: "miles",
      convertibleTo: "km",
      conversion: miToKm
    },
    "km": {
      spelledOut: "kilometers",
      convertibleTo: "mi",
      conversion: 1/miToKm
    },
    "lbs": {
      spelledOut: "pounds",
      convertibleTo: "kg",
      conversion: lbsToKg
    },
    "kg": {
      spelledOut: "kilograms",
      convertibleTo: "lbs",
      conversion: 1/lbsToKg
    }
  }
  
  this.getNum = function(input) {
    const match = input.match(inputRegex);
    if (match) {
      const num = parseFloat(match[1]);
      if (!num) { return 1; }   // default to 1
      const den = match[2] ? parseFloat(match[2].substring(1)) : 1;
      return num / den; 
    } 
    return "error";
  };
  
  this.getUnit = function(input) {
    const match = input.match(inputRegex);
    if (match && Object.keys(units).includes(match[3].toLowerCase())) {
      return match[3].toLowerCase();
    }
    return "error";
  };
  
  this.getReturnUnit = function(initUnit) {
    return units[initUnit].convertibleTo;
  };

  this.spellOutUnit = function(unit) {
    return units[unit].spelledOut;
  };
  
  this.convert = function(initNum, initUnit) {
    return Math.round(units[initUnit].conversion * initNum * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.getObject = function(input) {
    // master function, returns the object 
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input); 
    
    if (initNum == "error" || initUnit == "error") {
      return "invalid input"; 
    } 

    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    
    return {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: this.getString(initNum, initUnit, returnNum, returnUnit)
    };
  }
  
}

module.exports = ConvertHandler;
