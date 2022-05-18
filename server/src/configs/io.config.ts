export const ioConfig = {
    cors: {
        origin: process.env.URL + ':' + process.env.CLIENT_PORT,
        credentials: true
    }
}