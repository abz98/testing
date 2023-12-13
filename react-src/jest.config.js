module.exports = {
    testEnvironment: 'node',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "node_modules/axios/index.js": "commonjs"
    },
};

