const instructions = [
  [/.{0,}\(\)/g, m => m.substring (1, m.length - 2)],
  [/local (.*)\=/g, m => m.substring (6).split ('=')[0]],
];

const uglify = script => {
  const replacers = [];
  let count = 0;

  instructions.forEach (instruction => {
    const [regex, stripper] = instruction;
    script.match (regex).forEach (match => {
      const key = stripper (match);
      const value = `a${count}`;
      count++;
      replacers.push ([key, value]);
    });
  });

  replacers.sort ((a, b) => {
    return -(a[0].length - b[0].length);
  });

  replacers.map (([word, sub]) => {
    const reg = RegExp (`${word}`, 'g');
    script = script.replace (reg, sub);
  });

  return script;
};

module.exports = uglify;
