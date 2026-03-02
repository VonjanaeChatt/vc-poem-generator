function generatePoem(event){
    event.preventDefault();
    alert("Generating poem...");


new Typewriter('#poem', {
  strings: ['Roses are red, violets are blue,I will always, love only you....'],
  autoStart: true,
  delay: 1,
  cursor: ""
});  
}



let poemFormElement = document.querySelector("#poem-form");
poemFormElement.addEventListener('submit',generatePoem);