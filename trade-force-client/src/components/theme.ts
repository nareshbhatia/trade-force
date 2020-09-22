import { createMuiTheme, PaletteType } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

declare module '@material-ui/core/styles/createPalette' {
    interface TypeBackground {
        bg1: string;
        bg2: string;
        bg3: string;
    }

    interface TypeText {
        text1: string;
        text2: string;
        text3: string;
    }

    interface Palette {
        business: {
            buyBackground: string;
            sellBackground: string;
            buyAction: string;
            sellAction: string;
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
            buyText: string;
            sellText: string;
        };
    }
}

const createTheme = () => {
    const palette = {
        primary: {
            main: '#215674',
        },
        secondary: {
            main: '#F0CC00',
        },
        error: {
            main: red.A400,
        },
        background: {
            bg1: '#008080',
            bg2: '#000000',
            bg3: '#383838',
        },
        text: {
            text1: '#000000',
            text2: '#000000',
            text3: '#808080',
        },
        business: {
            buyBackground: '#2c4d3d',
            sellBackground: '#4d3e2e',
            buyAction: '#004734',
            sellAction: '#7a2f18',
            buyText: '#80b79d',
            sellText: '#e57a00',
        },
        type: 'dark' as PaletteType,
    };

    return createMuiTheme({ palette });
};

export const theme = createTheme();
