const AppController = {

    getCfg : (req, res) => {
        let resp = {
            oi: 12345,
            in: req.body
        };

        res.end(JSON.stringify(resp, null, 2))
    },


};

module.exports =  AppController;