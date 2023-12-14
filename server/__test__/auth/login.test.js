const Joi = require("joi");
const jwt = require("jsonwebtoken");
const loginUser = require("../../controllers/authentication/login");
const authUser = require("../../models/authUser");


jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

jest.mock("../../models/authUser", () => ({
    findOne: jest.fn(),
}));

describe("loginUser controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: "test@example.com",
                password: "password123",
            },
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a validation error if request body is invalid", async () => {
        req.body = {};

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);

        expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
    });

    it("should return 401 if user is not registered", async () => {
        authUser.findOne.mockResolvedValue(null);

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: "Register first",
        });
    });

    it("should return token and user data if login is successful", async () => {
        const mockUser = {
            _id: "user_id",
            email: "test@example.com",
            comparePassword: jest.fn((password, callback) =>
                callback(null, true)
            ),
            save: jest.fn(),
        };

        authUser.findOne.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue("mockToken");

        await loginUser(req, res);

        expect(jwt.sign).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            token: "mockToken",
            userData: { email: "test@example.com" },
        });
    });

    it("should return error if login fails due to wrong password", async () => {
        const mockUser = {
            comparePassword: jest.fn((password, callback) =>
                callback(null, false)
            ),
        };

        authUser.findOne.mockResolvedValue(mockUser);

        await loginUser(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Username or password wrong",
        });
    });

    it("should return internal server error with status code of 501", async () => {

        authUser.findOne.mockResolvedValue(new Error("simultate error"));

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(501);


        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error", success: false });
    });

});
