function sendTerminalData() {
  var terminalValue = sendValue.value;
  bt.sendData(terminalValue);
  div = document.createElement('div');
  div.classList.add("terminal-sent");
  div.innerHTML = terminalValue;
  resultDiv.insertBefore(div, space);
  resultDiv.scrollTop = resultDiv.scrollHeight;
}
