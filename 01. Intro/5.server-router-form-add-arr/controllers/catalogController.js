const layout = require('../views/layout');
const database = require('../util/database');

const html = (items) => `
<h1>Catalog</h1>

<form method="POST" action="/create">
    <label>Name <input type="text" name="name"></label>
    <label>S/N <input type="text" name="serial"></label>
    <input type="submit" value="Create Item">
</form>

<ul>
    ${items.map(i => `<li>${i.name} - ${i.serial}</li>`).join('')}
</ul>`;

module.exports = (req, res) => {
    res.write(layout(html(database), 'Catalog'));
    res.end();
};