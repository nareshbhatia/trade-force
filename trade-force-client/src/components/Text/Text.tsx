import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightMedium,
        margin: 0,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: theme.typography.fontWeightRegular,
        margin: 0,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: theme.typography.fontWeightMedium,
        margin: 0,
        textTransform: 'uppercase',
    },
}));

export interface TextProps {
    children: React.ReactNode;
    className?: string;
}

export const Title = ({ children, className }: TextProps) => {
    const classes = useStyles();
    return <h1 className={classNames(className, classes.title)}>{children}</h1>;
};

export const Subtitle = ({ children, className }: TextProps) => {
    const classes = useStyles();
    return (
        <h2 className={classNames(className, classes.subtitle)}>{children}</h2>
    );
};

export const SectionTitle = ({ children, className }: TextProps) => {
    const classes = useStyles();
    return (
        <h3 className={classNames(className, classes.sectionTitle)}>
            {children}
        </h3>
    );
};
