const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'http://bbon.kr';

const blogPageUrl = `${baseUrl}/page/`;

var endOfPages = false;
var page = 1;
var postCount = 0;

const keepGoing = ()=>{
    return !endOfPages;
};

const getData = ()=>{
    let url = `${blogPageUrl}${page}`;
    rp(url, (error, response, body)=>{
        if(error){
            throw error;   
        }
    
        let $ = cheerio.load(body);
    
        let postElem = $('.entry-title');

        if(postElem.length === 0){
            endOfPages = true;
        }        

        postElem.each((index, element)=>{
            let title = $(element).find('a').text();
            let postUrl = $(element).find('a').attr('href');
            
            console.log(`${title} ==> ${postUrl}`);

            postCount++;
        });

        page++;
    
    }).then(()=>{keepGoing() ? getData() : ()=>{
        console.log(`${postCount} founds.`);
        return false;
    }});
};

getData();
