// This function calculates the initials from a full name.
export const getInitials = (fullName) => {
  // If no name is provided, return an empty string.
  if (!fullName) return "";

  // Split the full name into words by spaces.
  const words = fullName.split(" ");
  let initials = "";

  // If there's at least one word, take the first letter of the first word.
  if (words.length > 0) {
    initials += words[0][0];
  }

  // If there's more than one word, take the first letter of the last word.
  if (words.length > 1) {
    initials += words[words.length - 1][0];
  }

  // Return the initials in uppercase.
  return initials.toUpperCase();
};

// You might also have your validateEmail function here
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};