import React, { useState, useEffect } from 'react';
import firebaseDb from '../../firebase';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
});



export default function DenseTable() {
    const classes = useStyles();

    const [data, setData] = useState({});


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
    }, []);

    const onDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record ?")) {
            firebaseDb.child(`contacts/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">E-Mail</TableCell>
                        <TableCell align="center">Mobile</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Department</TableCell>
                        <TableCell align="center">Action</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(data).map((id, index)  => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="center">{data[id].fname}</TableCell>
                            <TableCell align="center">{data[id].lname}</TableCell>
                            <TableCell align="center">{data[id].email}</TableCell>
                            <TableCell align="center">{data[id].mobile}</TableCell>
                            <TableCell align="center">{data[id].address}</TableCell>
                            <TableCell align="center">{data[id].department}</TableCell>
                            <TableCell align="center">
                                        <Link to={`/update/${id}`}>
                                    <AiFillEdit style={{ color: 'blue', fontSize: '18px'}} />
                                        </Link>
                                        
                                <MdDelete onClick={() => onDelete(id)} style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px', color: 'red', fontSize: '18px' }}/>

                                        <Link to={`/view/${id}`}>
                                    <VisibilityIcon style={{ color: 'green', fontSize: '18px' }} />
                                        </Link>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
