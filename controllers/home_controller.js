// Route: /

module.exports.getHomePage = function(req, res){
    return res.render('home', {
        title: 'College Hawk'
    });
};