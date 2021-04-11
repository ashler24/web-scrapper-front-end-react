import axios from 'axios';

export default axios.create({
    baseURL: `https://web-scraper-node-deploy.herokuapp.com/data/`
});