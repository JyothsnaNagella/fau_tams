const express = require('express');
const path = require('path'); // Used to resolve file paths
const router = express.Router();
const Application = require('../models/application');

// Serve the PDF file for a specific applicant
router.get('/resume/:id', (req, res) => {
    const applicationID = req.params.id;

    // Retrieve the resume path based on the application ID
    Application.getResumePath(applicationID, (err, result) => {
        if (err) {
            console.error('Error getting resume path:', err);
            return res.status(500).send('Error getting resume');
        }
        if (!result) {
            return res.status(404).send('Resume not found');
        }

        const resumePath = path.join(__dirname, '..', result[0].resume);

        res.sendFile(resumePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(404).send('Resume not found');
            }
        });
    })


    /*

    // Assume the file is named based on the applicant_id and is located in the "uploads" directory
    const resumePath = path.join(__dirname, '..', 'uploads', `1733670029086-JyothsnaNagellaResume.pdf`);

    // Check if the file exists
    res.sendFile(resumePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            return res.status(404).send('Resume not found');
        }
    });*/
});

// Existing routes
router.get('/', (req, res) => {
    Application.getAllPending((err, result) => {
        if (err) {
            console.error('Error getting applications:', err);
            return res.status(500).send('Error getting applications');
        }
        res.status(200).json(result);
    });
});

router.put('/recommend/:id', (req, res) => {
    const applicationId = req.params.id;
    Application.recommendApplication(applicationId, (err, result) => {
        if (err) {
            console.error('Error recommending application:', err);
            return res.status(500).send('Error recommending application');
        }
        res.status(200).send('Application recommended successfully');
    });
});

router.put('/deny/:id', (req, res) => {
    const applicationId = req.params.id;
    Application.rejectApplication(applicationId, (err, result) => { 
        if (err) {
            console.error('Error denying application:', err);
            return res.status(500).send('Error denying application');
        }
        res.status(200).send('Application denied successfully');
    });
});

module.exports = router;
