import axios from 'axios'

import {config} from '../config/config'

let adapter;
if (config.userServiceAddress === undefined) {
    adapter = 'http://localhost:9090'
} else {
    adapter = config.userServiceAddress
}

let workmanager;
if (config.workManagerServiceAddress === undefined) {
    workmanager = 'http://localhost:8081'
} else {
    workmanager = config.workManagerServiceAddress
}

let caller;
if (config.statisticsServiceAddress === undefined) {
    caller = 'http://localhost:8080'
} else {
    caller = config.statisticsServiceAddress
}

export const userRequest = axios.create({
    baseURL: adapter
})

export const callsRequest = axios.create({
    baseURL: caller
})

export const workManagerRequest = axios.create({
    baseURL: workmanager
})