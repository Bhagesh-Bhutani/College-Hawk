module.exports.getFaceDetectionPage = function(req, res) {
    return res.render('face_detection', {
        title: 'College Hawk | Face Detector'
    });
};