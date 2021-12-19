import fetch from 'node-fetch';
import { createClient } from 'redis'; 


const client = createClient();

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));

// const setAsync = promisify(client.set).bind(client);

import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.FINDJOB_API_KEY


const baseUrl = 'https://findwork.dev/api/jobs/'


async function fetchOnePage(page) {
    const res = await fetch(`${baseUrl}?page=${page}`, {
        method: 'get',
        headers : {'Authorization': `Token ${API_KEY}`}
    });
    const jobs = await res.json();
    const results = jobs.results 

    const jobs_array = []
    results.forEach(element => {
            const job = {
            id: element['id'],
            role: element['role'],
            company_name: element['company_name'],
            company_num_employees: element['company_num_employees'],
            employment_type: element['employment_type'],
            location: element['location'],
            remote: element['remote'],
            date_posted : element['date_posted'],
            keywords : element['keywords'],
            source: element['source'],
            description: element['text'],
            logo: element['logo'],

        }
        jobs_array.push(job)
        
    });
    return jobs_array
}


export async function fetchJobs(num_pages=2) {

    const pages = num_pages

    let page = 1, count = 0

    const all_jobs = []

    while(page <= pages) {
        const jobs = await fetchOnePage(page)
        console.log('fetching page: ', page)
        all_jobs.push(...jobs)
        count += jobs.length
        page++;
    }

    console.log(`Page: ${pages}, Count: ${count}`)
    // const success = await setAsync('jobs', JSON.stringify(all_jobs));
    const success = await client.set('jobs', JSON.stringify(all_jobs));
    console.log('Success ', {success})

}
