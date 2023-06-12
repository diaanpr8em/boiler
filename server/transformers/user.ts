import { User, UserSecurity } from "@prisma/client";

type UserType = User & {
	UserSecurity: UserSecurity | null;
}

export const userTransform = (user: UserType) => {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}
}