const BaseErrors = require("../errors/base.error");

module.exports = (err, req, res, next) => {

    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("===========================");

    if (err instanceof BaseErrors) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}