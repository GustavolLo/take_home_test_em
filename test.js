var ages = ["state1", "state2", "state3"];

function checkAdult(age) {
  return age === "state2";
}

function myFunction() {
  console.log(ages.findIndex(checkAdult));
}

myFunction();
