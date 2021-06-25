const jwt = require('jsonwebtoken');

const payload = { message: 'Hi!' };
const secret = 'my-secret-key';

const token = jwt.sign(payload, secret, { expiresIn: '2d' });

console.log(token);

const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGkhIiwiaWF0IjoxNjI0NjU2MjczLCJleHAiOjE2MjQ4MjkwNzN9.p1czgu68zZ56nx-b0hMvGeDfuQ4uJXCnDEVwOxEyN7w';

console.log(jwt.decode(myToken));

console.log(jwt.verify(myToken, secret));
