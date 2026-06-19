module.exports = (schema) => {
    return async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body);

        if (!result.success) {
            return res.status(400).json({
                status: "error",
                errors: result.error.issues.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
        }

        req.body = result.data;
        next();
    };
};