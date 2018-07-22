import request from 'request-promise';
import allVacanciesArray from './allVacanciesArray.json';
import fs from 'fs';


//const parseAllVacanciesList = async function parseAllVacanciesList() {
const parseUA = async function parseUA() {
  let allItems = [];
  const lastPageIndex = 1;

  for (let pageIndex = 0; pageIndex < lastPageIndex; pageIndex++) {

    const dataRequest = request({
      url: 'https://api.hh.ru/vacancies',
      headers: {
        Cookie: 'potato=potato; hhtoken=gk8B1_ucCho6k3AQmwZPT0dgE2Ae; hhuid=fi8yD8UBO29IpFrJF24mwg--; _ga=GA1.2.1428112930.1523128949; _gid=GA1.2.892355036.1523729208; _xsrf=9957b859941896a00fde2d8a06e87670; last_visit=1523806271002::1523817071002; cfids58=ldeNH2iFqMka32ZBSa6EBAvPpWDsAYrmSIIUutTdqKLZJgv7czzzKqLoo8apJr62LWp0tibE7Kfk1kT2rqOLFVC-mCxyQAuemvwgFQr6se2QDsgJwCc21QvjVvtEawxLbb7N+sDzSVH22O1Nxw9DPLI0ltcBhFoOrEI+z3ripc4=; auth_user=25456b43759fb0104aea3d0d91e19767; crypted_id=5872DA6DB3216183691C0A2239B60119A5471C6F722104504734B32F0D03E9F8',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        Referer: 'https://github.com/hhru/api/blob/master/docs/vacancies.md',
        Connection: 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
      },
      qs: {
        text: 'qa engineer',
        search_field: 'name',
        area: 5,
        page: pageIndex,
        per_page: 100
      },
    });

    console.log(pageIndex);
    const res = await dataRequest;

    let response = JSON.parse(res);
    let items = response.items;

    for (let i = 0; i < items.length; i++) {
      const stringResponse = JSON.stringify(response).toLocaleLowerCase();
      if (stringResponse.match(/qa/i) || stringResponse.match(/engineer/i) ||
        stringResponse.match(/tester/i) || stringResponse.match(/quality assurance/i) ||
        stringResponse.match(/тестировщик/i) || stringResponse.match(/тестер/i)) {
        allItems.push(items[i]);

      }
    }
    console.log(pageIndex + '-done');

  }
  console.log(allItems);
  return JSON.stringify(allItems);
};


const getIdsOfVacanciesFromArray = function (arrayWithVacancies) {
  let idsArray = [];

  for (let i = 0; i < arrayWithVacancies.items.length; i++) {
    console.log(arrayWithVacancies.items[i].id);
    idsArray.push(arrayWithVacancies.items[i].id);
  }

  console.log('idsArray');
  console.log(idsArray);

  return idsArray;
};

const parseDetailOfEachVacancy = async function parseDetailOfEachVacancy() {
//const parseUA = async function parseUA() {
  let ids = getIdsOfVacanciesFromArray(allVacanciesArray);
  let allItems = [];
  console.log(ids);

  //for (let index = 0; index < ids.length; index++) {
  for (let index = 0; index < 5; index++) {

    console.log(ids[index]);

    const dataRequest = request({
      url: 'https://api.hh.ru/vacancies/' + ids[index],
      headers: {
        Cookie: 'potato=potato; hhtoken=gk8B1_ucCho6k3AQmwZPT0dgE2Ae; hhuid=fi8yD8UBO29IpFrJF24mwg--; _ga=GA1.2.1428112930.1523128949; _gid=GA1.2.892355036.1523729208; _xsrf=9957b859941896a00fde2d8a06e87670; last_visit=1523806271002::1523817071002; cfids58=ldeNH2iFqMka32ZBSa6EBAvPpWDsAYrmSIIUutTdqKLZJgv7czzzKqLoo8apJr62LWp0tibE7Kfk1kT2rqOLFVC-mCxyQAuemvwgFQr6se2QDsgJwCc21QvjVvtEawxLbb7N+sDzSVH22O1Nxw9DPLI0ltcBhFoOrEI+z3ripc4=; auth_user=25456b43759fb0104aea3d0d91e19767; crypted_id=5872DA6DB3216183691C0A2239B60119A5471C6F722104504734B32F0D03E9F8',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        Referer: 'https://github.com/hhru/api/blob/master/docs/vacancies.md',
        Connection: 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
      }
    });

    const res = await dataRequest;

    let response = JSON.parse(res);

    allItems.push(response);
  }

  let fileName = '/home/ninja/application/uploads/fileNew.json';

  fs.writeFile(fileName, JSON.stringify(allItems), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};


export default parseUA;
