const Joi = require("joi");
const jwt = require("jsonwebtoken");
const registerUser = require("../../controllers/authentication/register");
const authUser = require("../../models/authUser");


jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

jest.mock("../../models/authUser", () => ({
    findOne: jest.fn(),
}));

describe("register user", () => {
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
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a validation error if request body is invalid", async () => {

        req.body = {};

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);

        expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
    });

    it("should return a validation error for email", async () => {

        req.body.email = "asdn.com"

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);

        expect(res.json).toHaveBeenCalledWith({ message: "\"email\" must be a valid email" });
    });

    it("should return a message already registered and status code 401", async () => {

        authUser.findOne.mockResolvedValue( req );

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.send).toHaveBeenCalledWith({ message: "user already exists", success: false });

    });



})