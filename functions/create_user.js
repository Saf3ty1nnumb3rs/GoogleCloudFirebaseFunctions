const admin = require('firebase-admin');

//Google Cloud function

module.exports = function(req, res) {
    // Verify that the user provided a phone
    if(!req.body.phone) {
        // Validation - 422 error status code
        return res.status(422).send( { error: 'Bad Input' });
    }
    // Format the phone number to remove dashes and parens - String constructor guarantees string
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // Create a new user account using that phone number
    admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }))

    // Respond to the user request, saying the account was made
}