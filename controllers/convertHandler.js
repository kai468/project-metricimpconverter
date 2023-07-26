const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

function ConvertHandler() {

  const inputRegex = /^(\d*(?:\.\d+)?|\.\d+)(\/\d*(?:\.\d+)?|\.\d+)?([a-z]+)$/i

  const units = {
    "gal": {
      spelledOut: "gallons",
      convertibleTo: "L",
      conversion: galToL
    },
    "L": {
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

  this.validateInput = function(input) {
    const matchUnit = input.match(/[a-z]+$/i); 
    const number = matchUnit ? input.slice(0, matchUnit.index) : input; 
    const matchNum = number.match(/^(\d*(?:\.\d+)?|\.\d+)(\/\d*(?:\.\d+)?|\.\d+)?$/);

    
    if ((!matchNum) && !(matchUnit && Object.keys(units).map(key => key.toLowerCase()).includes(matchUnit[0].toLowerCase()))) {
      return "invalid number and unit";
    } else if (!matchNum) {
      return "invalid number";
    } else if ((!matchUnit) || (matchUnit && !Object.keys(units).map(key => key.toLowerCase()).includes(matchUnit[0].toLowerCase()))) {
      return "invalid unit"; 
    }
    
  };
  
  this.getNum = function(input) {
    const match = input.match(inputRegex);
    if (match) {
      const num = parseFloat(match[1]);
      if (!num) { return 1; }   // default to 1
      const den = match[2] ? parseFloat(match[2].substring(1)) : 1;
      return num / den; 
    } 
    return undefined;
  };
  
  this.getUnit = function(input) {
    const match = input.match(inputRegex);
    if (match && Object.keys(units).map(key => key.toLowerCase()).includes(match[3].toLowerCase())) {
      if (Object.keys(units).includes(match[3].toLowerCase())) {
        return match[3].toLowerCase();
      } else {
        return match[3].toUpperCase();    // just for handling the uppercase "L" for liters
      }
    }
    return undefined;
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
    
    if (initNum == undefined || initUnit == undefined) {
      return this.validateInput(input); 
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
