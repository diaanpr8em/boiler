import { UserSecurityBLL } from "~/server/bll/users/userSecurity"

export default defineEventHandler(async (event) => {
    
    try {
        const cToken = getCookie(event, 'refreshToken')		
        await UserSecurityBLL.removeRefreshToken(cToken as string)
    } catch (error) {}

    sendRefreshToken(event, 'null')
    return { success: true }
})