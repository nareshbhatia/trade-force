import { createMuiTheme, PaletteType } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
    interface TypeBackground {
        panel: string;
        content: string;
    }

    interface TypeText {
        muted: string;
        normal: string;
        emphasis: string;
    }

    interface Palette {
        business: {
            buyBackground: string;
            sellBackground: string;
            buyAction: string;
            sellAction: string;
            buyActionAlt: string;
            sellActionAlt: string;
            buyText: string;
            sellText: string;
        };
    }

    interface PaletteOptions {
        business: {
            buyBackground: string;
            sellBackground: string;
            buyAction: string;
            sellAction: string;
            buyActionAlt: string;
            sellActionAlt: string;
            buyText: string;
            sellText: string;
        };
    }
}

const createTheme = () => {
    const palette = {
        primary: {
            main: '#25617F',
        },
        secondary: {
            main: '#F2D200',
        },
        error: {
            main: '#D90000',
        },
        background: {
            panel: '#383838',
            content: '#404040',
        },
        text: {
            muted: '#808080',
            normal: '#D9D9D9',
            emphasis: '#FFFFFF',
        },
        business: {
            buyBackground: '#2C4C3D',
            sellBackground: '#4C3E2E',
            buyAction: '#004734',
            sellAction: '#7A2F18',
            buyActionAlt: '#4D896D',
            sellActionAlt: '#B35F00',
            buyText: '#009951',
            sellText: '#E57A00',
        },
        type: 'dark' as PaletteType,
    };

    return createMuiTheme({ palette });
};

export const theme = createTheme();
