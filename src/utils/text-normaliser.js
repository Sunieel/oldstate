const capitaliseEachWord = name => 
   name.split(' ')
   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
   .join(' ');

export const forDisplay = name => capitaliseEachWord(name);

// export const forUrl = name => encodeURIComponent(name.toLowerCase().replace(/ /g, '-'));

// export const forApi = name => name.replace(/\_/g, ' ');

// remove url speical characters from string
export const forUrl = name => name.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '');