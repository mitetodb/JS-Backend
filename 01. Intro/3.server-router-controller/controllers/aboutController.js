const html = `
<html>
<head>
    <title>My Page - About</title>
</head>
<body>
    <div>
        <h1>About Us</h1>
        <p>Here you can find more information about us...</p>
    </div>
</body>
</html>`;

module.exports = (req, res) => {
    res.write(html);
    res.end();
};