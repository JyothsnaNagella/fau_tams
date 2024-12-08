const express = require('express');
const path = require('path'); // Used to resolve file paths
const router = express.Router();
const Application = require('../models/application');


router.put('/approve/:id', (req, res) => {
    const applicationId = req.params.id;
    Application.approveApplication(applicationId, (err, result) => {
        if (err) {
            console.error('Error approving application:', err);
            return res.status(500).send('Error approving application');
        }
        res.status(200).send('Application approved successfully');
    });
});
router.put('/reject/:id', (req, res) => {
    const applicationId = req.params.id;
    Application.rejectApplication(applicationId, (err, result) => {
        if (err) {
            console.error('Error rejecting application:', err);
            return res.status(500).send('Error rejecting application');
        }
        res.status(200).send('Application rejected successfully');
    });
});

// Get all recommended applications
router.get('/recommended', (req, res) => {
    Application.getAllRecommended((err, result) => {
        if (err) {
            console.error('Error getting recommended applications:', err);
            return res.status(500).send('Error getting recommended applications');
        }
        res.status(200).json(result);
    });
});

module.exports = router;
