function save(){localStorage.setItem('ccc_weight',document.getElementById('weight').value);
localStorage.setItem('ccc_protein',document.getElementById('protein').value);
document.getElementById('msg').innerText='Saved on this phone.';}
window.onload=function(){
document.getElementById('weight').value=localStorage.getItem('ccc_weight')||'';
document.getElementById('protein').value=localStorage.getItem('ccc_protein')||'';
}