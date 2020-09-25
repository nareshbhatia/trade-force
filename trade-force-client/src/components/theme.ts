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
            buyActionForm: string;
            sellActionForm: string;
            buyText: string;
            sellText: string;
            buyLegend: string;
            sellLegend: string;
        };
    }

    interface PaletteOptions {
        business: {
            buyBackground: string;
            sellBackground: string;
            buyAction: string;
            sellAction: string;
            buyActionForm: string;
            sellActionForm: string;
            buyText: string;
            sellText: string;
            buyLegend: string;
            sellLegend: string;
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
            buyActionForm: '#4D896D',
            sellActionForm: '#B35F00',
            buyText: '#80B79D',
            sellText: '#E57A00',
            buyLegend: '#66A989',
            sellLegend: '#FCAF17',
        },
        type: 'dark' as PaletteType,
    };

    return createMuiTheme({ palette });
};

export const theme = createTheme();
