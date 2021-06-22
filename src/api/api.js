import axios from 'axios'

import {config} from '../config/config'

export const userRequest = axios.create({
    baseURL: config.userServiceAddress
})

export const callsRequest = axios.create({
    baseURL: config.statisticsServiceAddress
})

export const workManagerRequest = axios.create({
    baseURL: config.workManagerServiceAddress
})