import logging
import requests
import json
import os
from requests.models import HTTPError 

API_KEY = os.getenv('FINDWORK_API_KEY') or "812c1fb7d44f4aaf943ff1e10c0a8e68753f0d6e"

def extract_page_number(url):
    try:
        return int(url.split('?page=')[-1])
    except KeyError as e:
        logging.error(e)
    except Exception as e:
        logging.error(e)

    

from collections import namedtuple

Jobs = namedtuple('jobs', "jobs page count")

def get_jobs(page=1):
    headers = {
        'Authorization': f'Token {API_KEY}',
    }

    try:
        r = requests.get(f'https://findwork.dev/api/jobs/?page={page}', headers=headers)
    except Exception as e:
        raise HTTPError(e)

    if r.status_code != 200:
        raise HTTPError(f"Error: {r.status_code}")
    
    data = r.json()

    results, next_page, count = data.get('results'), data.get('next'), data.get('count')
    page_number = extract_page_number(next_page)
    return Jobs(results, page_number, count)


def jobs_parser(job):
    fields = ('id','role','company_name', 'company_num_employees', 'employment_type','location','remote', "date_posted", "keywords", 'source')
    job_dict = {}
    for field in fields:
        job_dict.setdefault(
            field, job.get(field)
        )


    return job_dict

import logging


def parse_job_list(jobs):
    return [jobs_parser(job) for job in jobs]


def jobs_generator(number_of_pages=5):
    jobs = get_jobs()
    while jobs.page and jobs.page <= number_of_pages:
        logging.warning(f"Current Page: {jobs.page-1}. Documents count: {jobs.count} Next Page: {jobs.page}")
        yield parse_job_list(jobs.jobs)
        jobs = get_jobs(jobs.page)


d = [x for x in jobs_generator(number_of_pages=2)]
print(d)