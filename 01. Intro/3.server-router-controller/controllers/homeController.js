const homePage = `
<html>
<head>
    <title>My Page - Home</title>
</head>
<body>
    <div>
        <h1>My Page</h1>
        <p>Welcome to my home page!</p>
    </div>
</body>
</html>`;

module.exports = (req, res) => {
    res.write(homePage);
    res.end();
};