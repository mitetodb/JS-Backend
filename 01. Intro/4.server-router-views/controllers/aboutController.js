const layout = require('../views/layout');

const html = `
    <h1>About Us</h1>
    <p>Here you can find more information about us...</p>`;

module.exports = (req, res) => {
    res.write(layout(html, 'About'));
    res.end();
};