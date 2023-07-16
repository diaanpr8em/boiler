export class BusinessError {
    code: Codes | undefined

    constructor(code: Codes){
        this.code = code;
    }
}

enum Codes {
    E100 = "E-mail address is already in use on the system",
    E101 = "Incorrect email address or password during signin",
    E102 = "Incorrect OTP during signin",
    E103 = "E-mail address has not yet been verified",
    E104 = "The security token has expired or is invalid",
    E105 = "An error occurred during authentication",
    E106 = "Account is locked",
    E107 = "User account is suspended",
    E108 = "Re-captcha has failed",
    E109 = "Record not found",
    E110 = "Model invalid",
    E111 = "Required parameter is missing",
    E199 = "Unhandled error",
    E200 = "Insufficient funds to complete request",
    E201 = "No product found for this service",
    E202 = "No product found matching this id",
    E203 = "No tenant found for this user",
    E204 = "No settings found for this tenant"
}

export {Codes}