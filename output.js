var outputElement = document.getElementById("output");
   console.log = function(message) {
      var newLine = document.createElement("p");
      newLine.textContent = message;
      outputElement.appendChild(newLine);
  }
  console.warn = function(message) {
   var newLine = document.createElement("p");
   newLine.textContent = message;
   outputElement.appendChild(newLine);
}
console.error = function(message) {
   var newLine = document.createElement("p");
   newLine.textContent = message;
   outputElement.appendChild(newLine);
}