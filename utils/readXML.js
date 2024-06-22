import fs from 'fs'
import xml2js from 'xml2js'
const parser = new xml2js.Parser();

import { DOMParser } from 'xmldom';
import pkg from 'xmlserializer';

export const readerXML = async(path) => {
    try {
        const data = await fs.promises.readFile(path);
        const { root } = await parser.parseStringPromise(data);
        return root;
    } catch (error) {
        console.log('Error reader XML ', error);
    }
}

export const parseXML = async (filePath, tag) => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const elementGot = xmlDoc.getElementsByTagName(tag);
        
        return pkg.serializeToString(elementGot.length > 1 ? elementGot[elementGot.length - 1] : elementGot[0]) ?? '';
    } catch (err) {
        console.error('Error:', err);
    }
}