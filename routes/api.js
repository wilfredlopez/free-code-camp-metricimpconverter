/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    var input = req.query.input;

    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);

    const isValidUnit = convertHandler.isValidUnit(initUnit);

    if (!isValidUnit && isNaN(initNum)) {
      return res.json({ error: "invalid number and unit" });
    }

    if (initUnit === "") {
      return res.json({ error: "no unit" });
    }

    if (isNaN(initNum)) {
      return res.json({ error: "invalid number" });
    }

    if (!isValidUnit) {
      return res.json({ error: "invalid unit" });
    }

    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum: initNum, //3.1,
      initUnit: initUnit, //"mi",
      returnNum: returnNum, //5.0000008,
      returnUnit: returnUnit, //"km",
      string: toString //"3.1 miles converts to 5.00002 kilometers"
    });
  });
};
