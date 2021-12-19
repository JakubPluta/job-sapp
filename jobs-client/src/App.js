

import './App.css';
import React from 'react';
import Jobs from './Jobs';

const API_URL = 'http://localhost:3001/jobs'

async function fetchJobsFromApi(updateCallback) {
    const response = await fetch(API_URL);
    const jobs = await response.json();
    updateCallback(jobs)

}


function App() {

    const [jobsList, updateJobs] = React.useState([]); 


    React.useEffect(() => {
      fetchJobsFromApi(updateJobs);
    }, [])

    return (
    <div>

    
      <Jobs jobs={jobsList} />
    </div>

  );
}

export default App;
