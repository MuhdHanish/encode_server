"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import dotenv
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// database connection
const dbConfig_1 = __importDefault(require("./src/framework/database/config/dbConfig"));
// import the route file
const userRoutes_1 = __importDefault(require("./src/interface/routes/userRoutes"));
const tokenRoutes_1 = __importDefault(require("./src/interface/routes/tokenRoutes"));
// creat express application
const app = (0, express_1.default)();
// cors setting
const allowedOrigins = [
    "http://localhost:5173", "http://localhost:4173",
    "http://localhost:3000", "http://localhost:4000",
    process.env.CLIENT_ORIGIN_URL,
    process.env.DISTRIBUTED_ORIGIN_URL,
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
// middleware for json
app.use(express_1.default.json());
// middleware for handle form data
app.use(express_1.default.urlencoded({ extended: true }));
// middleware for log
app.use((0, morgan_1.default)("dev"));
// user route
app.use('/', userRoutes_1.default);
app.use('/refresh/token', tokenRoutes_1.default);
// database connecting & app listen
const port = process.env.PORT || 8000;
(0, dbConfig_1.default)()
    .then((res) => {
    console.log(res);
    const server = app.listen(port, () => console.log(`Server running on port ${port}...`));
    const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
            origin: allowedOrigins,
        },
    });
    io.on("connection", (socket) => {
        socket.on("connect-to-online", (roomId) => {
            socket.join(roomId.toString());
        });
        socket.on("join-to-chat", (roomId) => {
            socket.join(roomId.toString());
        });
        socket.on("new-message", (newMessage) => {
            let chat = newMessage === null || newMessage === void 0 ? void 0 : newMessage.chat;
            if (!(chat === null || chat === void 0 ? void 0 : chat.users)) {
                return;
            }
            chat === null || chat === void 0 ? void 0 : chat.users.forEach((user) => {
                var _a, _b;
                if ((user === null || user === void 0 ? void 0 : user.toString()) === ((_b = (_a = newMessage === null || newMessage === void 0 ? void 0 : newMessage.sender) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString())) {
                    return;
                }
                ;
                socket.to(user.toString()).emit("message-recieved", newMessage);
            });
        });
    });
})
    .catch((error) => console.log(`Failed to connect database`, error));
