!function(){var t,n={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};function e(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}n.startBtn.addEventListener("click",(function(o){if(t)return;n.startBtn.disabled=!0,n.stopBtn.disabled=!1,document.body.style.backgroundColor=e(),t=setInterval((function(){document.body.style.backgroundColor=e()}),1e3)})),n.stopBtn.addEventListener("click",(function(){clearInterval(t),t=null,n.startBtn.disabled=!1,n.stopBtn.disabled=!0})),n.stopBtn.disabled=!0}();
//# sourceMappingURL=01-color-switcher.914a6fa0.js.map
