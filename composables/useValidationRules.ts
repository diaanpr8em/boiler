type RuleTypes = 'email' | 'password' | 'confirmPassword' | 'required'

export const useValidationRules = (type: RuleTypes, confirmPassword?: string, mesg?: string) => {
    switch (type) {
        case 'email':
            return [
                (value: string) => {
                    if (value) return true
        
                    return 'E-mail is requred.'
                },
                (value: string) => {
                    if (/.+@.+\..+/.test(value)) return true
        
                    return 'E-mail must be valid.'
                },
            ]
        case 'password':
            return [
                (value: string) => {
                    if (value) return true
        
                    return 'Password is requred.'
                },
                (value: string) => {
                    if (value.length >= 8) return true
        
                    return 'Password must be at least 8 characters.'
                }
            ]
        case 'confirmPassword':
            return [
                (value: string) => {
                    if (value) return true
                    return 'Password confirmation is required.'
                },
                (value: string) => {
                    if (value === confirmPassword) return true
                    return 'Password confirmation must match.'
                }
            ]
        case 'required':
            return [
                (value: string) => {
                    if (value) return true
                    return mesg ? mesg : 'This field is required.'
                }
            ]
    }
}