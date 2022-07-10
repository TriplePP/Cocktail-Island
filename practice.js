const nums = ["vodka", "rum", "gin", "beer", "wine"];
const letters = ["a", "b", "c"];

const numLetters = nums.map((e, i) => {
  return [e, letters[i]].join(" ");
});

console.log(numLetters.join(", "));
