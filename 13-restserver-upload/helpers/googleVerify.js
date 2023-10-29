
// imports
const { OAuth2Client } = require( 'google-auth-library' );


// client
const client = new OAuth2Client( process.env.GOOGLE_CLIENT );


// googleVerify
const googleVerify = async( google_token = '' ) => {

    const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT,
    });
    const { name, picture, email } = ticket.getPayload();
    return {
        nombre: name,
        img: picture,
        correo: email
    };

};


// exports
module.exports = googleVerify