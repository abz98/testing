const User = require("../../models/user");

// jest.mock("../../models/user", () => ({
//     findOne: jest.fn(),
//     findById: jest.fn(),
//     find: jest.fn(),
// }));

const {
    getOneUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/users');



jest.mock('../../models/user');

describe('User Functions', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getOneUser - should return user by id', async () => {
        const mockUser = { _id: '123', name: 'Test User' };
        User.findById.mockResolvedValue(mockUser);

        const req = { params: { id: '123' } };
        const res = { json: jest.fn() };

        await getOneUser(req, res);

        expect(User.findById).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('getAllUser - should return all users', async () => {
        const mockUsers = [{ _id: '1', name: 'User 1' }, { _id: '2', name: 'User 2' }];
        User.find.mockResolvedValue(mockUsers);

        const res = { json: jest.fn() };

        await getAllUser(null, res);

        expect(User.find).toHaveBeenCalledWith({});
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    test('createUser - should create a new user', async () => {
        const req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                age: '25',
                gender: 'm',
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        User.prototype.save.mockResolvedValue({
            _id: '123',
            name: 'Test User',
            email: 'test@example.com',
            age: 25,
            gender: 'm',
        });

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Successfully added!',
            result: {
                _id: '123',
                name: 'Test User',
                email: 'test@example.com',
                age: 25,
                gender: 'm',
            },
        });
    });

});
