module.exports = validationRequest = (schema) => {
    return async (req, res, next) => {
        const result = schema.safeParseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                errors: result.error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message
                })),
            });
            return;
        }
        req.body = result.data.body;
        req.query = result.data.query;
        req.params = result.data.params

        next();
    }
}