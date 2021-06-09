const layout = require('../views/layout');

const html = `
<h1>Catalog</h1>
<ul>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ul>`;

module.exports = (req, res) => {
    res.write(layout(html));
    res.end();
};