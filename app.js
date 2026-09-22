const ids = ["check", "rent", "food", "car", "phone", "save"];
const out = document.getElementById("out");
function n(id) { return Number(document.getElementById(id).value) || 0; }
function run() {
  const check = n("check");
  const monthly = check * 26 / 12;
  const core = n("rent") + n("food") + n("car");
  const bills = core + n("phone");
  const left = monthly - bills;
  const pct = monthly ? (left / monthly) * 100 : 0;
  const afterSave = check - n("save");
  out.textContent = [
    "Monthly take-home: $" + monthly.toFixed(0),
    "Rent + food + car: $" + core.toFixed(0),
    "All listed bills: $" + bills.toFixed(0),
    "Left per month: $" + left.toFixed(0) + " (" + pct.toFixed(0) + "% of pay)",
    "Live-on after each save: $" + afterSave.toFixed(0),
    pct < 50 ? "Flag: leftover under 50% after rent food car. Tight." : "Leftover at or above 50% on those three."
  ].join("\n");
}
ids.forEach((id) => document.getElementById(id).addEventListener("input", run));
run();
