export const useValidation = () => {

    const validate = (schema, data) => {
        const result = schema.safeParse(data);

        if (!result.success) {
            return {
                valid: false,
                message:
                    result.error.issues[0]?.message
            };
        }

        return {
            valid: true,
            message: null
        };
    };

    return { validate };
};