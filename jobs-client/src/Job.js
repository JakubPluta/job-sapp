import React from "react";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Avatar } from "@material-ui/core";

function dateConverter(obj) {
    var date = new Date(obj);
    return date.toISOString().substring(0, 10);
}

export default function Job({job, onClick}) {
    
    return (
        <Paper onClick={onClick} className='job'>
                <div className="flex-align-mid">
                <Avatar alt="avatar" src={job.logo}  sx={{ width: 56, height: 56 }}/>
                    <div className="job-title-location">
                    
                    <Typography variant='h6'>{job.role}</Typography>
                    <Typography variant='h5'>{job.company_name}</Typography>
                    <Typography>{job.employment_type}</Typography>
                    <Typography>{job.location}</Typography>
                    <Typography>{job.keywords.join(', ')}</Typography>
                </div>
                </div>
                <div className="flex-align-mid date-time">
                <Typography variant="h6">{dateConverter(job.date_posted)}</Typography>

                </div>
        </Paper>
    )
}
