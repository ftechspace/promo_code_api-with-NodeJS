const moment = require('moment');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary')

// MODELS
const BodyMeasurement = require('../models/bodyMeasurement');

// CONTROLLERS
exports.createbodyMeasurement = (req, res, next) => {
    const bodyMeasurement = new BodyMeasurement({
        _id: new mongoose.Types.ObjectId,
        author: req.body.userId,
        neck_around: req.body.neck_around,
        sleeve_length: req.body.sleeve_length,
        shoulder_width: req.body.shoulder_width,
        bicep_around: req.body.bicep_around,
        wrist_around: req.body.wrist_around,
        chest_around: req.body.chest_around,
        shirt_length: req.body.shirt_length,
        hips: req.body.hips,
        abdomen: req.body.abdomen,
        thigh: req.body.thigh,
        knee: req.body.knee,
        calf: req.body.calf,
        instep: req.body.instep,
        waist_to_ankle: req.body.waist_to_ankle,
        waist_to_knee: req.body.waist_to_knee,
        crotch_length: req.body.crotch_length,
        crotch_depth: req.body.crotch_depth,
        foot_size: req.body.foot_size,
    });
    // console.log(bodyMeasurement)
    bodyMeasurement.save()
        .then(result => {
            res.status(201).json({
                message: 'BodyMeasurement created',
                results: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.allBodyMeasurement = (req, res, next) => {
    BodyMeasurement.find()
        .sort({
            date: "desc"
        })
        .populate('author')
        .then(results => {
            res.status(200).json({
                message: 'List of Body Measurement',
                results: results
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Body Measurements could not quiry',
                error: err
            })
        })
}

exports.measurementUpdate = (req, res, next) => {
    const _id = req.params.measurementId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    BodyMeasurement.update({
            _id: _id
        }, {
            $set: updateOps
        })
        .then(result => {
            res.status(200).json({
                message: 'measurement has been updated',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}