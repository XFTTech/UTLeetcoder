import { React } from 'react';
import { useState, useEffect } from 'react';
import { getRecentSubmission } from '../../../backend/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
    // fdsaf
}

const Submission = () => {
    const [submission, setSubmission] = useState([]);
    useEffect(() => {
        getRecentSubmission('Ethan-ZYF')
            .then((res) => {
                console.log(res);
                setSubmission(res.data.data.recentAcSubmissionList);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Submission</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submission.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.id}</TableCell>
                                {/* <TableCell align="left"><a href={`https://leetcode.com/problems/${row.titleSlug}`}>{row.title}</a></TableCell> */}
                                <TableCell align="left">
                                    <Link
                                        href={`https://leetcode.com/problems/${row.titleSlug}`}
                                        target="_blank"
                                        underline="hover"
                                    >
                                        {row.title}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{formatTime(row.timestamp)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Submission;