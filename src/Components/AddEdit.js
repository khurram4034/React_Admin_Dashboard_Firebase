import React, { useState, useEffect } from 'react';
import firebaseDb from '../firebase';
import TittlePage from '../Components/TittlePage/TittlePage';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { toast } from 'react-toastify';
import CancelIcon from '@material-ui/icons/Cancel';



const AddEdit = () => {
    const values = {
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        address: '',
        department: '',
    };


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
        },
        field: {
            '& > *': {
                margin: theme.spacing(2),
                width: '35ch',

            },

        }
    }));

    const [initialStat, setState] = useState(values);
    const { fname, lname, mobile, email, address, department } = initialStat;

    const [data, setData] = useState({});

    const history = useHistory();
    const currentId = useParams();
    const { id } = currentId;


    useEffect(() => {
        firebaseDb.child('contacts').on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, [id]);


    useEffect(() => {
        if (isEmpty(id)) {
            setState({ ...values });
        } else {
            setState({ ...data[id] });
        }
    }, [id, data]);


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({
            ...initialStat,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(id)) {
            firebaseDb.child("contacts").push(initialStat, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            firebaseDb.child(`/contacts/${id}`).set(initialStat, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        history.push('/')
    };
    const classes = useStyles();


    const ctaHandlerSuccess = () => {
        toast.success('???? Wow Data is Updated Succefully!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const ctaHandlerBack = () => {
        history.push('/')
    }

    return (
        <div>
            <TittlePage tittle="Update Users Information" />
            <div className='heading_sub'>
                <span><span className='heading'> Edit Users Information</span> Please Edit / Updated Your Informtion</span>
            </div>
        <div className={classes.root}>

            <form className={classes.field} noValidate autoComplete="off" onSubmit={handleSubmit}>

                <TextField
                    id="standard-basic"
                    label="First Name"
                    type="text"
                    value={fname}
                    name='fname'
                    onChange={handleInputChange}

                />
                <TextField
                    id="standard-basic"
                    label="Last Name"
                    type="text"
                    value={lname}
                    name='lname'
                    onChange={handleInputChange}
                />
                <TextField
                    id="standard-basic"
                    label="Email"
                    type="email"
                    value={email}
                    name='email'
                    onChange={handleInputChange}
                />
                <TextField
                    id="standard-basic"
                    label="Mobile"
                    type="number"
                    value={mobile}
                    name='mobile'
                    onChange={handleInputChange}
                />

                <TextField
                    id="standard-basic"
                    label="Department"
                    type='text'
                    value={department}
                    name='department'
                    onChange={handleInputChange}
                />

                <TextField
                    id="standard-basic"
                    label="Address"
                    type="text"
                    value={address}
                    name='address'
                    onChange={handleInputChange}

                />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<CancelIcon>send</CancelIcon>}
                        type='submit'
                        onClick={ctaHandlerBack}
                    >
                        Cancle
                    </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<CloudUploadIcon>send</CloudUploadIcon>}
                    type='submit'
                    onClick={ctaHandlerSuccess}
                >
                    Updated
                </Button>

            </form>

        </div>
    </div>
    )
}

export default AddEdit

