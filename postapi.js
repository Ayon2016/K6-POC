import http from 'k6/http'
import {sleep, check} from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options={
    stages: [
        { duration: '30s', target: 10 }, // traffic ramp-up from 1 to 10 users over 30s
        { duration: '30s', target: 0 }, // ramp-down to 0 users
      ],
      thresholds: {
        http_req_duration: [{ threshold: 'p(99) < 2000', abortOnFail: true }],
      }
}

export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  };

export default function(){
    const url = "http://tor-pe-qe-demo-app-be-clb-1-206864453.us-east-2.elb.amazonaws.com/student/add"
    const payload = JSON.stringify({
        name: "Perf Test User" + randomIntFromInterval(1,1000),
        address: "Toronto"
    })
    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = http.post(url, payload, params);

      check(res, {
        'is status 200': (r) => r.status === 200,
      });
}





