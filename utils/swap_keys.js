exports.swapKeys = (input, keyToChange, newKey) => {
  let newInput = input.map(item => {
    const { [keyToChange]: oldKey, ...input } = item;
    return { [newKey]: oldKey, ...input };
  });
  return newInput;
};
