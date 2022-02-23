const Contact = require('../models/Contact');

module.exports = async (req, res) => {

    const { cfname, cfemail, cfmessage } = req.body;

    if (!cfname || !cfemail || !cfmessage){
        res.status(400).json({
            error: "Bad request",
            ip: req.ip
        });

        return;
    }

    if (typeof cfname != "string" || typeof cfemail != "string" || typeof cfmessage != "string"){
        res.status(400).json({
            error: "Bad request",
            ip: req.ip
        });

        return;
    }

    if (cfname == "" || cfemail == "" || cfmessage == ""){
        res.status(400).json({
            error: "Bad request",
            ip: req.ip
        });

        return;
    }

    let contact = new Contact();

    contact.name = cfname;
    contact.email = cfemail;
    contact.message = cfmessage;

    try {
        await contact.save();

        // req.session
        res.redirect('/home');
        return;
    } catch (e){
        res.status(500).json({
            error: "Failed to save to DB",
            ip: req.ip
        });

        return;
    }
}