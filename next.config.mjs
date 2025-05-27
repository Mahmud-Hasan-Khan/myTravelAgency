// next.config.mjs
export default {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            }
        ],
    },

};
