import React from 'react';
import TittlePage from '../../Components/TittlePage/TittlePage';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './users.css';
import StudentForm from '../Form/StudentForm';

const useStyles = makeStyles(theme => ({
    pageContent: {
      margin: theme.spacing(3),
      padding: theme.spacing(4),
    },

  
}))

const Users = ({tittle}) => {

  const classes = useStyles();

    return (
        <div>
            <TittlePage tittle="Users Information" />
            <div className='heading_sub'>
                <span><span className='heading'> Users</span> Please Enter Your Informtion</span>
            </div>

        <Paper className={classes.pageContent}>
          <h2>Required Information:</h2>
          <StudentForm />
        </Paper>

        </div>
    )
}

export default Users;
