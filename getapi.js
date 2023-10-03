import http from 'k6/http'
import {sleep, check} from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options={
  stages: [
    { duration: '30s', target: 10 }, // traffic ramp-up from 1 to 10 users over 30s
    { duration: '30s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: [{ threshold: 'max < 2000', abortOnFail: true }],
  },
}

export default function(){
    const res = http.get('http://tor-pe-qe-demo-app-be-clb-1-206864453.us-east-2.elb.amazonaws.com/student/getAll')
    sleep(1);
    check(res, {
        "response code was 200": (res) => res.status == 200,
       });
}

//Reporting
export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }