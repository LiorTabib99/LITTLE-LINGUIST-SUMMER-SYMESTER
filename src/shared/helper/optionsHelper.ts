export function generateOptions(
  correctAnswer: string,
  numberOfOptions: number,
  words: string[]
) {
  const options = new Set<string>();

  options.add(correctAnswer);

  const avalibaleWords = words.filter((word) => word !== correctAnswer);

  while (options.size < numberOfOptions) {
    //doubling the number of words and returns
    //the number of words according to the category length
      
    const rendomWord =
      avalibaleWords[Math.floor(Math.random() * avalibaleWords.length)];
    options.add(rendomWord);
  }

  //Array-מערך
  const optionsArray = Array.from(options);

  return shufleArray(optionsArray);
}


//declre a function which return array of questions
// mix with a random order
function shufleArray(array: string[]) {
  for (let i = Array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
