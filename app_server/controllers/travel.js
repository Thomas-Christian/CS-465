const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async (req, res, next) => {
    
    try {
        const response = await fetch(tripsEndpoint, options);
        const json = await response.json();

        let message = null;

        // Check if response is not an array
        if (!(json instanceof Array)) {
                message: 'API Lookup Error';
                json = [];
        };
        
        // Check if array is empty
        if (json.length === 0) {
                message: 'No trips are currently available';
        }

         // Success
         res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
            message
        });

    }

    catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports = {
    travel
};