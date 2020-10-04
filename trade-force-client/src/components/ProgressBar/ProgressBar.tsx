import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    pctDone: {
        backgroundColor: theme.palette.secondary.main,
    },
    pctNotDone: {
        backgroundColor: theme.palette.common.black,
    },
}));

interface ProgressBarProps {
    // at least specify the height
    className: string;
    // value between 0 and 100
    pctDone: number;
}

export const ProgressBar = ({ className, pctDone }: ProgressBarProps) => {
    const classes = useStyles();

    const pctNotDone = 100 - pctDone;

    return (
        <div className={classNames(className, classes.root)}>
            <span
                className={classes.pctDone}
                style={{ width: `${pctDone}%` }}
            />
            <span
                className={classes.pctNotDone}
                style={{ width: `${pctNotDone}%` }}
            />
        </div>
    );
};
