/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function(input) {
    // If my number is invalid, returned with will 'invalid number'.
    // var result;

    let units = ["gal", "l", "lbs", "kg", "mi", "km"];
    let validFraction = /^([1-9]\d*(\.\d+)?)[/](\d+(\.\d+)?)$/; //regex match fractions
    let validDecimal = /^\d+(\.\d+)?$/; //regex match decimals
    let number = input.split(/([a-zA-z]+$)/); // split letters from numbers
    number = number.filter(Boolean); // remove empty or white space
    let result = number[0];

    //if a number is a valid decimal or number,
    //return number
    if (validDecimal.test(result)) {
      result = Number(number[0]);
      //if a number is a fraction, split two numbers between
      //division sign and return fraction
    } else if (validFraction.test(result)) {
      let seperate = result.split("/");
      let fraction = Number(seperate[0]) / Number(seperate[1]);
      result = fraction;
      //if first index of split array is one of the units,
      //return number with 1
    } else if (units.includes(result)) {
      result = 1;
    } else {
      result = "invalid number";
    }

    return result;

    // result = parseFloat(input);
    // return result;
  };

  this.isValidUnit = function(initUnit) {
    if (!initUnit) {
      return false;
    }
    let init = initUnit.toLowerCase();
    switch (init) {
      case "gal":
      case "l":
      case "lbs":
      case "kg":
      case "mi":
      case "km":
        return true;
      default:
        return false;
    }
  };

  this.getUnit = function(input = "") {
    let result;
    //   If my unit of measurement is invalid, returned will be 'invalid unit'.
    result = input.replace(/[0-9]/g, "").replace(/\./, "");

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let units = unit.toLowerCase();
    let obj = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };

    for (let props in obj) {
      if (props == units) {
        result = obj[props];
      }
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = +(initNum / galToL).toFixed(5);
        break;
      case "lbs":
        result = initNum / lbsToKg;
        break;
      case "kg":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    if (isNaN(initNum) && !this.isValidUnit(returnUnit)) {
      result = "invalid number and unit";
    } else if (isNaN(initNum)) {
      result = "invalid number";
    } else if (!this.isValidUnit(returnUnit)) {
      result = "invalid unit";
    } else {
      result =
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum +
        " " +
        this.spellOutUnit(returnUnit);
    }

    return result;
  };
}

module.exports = ConvertHandler;
