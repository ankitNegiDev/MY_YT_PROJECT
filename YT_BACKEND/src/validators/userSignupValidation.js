// validators/userValidator.js
export function validateUserSignup(req, res, next) {
    console.log("user req.body is : ",req.body);
    const { userName, email, password } = req.body;

    // Basic empty checks
    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (userName, email, password) are required.",
        });
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: `Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        });
    }

    // All validations passed
    next();
}

// use this in the route once all project is done . currently it gives lot of problem to singup and signin constantly... include it in routes of user...

