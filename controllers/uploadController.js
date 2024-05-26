const { Storage } = require('@google-cloud/storage');
const path = require('path');
const db = require('../config/db');
require('dotenv').config();

const storage = new Storage({
    keyFilename: path.join(__dirname, '../credentials.json'),
});

const bucketName = process.env.BUCKET_NAME;

exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        const userId = req.user.id;
        const bucket = storage.bucket(bucketName);
        const fileName = `${userId}/profile_picture_${Date.now()}.jpg`;
        const file = bucket.file(fileName);

        await file.save(req.file.buffer, {
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        await db.execute('UPDATE users SET profilePic = ? WHERE id = ?', [publicUrl, userId]);

        res.status(200).send({ message: 'File uploaded successfully', photoUrl: publicUrl });
    } catch (err) {
        console.error('Error during file upload:', err);
        res.status(500).send({ message: 'Server error' });
    }
};
