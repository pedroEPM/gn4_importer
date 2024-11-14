import axios from 'axios';
export default async function getPublicIP() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log(`Tu dirección IP pública es: ${response.data.ip}`);
    } catch (error) {
        console.error('Error obteniendo la IP pública:', error);
    }
}