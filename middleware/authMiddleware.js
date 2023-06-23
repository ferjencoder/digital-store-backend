
export const isAdmin = ( req, res, next ) => {
    // Check if the user is an admin
    // Replace this with your own logic to validate the user's role
    const isAdminUser = true; // Example: assuming the user is an admin

    if ( isAdminUser ) {
        // If the user is an admin, allow access to the next middleware or route handler
        next();
    } else {
        // If the user is not an admin, send an error response
        res.status( 403 ).send( 'Access denied' );
    }
};

export const isEmployee = ( req, res, next ) => {
    // Check if the user is an employee
    // Replace this with your own logic to validate the user's role
    const isEmployeeUser = true; // Example: assuming the user is an employee

    if ( isEmployeeUser ) {
        // If the user is an employee, allow access to the next middleware or route handler
        next();
    } else {
        // If the user is not an employee, send an error response
        res.status( 403 ).send( 'Access denied' );
    }
};

export const isUser = ( req, res, next ) => {
    // Check if the user is a regular user
    // Replace this with your own logic to validate the user's role
    const isRegularUser = true; // Example: assuming the user is a regular user

    if ( isRegularUser ) {
        // If the user is a regular user, allow access to the next middleware or route handler
        next();
    } else {
        // If the user is not a regular user, send an error response
        res.status( 403 ).send( 'Access denied' );
    }
};
