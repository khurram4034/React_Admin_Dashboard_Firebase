import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import firebaseDb from '../firebase';
import TittlePage from '../Components/TittlePage/TittlePage';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '10px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',

        
    },

    paperbtn: {
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',

    },

    person: {
        fontSize: '32px',
        color: 'black',
        margin: '-10px',
    },

    details: {
        fontSize: '24px',
        color: 'gray',
        margin: '-10px',

    },

    button: {
        width: '250px'

    }
}));

const View = () => {
    const history = useHistory();
    const classes = useStyles();
    const [data, setData] = useState({});

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


    const ctaHandlerBack = () => {
        history.push('/')
    }


    return (
        <div>
            <TittlePage tittle="Single User Information" />
            <div className='heading_sub'>
                <span><span className='heading'> Single Users</span> Please See Your Details</span>
            </div>
        <div className='container mt-5'>
            {Object.keys(data).map((userId) => {
                if (userId === id) {
                    return (
                    
                            <div className={classes.root}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                        <p className={classes.person}>Details Form of a Person</p>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Paper className={classes.paper}>
                                        <p className={classes.details}><b>First Name :</b> {data[id].fname}</p>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Paper className={classes.paper}>
                                        <p className={classes.details}><b>Last Name :</b> {data[id].lname}</p>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper}>
                                        <p className={classes.details}><b>E-Mail :</b> {data[id].email}</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper}>
                                        <p className={classes.details}><b>Mobile :</b> {data[id].mobile}</p>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper}>
                                        <p className={classes.details}><b>Address :</b> {data[id].address}</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper}>
                                        <p className={classes.details}><b>Department :</b> {data[id].department}</p>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paperbtn}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            endIcon={<CancelIcon>send</CancelIcon>}
                                            type='submit'
                                            onClick={ctaHandlerBack}
                                        >
                                            Close Form
                                        </Button>
                                    </Paper>
                                </Grid>

                            </Grid>



                        </div>                
                    )
                }
            })}
        </div>

        </div>
    )
}

export default View;



// {/* <div className='card'>
//                             <div className='card-body'>
//                                 <p className='card-text'>First Name: {data[id].fname}</p>
//                                 <p className='card-text'>Last Name: {data[id].lname}</p>
//                                 <p className='card-text'>Mobile: {data[id].mobile}</p>
//                                 <p className='card-text'>Email: {data[id].email}</p>
//                                 <p className='card-text'>Address: {data[id].address}</p>

//                                 <Link to={'/'}>
//                                     <div><RiArrowGoBackFill /> Go Back</div>
//                                 </Link>
//                             </div> */}
// {/* </div> */ }
