export const WindowEnv = jest.fn(() => {
    return {
        get: (varName: string): string => {
            switch (varName) {
                case 'API_URL': {
                    return 'http://localhost:8080';
                }
                default: {
                    return '';
                }
            }
        },
    };
});
