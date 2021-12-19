
import { CronJob } from 'cron';
import { fetchJobs } from './tasks/jobsFetcher.js';

var job = new CronJob('* * * * *', function(){
    fetchJobs()
}, null, true, 
'America/Los_Angeles');
job.start();