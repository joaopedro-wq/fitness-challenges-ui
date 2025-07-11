const fs = require('fs');
const path = require('path');
const less = require('less');

const themes = [
  { input: 'src/theme.less', output: 'src/assets/theme.css' },
  { input: 'src/theme-dark.less', output: 'src/assets/theme-dark.css' },
];

themes.forEach(({ input, output }) => {
  const lessContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');

  less.render(lessContent, {
    javascriptEnabled: true,
    paths: [path.resolve(__dirname, 'node_modules')],
  }).then(outputCss => {
    fs.writeFileSync(path.resolve(__dirname, output), outputCss.css);
    console.log(`✅ Theme compiled: ${output}`);
  }).catch(err => {
    console.error(`❌ Error compiling ${input}:`, err);
  });
});
