// =========================================================
//                        AGENT JS
// =========================================================

const agentMsgBtn = document.querySelector(".agent-msg");
const agentMsgDisplay = document.querySelector(".msg-agent");
const agentCallBtn = document.querySelector(".agent-call");
const agentCallDisplay = document.querySelector(".voice-agent");
const voiceBackBtn = document.querySelector('.back-btn-voice'); 
const msgBackBtn = document.querySelector('.back-btn-msg'); 
agentCallBtn.addEventListener("click", () => {
    let mains = document.querySelector('.main')
    mains.style.display = "none";
    agentCallDisplay.classList.remove("hidden");
});
agentMsgBtn.addEventListener('click',()=>{
    let mains = document.querySelector('.main')
    mains.style.display = "none";
    agentMsgDisplay.classList.remove("hidden");
});
voiceBackBtn.addEventListener("click", () => {
 const results = document.getElementById("results");
  container.style.display = "block";
  results.style.display = "none";
  agentCallDisplay.classList.add('hidden')
  main.style.display = "block";
});
msgBackBtn.addEventListener("click", () => {
 const results = document.getElementById("results");
  container.style.display = "block";
  results.style.display = "none";
  agentMsgDisplay.classList.add('hidden')
  main.style.display = "block";
});

