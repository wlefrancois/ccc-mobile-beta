const workouts = {
  home: [
    { name: "Day 1 — Chest + Arms", focus: "Upper chest, triceps, biceps", duration: "55 min", plan: ["Incline DB Press 4x10", "Flat DB Press 3x10", "Cable Fly 3x15", "Rope Pushdown 4x12", "DB Curl 4x12", "Hammer Curl 3x15"] },
    { name: "Day 2 — Back + Core", focus: "Back strength, posture, spine stability", duration: "50 min", plan: ["Chest Supported Row 4x10", "Lat Pulldown 4x12", "Seated Cable Row 3x12", "Face Pull 3x15", "Bird Dog 3 rounds", "McGill Curl-Up 3 rounds", "Plank 3x30 sec"] },
    { name: "Day 3 — Legs Safe Mode", focus: "Knee-friendly lower body", duration: "45 min", plan: ["Leg Press 4x12", "DB Romanian Deadlift 4x10", "Low Step-Ups 3x10", "Hamstring Curl 3x15", "Calf Raise 4x15", "Side Plank 3 rounds"] },
    { name: "Day 4 — Wayne Armor", focus: "Shoulders, carries, presence", duration: "50 min", plan: ["Seated DB Shoulder Press 4x10", "Lateral Raise 4x15", "Rear Delt Fly 4x15", "Farmer Carry 5 rounds", "Pushups burnout", "Curl burnout"] }
  ],
  travel: {
    hotel: { name: "Hotel Gym Express", focus: "Fast full body", duration: "30 min", plan: ["DB Bench 3x12", "Goblet Squat to safe depth 3x12", "1-Arm DB Row 3x12", "DB Shoulder Press 3x10", "Treadmill incline walk 10 min"] },
    bodyweight: { name: "No Equipment Reset", focus: "Mobility + sweat", duration: "20 min", plan: ["Wall Pushups 3x15", "Chair Squat to box 3x12", "Split-stance hinge 3x12", "Dead Bug 3x10", "Brisk walk 10 min"] },
    recovery: { name: "Back-Safe Travel Day", focus: "Recovery", duration: "15 min", plan: ["Cat-Camel x10", "Bird Dog x10", "McGill Curl-Up x10", "Glute Bridge x15", "Walk 10 min"] }
  }
};

const formLibrary = [
  { exercise: "Incline DB Press", cue: "Bench at 30–45°. Lower to upper chest, elbows about 45°, press without bouncing." },
  { exercise: "Chest Supported Row", cue: "Keep chest planted. Pull elbows back and squeeze shoulder blades at the top." },
  { exercise: "DB Romanian Deadlift", cue: "Soft knees, hinge at hips, keep dumbbells close, stop before low back rounds." },
  { exercise: "Leg Press", cue: "Use pain-free depth. Control the lowering phase. Do not let hips roll off the pad." },
  { exercise: "Farmer Carry", cue: "Stand tall, ribs down, brace abs, walk slow and controlled." },
  { exercise: "McGill Curl-Up", cue: "One knee bent, hands under low back, brace core and lift shoulders slightly." }
];

const els = {
  tabs: document.querySelectorAll(".tab"),
  panels: document.querySelectorAll(".tab-panel"),
  trainList: document.getElementById("trainList"),
  formList: document.getElementById("formList"),
  travelList: document.getElementById("travelList"),
  travelSelect: document.getElementById("travelSelect"),
  installStateBtn: document.getElementById("installStateBtn"),
  saveBtn: document.getElementById("saveBtn"),
  saveStatus: document.getElementById("saveStatus"),
  readinessPill: document.getElementById("readinessPill"),
  readinessBar: document.getElementById("readinessBar"),
  coachMessage: document.getElementById("coachMessage"),
  statWeight: document.getElementById("statWeight"),
  statWaist: document.getElementById("statWaist"),
  statProtein: document.getElementById("statProtein"),
  statSteps: document.getElementById("statSteps"),
  homeBack: document.getElementById("homeBack"),
  homeKnee: document.getElementById("homeKnee"),
  homeEnergy: document.getElementById("homeEnergy"),
  weight: document.getElementById("weight"),
  waist: document.getElementById("waist"),
  protein: document.getElementById("protein"),
  steps: document.getElementById("steps"),
  backPain: document.getElementById("backPain"),
  kneePain: document.getElementById("kneePain"),
  energy: document.getElementById("energy"),
  notes: document.getElementById("notes")
};

function workoutCard(item) {
  const steps = item.plan.map(step => `<div class="plan-step">${step}</div>`).join("");
  return `
    <div class="workout-card">
      <div class="workout-top">
        <div>
          <div class="mission-title">${item.name}</div>
          <div class="muted">${item.focus}</div>
        </div>
        <div class="badge">${item.duration}</div>
      </div>
      ${steps}
      <button class="btn btn-gold" type="button" style="margin-top:12px;">Start Session</button>
    </div>
  `;
}

function renderTrain() {
  els.trainList.innerHTML = workouts.home.map(workoutCard).join("");
  els.formList.innerHTML = formLibrary.map(item =>
    `<div class="form-cue"><strong>${item.exercise}</strong>${item.cue}</div>`
  ).join("");
}

function renderTravel(mode) {
  els.travelList.innerHTML = workoutCard(workouts.travel[mode]);
}

function activateTab(name) {
  els.tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === name));
  els.panels.forEach(panel => panel.classList.toggle("active", panel.id === name));
}

function calculateReadiness() {
  const protein = Math.min(Number(els.protein.value || 0) / 190, 1) * 25;
  const steps = Math.min(Number(els.steps.value || 0) / 8000, 1) * 20;
  const energy = (Math.min(Number(els.energy.value || 0), 10) / 10) * 20;
  const back = ((10 - Math.min(Number(els.backPain.value || 0), 10)) / 10) * 17.5;
  const knee = ((10 - Math.min(Number(els.kneePain.value || 0), 10)) / 10) * 17.5;
  return Math.round(protein + steps + energy + back + knee);
}

function coachMessage(readiness) {
  const back = Number(els.backPain.value || 0);
  const knee = Number(els.kneePain.value || 0);
  if (back >= 6) return "Back is flaring up. Use Back-Safe Travel Day or Day 2 rehab only. Skip heavy hinges today.";
  if (knee >= 6) return "Knee is talking. Replace step-ups with hamstring curls, lighter leg press, and extra walking.";
  if (readiness >= 80) return "Green light. Push the main lift hard today and finish with carries or incline walking.";
  if (readiness >= 65) return "Solid day. Hit the full session, but leave 1–2 reps in reserve on each set.";
  return "Recovery emphasis. Do the warm-up, shorter lift, and focus on protein, water, and steps.";
}

function refreshDashboard() {
  const readiness = calculateReadiness();
  els.readinessPill.textContent = `${readiness}%`;
  els.readinessBar.style.width = `${readiness}%`;
  els.coachMessage.textContent = coachMessage(readiness);
  els.statWeight.textContent = `${els.weight.value || "0"} lb`;
  els.statWaist.textContent = `${els.waist.value || "0"} in`;
  els.statProtein.textContent = `${els.protein.value || "0"} g`;
  els.statSteps.textContent = `${els.steps.value || "0"}`;
  els.homeBack.textContent = `${els.backPain.value || 0}/10`;
  els.homeKnee.textContent = `${els.kneePain.value || 0}/10`;
  els.homeEnergy.textContent = `${els.energy.value || 0}/10`;
}

function saveCheckIn() {
  const payload = {
    date: new Date().toISOString(),
    weight: els.weight.value,
    waist: els.waist.value,
    protein: els.protein.value,
    steps: els.steps.value,
    backPain: els.backPain.value,
    kneePain: els.kneePain.value,
    energy: els.energy.value,
    notes: els.notes.value,
    readiness: calculateReadiness()
  };
  localStorage.setItem("ccc_premium_latest_checkin", JSON.stringify(payload));
  const history = JSON.parse(localStorage.getItem("ccc_premium_checkins") || "[]");
  history.unshift(payload);
  localStorage.setItem("ccc_premium_checkins", JSON.stringify(history.slice(0, 30)));
  els.saveStatus.textContent = `Saved locally on this device at ${new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}.`;
  refreshDashboard();
}

function loadCheckIn() {
  const saved = localStorage.getItem("ccc_premium_latest_checkin");
  if (!saved) { refreshDashboard(); return; }
  try {
    const data = JSON.parse(saved);
    ["weight","waist","protein","steps","backPain","kneePain","energy","notes"].forEach(key => {
      if (data[key] !== undefined && els[key]) els[key].value = data[key];
    });
  } catch (e) {}
  refreshDashboard();
}

els.tabs.forEach(tab => tab.addEventListener("click", () => activateTab(tab.dataset.tab)));
els.travelSelect.addEventListener("change", e => renderTravel(e.target.value));
els.installStateBtn.addEventListener("click", () => {
  els.installStateBtn.textContent = els.installStateBtn.textContent === "Beta Ready" ? "Installed" : "Beta Ready";
});
els.saveBtn.addEventListener("click", saveCheckIn);
["weight","waist","protein","steps","backPain","kneePain","energy"].forEach(id => {
  els[id].addEventListener("input", refreshDashboard);
});

renderTrain();
renderTravel("hotel");
loadCheckIn();
