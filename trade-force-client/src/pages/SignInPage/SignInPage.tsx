import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    HorizontalContainer,
    NarrowContainer,
    VerticalContainer,
    ViewVerticalContainer,
} from '@react-force/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { MessageFactory } from '@react-force/models';
import { TextField } from '@react-force/formik-mui';
import { Header } from '../../components';
import { useMessageSetter } from '@react-force/core';
import { useRootStore } from '../../contexts';
import { useUsers } from '../../hooks';
import { SignInHelp } from './SignInHelp';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        padding: theme.spacing(1),
    },
}));

export const SignInPage = () => {
    const classes = useStyles();
    const rootStore = useRootStore();
    const { isLoading, isError, data: users, error } = useUsers();
    const { authStore } = rootStore;
    const setMessage = useMessageSetter();

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const handleSubmit = async (email: string) => {
        try {
            const user = users?.find((user) => user.email === email);

            if (user === undefined) {
                setMessage(MessageFactory.error('Invalid Email'));
                return;
            }

            // Save user
            authStore.setUser(user);
        } catch (error) {
            setMessage(MessageFactory.error(error.message));
        }
    };

    // Allow ErrorBoundary to handle errors
    if (isError) {
        throw error;
    }

    if (isLoading || users === undefined) {
        return null;
    }

    return (
        <ViewVerticalContainer>
            <Header />
            <HorizontalContainer flexWrap="wrap">
                <SignInHelp users={users} />
                <VerticalContainer>
                    <NarrowContainer textAlign="center">
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, actions) => {
                                await handleSubmit(values.email);
                                actions.setSubmitting(false);
                            }}
                        >
                            {() => (
                                <Form className={classes.form}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        margin="normal"
                                        fullWidth
                                    />

                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </NarrowContainer>
                </VerticalContainer>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};
