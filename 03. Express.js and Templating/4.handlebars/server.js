const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    const data = {
        user: {
            username: 'Peter'
        },
        title: 'HomePage',
        name: 'Peter',
        age: 24,
        items: {
            pocket: 'Lint'
        },
        itemsList: [
            'item1',
            'item2',
            'item3',
            'item4'
        ],
        itemsList2: [
            {
                type: 'Lint',
                qty: 5
            },
            {
                type: 'Wallet',
                qty: 1
            },
            {
                type: 'Bubblegum',
                qty: 10
            },
            {
                type: 'Coins',
                qty: 15
            }
        ],
        itemsList3: [

        ],
        itemsList4: [
            {
                type: 'Lint',
                qty: 55
            },
            {
                type: 'Wallet',
                qty: 10
            },
            {
                type: 'Bubblegum',
                qty: 100
            },
            {
                type: 'Coins',
                qty: 150
            }
        ]
    };

    res.render('home', data);
});

app.get('/catalog', (req, res) => {
    res.render('catalog', { products: [
        {
            type: 'Washer',
            qty: 45
        },
        {
            type: 'Bolt 3/8',
            qty: 100
        },
        {
            type: 'Bohrer',
            qty: 1
        }
    ]});
});

app.listen(3000, console.log('Server listening on port 3000 ...'));