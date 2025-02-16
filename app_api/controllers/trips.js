const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {

    const q = await Model.find({}).exec();

    //console.log(q);

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

const tripsFindByCode = async(req, res) => {

    const q = await Model.find({'code': req.params.tripCode}).exec();

    //console.log(q);

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

const tripsAddTrip = async(req, res) => {

    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q) {
            return res
            .status(400)
            .json(err);
        } else {
            return res
            .status(200)
            .json(q);
        }
}

const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
  
    try {
      const q = await Model.findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
        { new: true } // To return the updated document
      ).exec();
  
      if (!q) {
        // Database returned no data
        return res.status(400).json({ message: "Trip not found or failed to update." });
      } else {
        // Return the updated trip
        return res.status(200).json(q);
      }
    } catch (err) {
      // Handle any errors that occur during the update
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  
    // Uncomment the following line to show results of the operation
    // console.log(q);
  };
  

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};