import { removeRefreshToken } from "~/server/db/users/userSecurity"

export default defineEventHandler(async (event) => {
    
    try {
        const cToken = getCookie(event, 'refreshToken')		
        await removeRefreshToken(cToken as string)
    } catch (error) {}

    sendRefreshToken(event, 'null')
    return { success: true }
})