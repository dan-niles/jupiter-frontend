const prod = {
    url: {
        BASE_URL: 'https://0a80b035-7733-4435-889e-6898c7dc5bd8.e1-us-east-azure.choreoapps.dev'
    },
};

const dev = {
    url: {
        BASE_URL: 'https://0a80b035-7733-4435-889e-6898c7dc5bd8.e1-us-east-azure.choreoapps.dev'
    },
};


export const config = process.env.NODE_ENV === 'development' ? dev : prod;