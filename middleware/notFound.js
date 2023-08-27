// middleware for not found messages
function notFound(message) {
    return function (req, res, next) {
        res.status(404).json({ message });
    };
}
module.exports = notFound;