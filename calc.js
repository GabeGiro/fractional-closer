// Calculator math for calculator.html. Pure function, no DOM, so node can test it.
// Rates are fractions (0.25 = 25%). Month 0 is the first month.
(function (root) {
  function calc(s) {
    var attended = s.calls * s.show;
    var closed = attended * s.close;
    var share = s.monthlyOn ? s.share : 0;
    var oneOff = closed * (1 - share);
    var newMonthly = closed * share;
    var waived = s.fee > 0 && s.waiver && s.close < 0.25;
    var fee = waived ? 0 : s.fee;
    var horizon = s.monthlyOn ? s.horizon : 1;

    var months = [];
    for (var m = 0; m < horizon; m++) {
      var active = 0, recComm = 0;
      for (var age = 0; age <= m; age++) {
        var alive = newMonthly * Math.pow(1 - s.churn, age);
        active += alive;
        var rate = age < s.p1m ? s.p1 : age < s.p1m + s.tailm ? s.tail : 0;
        recComm += alive * s.price * rate;
      }
      var oneOffComm = oneOff * s.value * s.comm;
      var closer = fee + oneOffComm + recComm;
      var revenue = oneOff * s.value + active * s.price;
      var gross = revenue * s.margin;
      months.push({
        fee: fee, oneOffComm: oneOffComm, recComm: recComm, closer: closer,
        active: active, revenue: revenue, gross: gross, net: gross - closer
      });
    }

    function sum(k) { return months.reduce(function (t, x) { return t + x[k]; }, 0); }
    return {
      attended: attended, closed: closed, oneOff: oneOff, newMonthly: newMonthly,
      fee: fee, waived: waived, months: months,
      total: { closer: sum("closer"), revenue: sum("revenue"), gross: sum("gross"), net: sum("net") }
    };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = calc;
  else root.fcCalc = calc;
})(this);
