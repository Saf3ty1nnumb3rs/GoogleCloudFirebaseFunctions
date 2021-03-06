const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
    if(!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' });
    }
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    admin.auth().getUser(phone)
    .then(userRecord => {
        //creating code - 4 digit number between 1000 and 9999
        const code = Math.floor((Math.random() * 8999 + 1000));
        // generating a text message
        twilio.messages.create({
            body: `Your code is ${code}`,
            from: '+17069956752',
            to: phone
        }, (err) => {
            if(err) { return res.status(422).send(err); }
            // updating the database with a user and code
            admin.database().ref(`users/${phone}`)
            .update({ code: code, codeValid: true }, () => {
                res.send({ success: true });
            });
        })
    })
    .catch((err) => {
        res.status(422).send({ error: err })
    });
}