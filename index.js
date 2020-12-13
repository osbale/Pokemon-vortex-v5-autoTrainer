const puppeteer = require('puppeteer');

let username = "random"
let password = "random"
let type = "TypeFire"


let browser = null;
let page = null;
let cycleCount = 0;

(async () => {

    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.pokemon-vortex.com/battle-user/1058571', { waitUntil: 'networkidle2' });

    await page.type('input[name="myusername"]', username, { delay: 25 })
    await page.type('input[name="mypassword"]', password, { delay: 25 })

    await page.click('input[id="submit"]')
    await page.waitForTimeout(2000)

    await page.hover('li[id="battleTab"]')
    await page.waitForTimeout(1000)
    await page.click('a[href="/battle-search/"]')
    await page.waitForTimeout(2000)

    await page.type('input[name="buser"]', type, { delay: 25 })
    await page.click('button[name="submitb"]')

    await page.waitForNavigation('networkidle2')
    await page.click('input[type="submit"]')
    await page.waitForTimeout(2000)

    while (true) {
        await page.waitForTimeout(2000)
        linksLength = await page.evaluate((sel) => {
            let elements = Array.from(document.querySelectorAll(sel));
            let links = elements.map(element => {
                return element
            })
            return links.length
        }, 'input[type="submit"]');

        if (linksLength === 1) {
            /* console.log(linksLength) */
            await page.click('#ajax > form > p > input', {clickCount: 2})
            continue
        } else if (linksLength === 3) {
            /* console.log(linksLength) */
            if (await page.$('#ajax > form:nth-child(2) > div > input:nth-child(6)') !== null) {
                page.click('#ajax > form:nth-child(2) > div > input:nth-child(6)', {clickCount: 2})
                continue
            } else {
                page.click('#ajax > form:nth-child(2) > div > input:nth-child(5)', {clickCount: 2})
                continue
            }
        } else if (linksLength === 2) {
            /* console.log(linksLength) */
            await page.click('#ajax > form:nth-child(2) > div > input.button-maroon.button-small', {clickCount: 2})
            continue
        } else {
            await page.click('#ajax > form > ul > li:nth-child(2)', {clickCount: 2})
            console.log("cycle count => " + cycleCount++)
            continue
        }
    }


})();