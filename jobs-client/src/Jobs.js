import React from "react";
import Typography from '@material-ui/core/Typography';
import Job from "./Job";



export default function Jobs({jobs}) {
    return (
        <div className="jobs">
            <Typography variant="h4" component='h1'>
                Dev Jobs 
            </Typography>
        
        {
            jobs.map(
                (job, i) => <Job key={i} job={job}/>
            )
        }

        </div>
    )
}