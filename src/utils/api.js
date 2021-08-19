import axios from 'axios';
import { apiConfig } from 'config/axios';

export default axios.create(apiConfig);
