function removeStartingDoubleSlash(text: string) {
  // Check if the string starts with "//" using startsWith()
  text = text.replace('64x64', '128x128');
  if (text.startsWith('//')) {
    // If it does, slice the string starting from the second character (index 2)
    return text.slice(2);
  } else {
    // If it doesn't start with "//", return the original string
    return text;
  }
}

export default removeStartingDoubleSlash;
