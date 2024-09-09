import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	private users = [
		{
			id: 1,
			name: 'Leanne Graham',
			email: 'Sincere@april.biz',
			role: 'INTERN'
		},
		{
			id: 2,
			name: 'Ervin Howell',
			email: 'Shanna@melissa.tv',
			role: 'INTERN'
		},
		{
			id: 3,
			name: 'Clementine Bauch',
			email: 'Nathan@yesenia.net',
			role: 'ENGINEER'
		},
		{
			id: 4,
			name: 'Patricia Lebsack',
			email: 'Julianne.OConner@kory.org',
			role: 'ENGINEER'
		},
		{
			id: 5,
			name: 'Chelsey Dietrich',
			email: 'Lucio_Hettinger@annie.ca',
			role: 'ADMIN'
		}
	];

	findUsers(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
		if (role) {
			const found = this.users.filter((user) => user.role == role);
			if (!found.length) {
				throw new NotFoundException(
					`Users with role ${role} not found!`
				);
			}
			return found;
		}
		return this.users;
	}

	findUser(id: number) {
		const user = this.users.find((user) => user.id == id);

		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	addUser(createUserDto: CreateUserDto) {
		const existingUsers = [...this.users];
		const obj = {
			id: existingUsers.length + 1,
			...createUserDto
		};
		this.users.push(obj);
		return this.findUser(obj.id);
	}

	updateUser(id: number, updateUserDto: UpdateUserDto) {
		const user = this.findUser(id);
		if (user) {
			this.users = this.users.map((user) => {
				if (user.id === id) {
					return { ...user, ...updateUserDto };
				}
				return user;
			});
			return this.findUser(id);
		}
	}

	deleteUser(id: number) {
		const user = this.findUser(id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
			return user;
		}
		return id;
	}
}
