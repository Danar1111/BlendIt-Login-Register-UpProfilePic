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
            return res.status(400).send({ error: true, message: 'No file uploaded' });
        }

        const userId = req.user.id;

        const [rows] = await db.execute('SELECT profilePic FROM users WHERE id = ?', [userId]);
        const photoUrl = rows[0].profilePic;

        const bucket = storage.bucket(bucketName);

        if (photoUrl){
            const urlParts = photoUrl.split('/');
            const folderName = urlParts[urlParts.length - 2];
            const fileNameUrl = urlParts[urlParts.length - 1];

            const fileDel = bucket.file(`${folderName}/${fileNameUrl}`);
            await fileDel.delete();

            await bucket.deleteFiles({ prefix: `${folderName}/` });
            await db.execute('UPDATE users SET profilePic = NULL WHERE id = ?', [userId]);
        };

        const fileName = `${userId}/profile_picture_${Date.now()}.jpg`;
        const file = bucket.file(fileName);

        await file.save(req.file.buffer, {
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        await db.execute('UPDATE users SET profilePic = ? WHERE id = ?', [publicUrl, userId]);

        res.status(200).send({ error: false, message: 'File uploaded successfully', photoUrl: publicUrl });
    } catch (err) {
        console.error('Error during file upload:', err);
        res.status(500).send({ error: true, message: 'Server error' });
    }
};