function clamp(v, lo, hi) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(hi, n);
}
function n(id, hi) {
  const el = document.getElementById(id);
  return clamp(el ? el.value : 0, 0, hi);
}
function run() {
  try {
    const check = n("check", 100000);
    const monthly = check * 26 / 12;
    const core = n("rent", 20000) + n("food", 10000) + n("car", 10000);
    const bills = core + n("phone", 1000);
    const save = n("save", 100000);
    const left = monthly - bills;
    const pct = monthly > 0 ? (left / monthly) * 100 : 0;
    const afterSave = check - save;
    const out = document.getElementById("out");
    if (!out) return;
    out.textContent = [
      "Monthly take-home: $" + monthly.toFixed(0),
      "Rent + food + car: $" + core.toFixed(0),
      "All listed bills: $" + bills.toFixed(0),
      "Left per month: $" + left.toFixed(0) + " (" + pct.toFixed(0) + "% of pay)",
      "Live-on after each save: $" + afterSave.toFixed(0),
      pct < 50 ? "Flag: leftover under 50% after rent food car. Tight." : "Leftover at or above 50% on those three."
    ].join("\n");
  } catch (err) {
    const out = document.getElementById("out");
    if (out) out.textContent = "Could not calculate. Check the numbers and reload.";
  }
}
try {
  ["check", "rent", "food", "car", "phone", "save"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", run);
  });
  const form = document.getElementById("f");
  if (form) form.addEventListener("submit", (e) => e.preventDefault());
  run();
} catch (err) {
  document.body.appendChild(document.createTextNode("App failed to start."));
}
