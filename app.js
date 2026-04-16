
const CHECKIN_KEY = "ccc_v43_checkins_fix";
const WORKOUT_HISTORY_KEY = "ccc_v43_workout_history_fix";

const EXERCISE_META = {
  "Incline DB Press": {icon:"💪", cue:"30–45° bench, press to upper chest.", sets:"4", reps:"10", rest:90},
  "Flat DB Press": {icon:"🏋️", cue:"Feet planted, steady press.", sets:"3", reps:"10", rest:90},
  "Cable Fly": {icon:"🪽", cue:"Soft bend in elbows, squeeze chest.", sets:"3", reps:"15", rest:60},
  "Rope Pushdown": {icon:"🔽", cue:"Pin elbows in, full extension.", sets:"4", reps:"12", rest:60},
  "DB Curl": {icon:"💥", cue:"Keep elbows quiet, control down.", sets:"4", reps:"12", rest:60},
  "Hammer Curl": {icon:"🔨", cue:"Neutral grip, slow lower.", sets:"3", reps:"15", rest:60},
  "Chest Supported Row": {icon:"🚣", cue:"Chest down, squeeze shoulder blades.", sets:"4", reps:"10", rest:75},
  "Lat Pulldown": {icon:"⬇️", cue:"Pull to upper chest, avoid swinging.", sets:"4", reps:"12", rest:75},
  "Seated Cable Row": {icon:"↩️", cue:"Tall chest, pull elbows back.", sets:"3", reps:"12", rest:75},
  "Face Pull": {icon:"🎯", cue:"Pull high, rotate thumbs back.", sets:"3", reps:"15", rest:60},
  "Bird Dog": {icon:"🧠", cue:"Brace core, move slow.", sets:"3", reps:"10", rest:45},
  "McGill Curl-Up": {icon:"🛡️", cue:"Lift slightly, no spinal crunch.", sets:"3", reps:"10", rest:45},
  "Plank": {icon:"📏", cue:"Straight line, brace abs.", sets:"3", reps:"30 sec", rest:45},
  "Leg Press": {icon:"🦵", cue:"Pain-free depth only.", sets:"4", reps:"12", rest:90},
  "DB Romanian Deadlift": {icon:"⚙️", cue:"Hinge hips, neutral spine.", sets:"4", reps:"10", rest:90},
  "Low Step-Ups": {icon:"📶", cue:"Low box, drive through heel.", sets:"3", reps:"10", rest:60},
  "Hamstring Curl": {icon:"🧩", cue:"Control up and down.", sets:"3", reps:"15", rest:60},
  "Calf Raise": {icon:"⬆️", cue:"Pause at top.", sets:"4", reps:"15", rest:45},
  "Side Plank": {icon:"📐", cue:"Stack shoulders and hips.", sets:"3", reps:"30 sec", rest:45},
  "Seated DB Shoulder Press": {icon:"🏛️", cue:"Stay tall, avoid back arch.", sets:"4", reps:"10", rest:90},
  "Lateral Raise": {icon:"✈️", cue:"Lift to side, not shrug.", sets:"4", reps:"15", rest:60},
  "Rear Delt Fly": {icon:"🪽", cue:"Open wide, squeeze rear delt.", sets:"4", reps:"15", rest:60},
  "Farmer Carry": {icon:"🧳", cue:"Tall posture, slow steps.", sets:"5", reps:"rounds", rest:60},
  "Pushups burnout": {icon:"🔥", cue:"Brace core, full-body plank.", sets:"1", reps:"burnout", rest:60},
  "Curl burnout": {icon:"🔥", cue:"Controlled reps, no swinging.", sets:"1", reps:"burnout", rest:60},
  "Glute Bridge": {icon:"🌉", cue:"Drive hips up, squeeze glutes.", sets:"3", reps:"15", rest:45},
  "Bodyweight box squat": {icon:"📦", cue:"Sit back to box, stand tall.", sets:"3", reps:"12", rest:45},
  "Goblet Squat": {icon:"🏺", cue:"Hold weight high, pain-free depth.", sets:"3", reps:"12", rest:60},
  "Treadmill incline walk": {icon:"🚶", cue:"Steady pace, chest up.", sets:"1", reps:"10 min", rest:0},
  "Brisk walk": {icon:"🚶", cue:"Fast pace, relaxed shoulders.", sets:"1", reps:"10 min", rest:0}
};

const workouts = {
  home: [
    {name:"Day 1 — Chest + Arms", focus:"Upper chest, triceps, biceps", duration:"55 min", plan:["Incline DB Press 4x10","Flat DB Press 3x10","Cable Fly 3x15","Rope Pushdown 4x12","DB Curl 4x12","Hammer Curl 3x15"]},
    {name:"Day 2 — Back + Core", focus:"Back strength, posture, spine stability", duration:"50 min", plan:["Chest Supported Row 4x10","Lat Pulldown 4x12","Seated Cable Row 3x12","Face Pull 3x15","Bird Dog 3 rounds","McGill Curl-Up 3 rounds","Plank 3x30 sec"]},
    {name:"Day 3 — Legs Safe Mode", focus:"Knee-friendly lower body", duration:"45 min", plan:["Leg Press 4x12","DB Romanian Deadlift 4x10","Low Step-Ups 3x10","Hamstring Curl 3x15","Calf Raise 4x15","Side Plank 3 rounds"]},
    {name:"Day 4 — Wayne Armor", focus:"Shoulders, carries, presence", duration:"50 min", plan:["Seated DB Shoulder Press 4x10","Lateral Raise 4x15","Rear Delt Fly 4x15","Farmer Carry 5 rounds","Pushups burnout","Curl burnout"]}
  ],
  travel: {
    hotel:{name:"Hotel Gym Express", focus:"Fast full body", duration:"30 min", plan:["Flat DB Press 3x12","Goblet Squat 3x12","Chest Supported Row 3x12","Seated DB Shoulder Press 3x10","Treadmill incline walk 10 min"]},
    bodyweight:{name:"No Equipment Reset", focus:"Mobility + sweat", duration:"20 min", plan:["Pushups burnout","Bodyweight box squat 3x12","Bird Dog 3x10","McGill Curl-Up 3x10","Brisk walk 10 min"]},
    recovery:{name:"Back-Safe Travel Day", focus:"Recovery", duration:"15 min", plan:["Bird Dog x10","McGill Curl-Up x10","Glute Bridge x15","Brisk walk 10 min"]}
  }
};

const $ = (id) => document.getElementById(id);
const els = {
  tabs: document.querySelectorAll('.tab'),
  panels: document.querySelectorAll('.tab-panel'),
  trainList: $('trainList'),
  travelList: $('travelList'),
  travelSelect: $('travelSelect'),
  readinessPill: $('readinessPill'),
  readinessBar: $('readinessBar'),
  coachMessage: $('coachMessage'),
  statWeight: $('statWeight'),
  statWaist: $('statWaist'),
  statProtein: $('statProtein'),
  statSteps: $('statSteps'),
  sumEntries: $('sumEntries'),
  sumProtein: $('sumProtein'),
  sumSteps: $('sumSteps'),
  sumWorkouts: $('sumWorkouts'),
  entryCountFooter: $('entryCountFooter'),
  miniChart: $('miniChart'),
  historyChart: $('historyChart'),
  entryList: $('entryList'),
  workoutHistoryList: $('workoutHistoryList'),
  saveBtn: $('saveBtn'),
  clearFormBtn: $('clearFormBtn'),
  exportBtn: $('exportBtn'),
  deleteAllBtn: $('deleteAllBtn'),
  saveStatus: $('saveStatus'),
  date: $('date'), weight: $('weight'), waist: $('waist'), protein: $('protein'), steps: $('steps'), backPain: $('backPain'), kneePain: $('kneePain'), energy: $('energy'), notes: $('notes'),
  sessionEmpty: $('sessionEmpty'), sessionPanel: $('sessionPanel'), sessionWorkoutName: $('sessionWorkoutName'), sessionProgress: $('sessionProgress'), sessionIcon: $('sessionIcon'), sessionExerciseName: $('sessionExerciseName'), sessionCue: $('sessionCue'), sessionWatchLink: $('sessionWatchLink'), sessionTarget: $('sessionTarget'), restSecondsDisplay: $('restSecondsDisplay'), restTimerDisplay: $('restTimerDisplay'), doneExerciseBtn: $('doneExerciseBtn'), skipExerciseBtn: $('skipExerciseBtn'), startRestBtn: $('startRestBtn'), resetRestBtn: $('resetRestBtn'), sessionStatus: $('sessionStatus'), finishWorkoutBtn: $('finishWorkoutBtn')
};

let currentSession = null;
let restRemaining = 90;
let restInterval = null;

function getCheckins(){ return JSON.parse(localStorage.getItem(CHECKIN_KEY) || '[]'); }
function setCheckins(d){ localStorage.setItem(CHECKIN_KEY, JSON.stringify(d)); }
function getWorkoutHistory(){ return JSON.parse(localStorage.getItem(WORKOUT_HISTORY_KEY) || '[]'); }
function setWorkoutHistory(d){ localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(d)); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function baseExercise(label){ return label.replace(/\s+\d+x\d+$/,'').replace(/\s+x\d+$/,'').replace(/\s+rounds$/,''); }
function linkForExercise(label){ return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(baseExercise(label) + ' proper form'); }
function metaForExercise(label){ return EXERCISE_META[baseExercise(label)] || {icon:'🎬', cue:'See example link for form.', sets:'1', reps:'work', rest:60}; }
function calculateReadiness(entry){ if(!entry) return 0; const protein=Math.min(Number(entry.protein||0)/190,1)*25; const steps=Math.min(Number(entry.steps||0)/8000,1)*20; const energy=(Math.min(Number(entry.energy||0),10)/10)*20; const back=((10-Math.min(Number(entry.backPain||0),10))/10)*17.5; const knee=((10-Math.min(Number(entry.kneePain||0),10))/10)*17.5; return Math.round(protein+steps+energy+back+knee); }
function coachMessage(entry, readiness){ if(!entry) return 'Start by saving your first check-in.'; const back=Number(entry.backPain||0), knee=Number(entry.kneePain||0); if(back>=6) return 'Back is flaring up. Use Back-Safe Travel Day or rehab only. Skip heavy hinges today.'; if(knee>=6) return 'Knee is talking. Replace step-ups with curls, lighter leg press, and extra walking.'; if(readiness>=80) return 'Green light. Push the main lift hard today and finish with carries or incline walking.'; if(readiness>=65) return 'Solid day. Hit the full session, but leave 1–2 reps in reserve on each set.'; return 'Recovery emphasis. Do the warm-up, shorter lift, and focus on protein, water, and steps.'; }
function activateTab(name){ els.tabs.forEach(t=>t.classList.toggle('active', t.dataset.tab===name)); els.panels.forEach(p=>p.classList.toggle('active', p.id===name)); }
function avg(arr,key){ const vals=arr.map(x=>Number(x[key]||0)).filter(v=>!Number.isNaN(v)&&v>0); if(!vals.length) return 0; return Math.round((vals.reduce((a,b)=>a+b,0)/vals.length)*10)/10; }
function latestEntry(data){ if(!data.length) return null; return [...data].sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0]; }
function updateSummary(checkins){ const last30=[...checkins].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-30); const workoutHistory=getWorkoutHistory(); els.sumEntries.textContent=checkins.length; els.sumProtein.textContent=avg(last30,'protein'); els.sumSteps.textContent=Math.round(avg(last30,'steps')); els.sumWorkouts.textContent=workoutHistory.length; els.entryCountFooter.textContent=`${checkins.length} Entr${checkins.length===1?'y':'ies'}`; }
function updateHome(checkins){ const entry=latestEntry(checkins), readiness=calculateReadiness(entry); els.readinessPill.textContent=`${readiness}%`; els.readinessBar.style.width=`${readiness}%`; els.coachMessage.textContent=coachMessage(entry, readiness); els.statWeight.textContent=entry?.weight?`${entry.weight} lb`:'--'; els.statWaist.textContent=entry?.waist?`${entry.waist} in`:'--'; els.statProtein.textContent=entry?.protein?`${entry.protein} g`:'--'; els.statSteps.textContent=entry?.steps?`${entry.steps}`:'--'; }
function drawLineChart(canvas,data,key,color){ const ctx=canvas.getContext('2d'); const width=canvas.clientWidth, height=canvas.clientHeight; canvas.width=width*devicePixelRatio; canvas.height=height*devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); ctx.clearRect(0,0,width,height); ctx.fillStyle='rgba(255,255,255,0.02)'; ctx.fillRect(0,0,width,height); const sorted=[...data].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-10); const vals=sorted.map(d=>Number(d[key]||0)).filter(v=>!Number.isNaN(v)&&v>0); if(!vals.length){ ctx.fillStyle='#94a3b8'; ctx.font='14px -apple-system, sans-serif'; ctx.fillText('No data yet',16,28); return; } const min=Math.min(...vals), max=Math.max(...vals), range=Math.max(max-min,1); ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; for(let i=0;i<4;i++){ const y=20+(height-40)*(i/3); ctx.beginPath(); ctx.moveTo(10,y); ctx.lineTo(width-10,y); ctx.stroke(); } ctx.strokeStyle=color; ctx.lineWidth=3; ctx.beginPath(); sorted.forEach((d,i)=>{ const v=Number(d[key]||0); const x=16+((width-32)*(sorted.length===1?0.5:i/(sorted.length-1))); const y=height-18-(((v-min)/range)*(height-40)); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.stroke(); }
function renderCheckinHistory(checkins){ const sorted=[...checkins].sort((a,b)=>(b.date||'').localeCompare(a.date||'')); if(!sorted.length){ els.entryList.innerHTML='<div class="rule">No entries saved yet. Use Track to add your first check-in.</div>'; return; } els.entryList.innerHTML=sorted.map((entry,idx)=>{ const readiness=calculateReadiness(entry); return `<div class="entry-item"><div class="entry-top"><div><div class="session-title" style="font-size:18px">${entry.date||'No date'}</div><div class="muted">Readiness ${readiness}%</div></div></div><div class="entry-meta"><div class="meta-chip">Weight: ${entry.weight||'--'} lb</div><div class="meta-chip">Waist: ${entry.waist||'--'} in</div><div class="meta-chip">Protein: ${entry.protein||'--'} g</div><div class="meta-chip">Steps: ${entry.steps||'--'}</div><div class="meta-chip">Back: ${entry.backPain||'--'}/10</div><div class="meta-chip">Knee: ${entry.kneePain||'--'}/10</div><div class="meta-chip">Energy: ${entry.energy||'--'}/10</div></div>${entry.notes?`<div class="entry-note">${entry.notes}</div>`:''}<div class="entry-actions"><button class="delete-btn" type="button" data-index="${idx}">Delete</button></div></div>`; }).join(''); document.querySelectorAll('.delete-btn').forEach(btn=>btn.addEventListener('click',()=>deleteCheckin(btn.dataset.index))); }
function renderWorkoutHistory(){ const history=[...getWorkoutHistory()].sort((a,b)=>(b.completedAt||'').localeCompare(a.completedAt||'')); if(!history.length){ els.workoutHistoryList.innerHTML='<div class="rule">No completed workouts yet. Start a session from Train or Travel.</div>'; return; } els.workoutHistoryList.innerHTML=history.map(item=>`<div class="entry-item"><div class="entry-top"><div><div class="session-title" style="font-size:18px">${item.name}</div><div class="muted">${item.date}</div></div><div class="badge">${item.completed}/${item.total}</div></div><div class="entry-note">Completed exercises: ${item.exerciseNames.join(', ')}</div></div>`).join(''); }
function deleteCheckin(sortedIndex){ const data=getCheckins(); const sorted=[...data].sort((a,b)=>(b.date||'').localeCompare(a.date||'')); const target=sorted[sortedIndex]; let removed=false; const next=data.filter(item=>{ if(!removed&&item.date===target.date&&item.weight==target.weight&&item.steps==target.steps&&item.protein==target.protein&&item.notes==target.notes){ removed=true; return false; } return true; }); setCheckins(next); refreshAll(); }
function exportData(){ const payload={checkins:getCheckins(), workouts:getWorkoutHistory()}; const blob=new Blob([JSON.stringify(payload,null,2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='ccc_v43_data.json'; a.click(); URL.revokeObjectURL(url); }
function clearForm(){ els.date.value=todayISO(); ['weight','waist','protein','steps','backPain','kneePain','energy','notes'].forEach(id=>els[id].value=''); els.saveStatus.textContent=''; }
function saveCheckIn(){ const entry={date:els.date.value||todayISO(), weight:els.weight.value, waist:els.waist.value, protein:els.protein.value, steps:els.steps.value, backPain:els.backPain.value, kneePain:els.kneePain.value, energy:els.energy.value, notes:els.notes.value}; const data=getCheckins(); data.push(entry); setCheckins(data); els.saveStatus.textContent=`Saved ${entry.date} on this device at ${new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}.`; refreshAll(); }
function workoutCard(item, sourceType='home', travelKey=''){ const hero=baseExercise(item.plan[0]); const meta=metaForExercise(hero); const links=item.plan.map(step=>`<a class="example-link" target="_blank" rel="noopener noreferrer" href="${linkForExercise(step)}">▶ ${baseExercise(step)}</a>`).join(''); const attr=`data-source="${sourceType}" data-key="${travelKey}" data-name="${item.name}"`; return `<div class="workout-card"><div class="workout-media"><div class="thumb">${meta.icon}</div><div><div class="workout-top"><div><div class="session-title" style="font-size:20px">${item.name}</div><div class="muted">${item.focus}</div></div><div class="badge">${item.duration}</div></div><div class="field-help">${meta.cue}</div></div></div>${item.plan.map(step=>`<div class="plan-step">${step}</div>`).join('')}<div class="link-row"><a class="example-link primary" target="_blank" rel="noopener noreferrer" href="${linkForExercise(hero)}">▶ Watch Main Exercise</a>${links}</div><button class="btn btn-gold start-session-btn" ${attr} type="button" style="margin-top:12px;">Start Session</button></div>`; }
function renderTrain(){ els.trainList.innerHTML=workouts.home.map(item=>workoutCard(item,'home','')).join(''); bindSessionButtons(); }
function renderTravel(mode){ els.travelList.innerHTML=workoutCard(workouts.travel[mode],'travel',mode); bindSessionButtons(); }
function parseExercise(step){ const clean=baseExercise(step); const meta=metaForExercise(clean); return {name:clean, icon:meta.icon, cue:meta.cue, sets:meta.sets, reps:meta.reps, rest:meta.rest, link:linkForExercise(clean)}; }
function startSession(workoutName, planSteps){ currentSession={name:workoutName, exercises:planSteps.map(parseExercise), index:0, completed:[], startedAt:new Date().toISOString()}; els.sessionEmpty.classList.add('hidden'); els.sessionPanel.classList.remove('hidden'); activateTab('train'); updateSessionUI(); }
function updateSessionUI(){ if(!currentSession) return; const ex=currentSession.exercises[currentSession.index]; els.sessionWorkoutName.textContent=currentSession.name; els.sessionProgress.textContent=`${currentSession.index+1} / ${currentSession.exercises.length}`; els.sessionIcon.textContent=ex.icon; els.sessionExerciseName.textContent=ex.name; els.sessionCue.textContent=ex.cue; els.sessionWatchLink.href=ex.link; els.sessionTarget.textContent=`${ex.sets} x ${ex.reps}`; restRemaining=ex.rest||60; els.restSecondsDisplay.textContent=`${restRemaining}s`; updateRestDisplay(); els.sessionStatus.textContent=`Completed: ${currentSession.completed.length}`; }
function updateRestDisplay(){ const m=String(Math.floor(restRemaining/60)).padStart(2,'0'); const s=String(restRemaining%60).padStart(2,'0'); els.restTimerDisplay.textContent=`${m}:${s}`; }
function startRestTimer(){ clearInterval(restInterval); restInterval=setInterval(()=>{ if(restRemaining>0){ restRemaining--; updateRestDisplay(); } else { clearInterval(restInterval); els.sessionStatus.textContent='Rest done. Start next set or mark exercise complete.'; } },1000); }
function resetRestTimer(){ if(!currentSession) return; clearInterval(restInterval); restRemaining=currentSession.exercises[currentSession.index].rest||60; updateRestDisplay(); }
function advanceExercise(skipped=false){ if(!currentSession) return; const ex=currentSession.exercises[currentSession.index]; currentSession.completed.push({name:ex.name, skipped}); if(currentSession.index<currentSession.exercises.length-1){ currentSession.index += 1; updateSessionUI(); els.sessionStatus.textContent=skipped?`Skipped ${ex.name}.`:`Completed ${ex.name}.`; } else { finishWorkout(); } }
function finishWorkout(){ if(!currentSession) return; clearInterval(restInterval); const history=getWorkoutHistory(); history.push({name:currentSession.name, date:todayISO(), completedAt:new Date().toISOString(), total:currentSession.exercises.length, completed:currentSession.completed.filter(x=>!x.skipped).length, exerciseNames:currentSession.completed.filter(x=>!x.skipped).map(x=>x.name)}); setWorkoutHistory(history); els.sessionStatus.textContent=`Workout complete: ${currentSession.name}`; currentSession=null; els.sessionPanel.classList.add('hidden'); els.sessionEmpty.classList.remove('hidden'); refreshAll(); }
function bindSessionButtons(){ document.querySelectorAll('.start-session-btn').forEach(btn=>{ btn.addEventListener('click', ()=>{ let item=null; if(btn.dataset.source==='home'){ item=workouts.home.find(w=>w.name===btn.dataset.name); } else { item=workouts.travel[btn.dataset.key]; } if(item) startSession(item.name, item.plan); }); }); }
function refreshAll(){ const checkins=getCheckins(); updateHome(checkins); updateSummary(checkins); renderCheckinHistory(checkins); renderWorkoutHistory(); drawLineChart(els.miniChart, checkins, 'weight', '#f59e0b'); drawLineChart(els.historyChart, checkins, 'weight', '#34d399'); }

els.tabs.forEach(tab=>tab.addEventListener('click', ()=>activateTab(tab.dataset.tab)));
els.travelSelect.addEventListener('change', e=>renderTravel(e.target.value));
els.saveBtn.addEventListener('click', saveCheckIn);
els.clearFormBtn.addEventListener('click', clearForm);
els.exportBtn.addEventListener('click', exportData);
els.deleteAllBtn.addEventListener('click', ()=>{ if(confirm('Delete all saved entries on this device?')){ setCheckins([]); setWorkoutHistory([]); refreshAll(); } });
els.doneExerciseBtn.addEventListener('click', ()=>advanceExercise(false));
els.skipExerciseBtn.addEventListener('click', ()=>advanceExercise(true));
els.startRestBtn.addEventListener('click', startRestTimer);
els.resetRestBtn.addEventListener('click', resetRestTimer);
els.finishWorkoutBtn.addEventListener('click', finishWorkout);
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click', ()=>{ const target=$(btn.dataset.fill); if(target) target.value=btn.dataset.value; }));

els.date.value=todayISO();
renderTrain();
renderTravel('hotel');
refreshAll();
