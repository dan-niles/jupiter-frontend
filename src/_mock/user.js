import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
	name: faker.name.fullName(),
	company: sample([
		"Sri Lanka",
		"India",
		"Pakistan",
		"Bangladesh",
		"Nepal",
		"Maldives",
	]),
	email: faker.internet.email(
		faker.name.firstName(),
		faker.name.lastName(),
		"jupiter.com"
	),
	isVerified: faker.datatype.boolean(),
	status: sample(["active", "inactive"]),
	role: sample([
		"Leader",
		"Hr Manager",
		"UI Designer",
		"UX Designer",
		"UI/UX Designer",
		"Project Manager",
		"Backend Developer",
		"Full Stack Designer",
		"Front End Developer",
		"Full Stack Developer",
	]),
}));

export default users;
