import React, { useState, useEffect } from 'react';
import firebaseDb from '../../firebase';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NearMeIcon from '@material-ui/icons/NearMe';
import { toast } from 'react-toastify';



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


const StudentForm = () => {

    const classes = useStyles();

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

    const ctaHandlerSuccess = () => {
        toast.success('🦄 Wow Data is Submitted Succefully!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    return (
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
                    color="primary"
                    className={classes.button}
                    endIcon={<NearMeIcon>send</NearMeIcon>}
                    type='submit'
                    onClick={ctaHandlerSuccess}
                >
                    Submit
                </Button>

                    </form>

        </div>
            
    )
}

export default StudentForm;
