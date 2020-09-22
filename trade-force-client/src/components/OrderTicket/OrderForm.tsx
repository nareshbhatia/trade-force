import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormActions, TextField } from '@react-force/formik-mui';
import { Order } from '@trade-force/models';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export interface OrderFormProps {
    order: Order;
    onSave: (order: Order) => void;
}

export const OrderForm = ({ order, onSave }: OrderFormProps) => {
    const classes = useStyles();

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
        department: yup.string().required(),
        manufacturer: yup.string().required(),
        price: yup.number().required(),
    });

    return (
        <Formik<Order>
            initialValues={order}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                onSave(values);
                actions.setSubmitting(false);
            }}
        >
            {() => (
                <Form className={classes.form}>
                    <TextField
                        name="secId"
                        label="Symbol"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="quantity"
                        label="Quantity"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="type"
                        label="Order Type"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="limitPrice"
                        label="Limit Price"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="fundId"
                        label="Fund"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="note"
                        label="Note"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        InputLabelProps={{ shrink: true }}
                    />

                    <FormActions submitLabel="Save" />
                </Form>
            )}
        </Formik>
    );
};
