import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        height: 100,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.panel,
        color: theme.palette.text.muted,
    },
    title: {
        flex: 1,
        fontFamily: 'Source Sans Pro',
        fontSize: 30,
        fontWeight: theme.typography.fontWeightLight,
    },
    close: {
        marginTop: theme.spacing(1),
    },
}));

export interface PanelHeaderProps {
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
}

export const PanelHeader = ({
    children,
    className,
    showCloseButton = false,
    onClose,
}: PanelHeaderProps) => {
    const classes = useStyles();

    return (
        <div className={`${className} ${classes.root}`}>
            <div className={classes.title}>{children}</div>
            {showCloseButton ? (
                <IconButton
                    className={classes.close}
                    color="inherit"
                    size="small"
                    onClick={onClose}
                    aria-label="Sign Out"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            ) : null}
        </div>
    );
};
