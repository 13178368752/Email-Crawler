const { Cluster } = require('puppeteer-cluster');

async function crawler(arr) {
    let emailArr = [];
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 6,
    });

    // Crawl Email in parallel
    await cluster.task(async ({page, data: url}) => {
        await page.goto(url).catch(()=>{console.log('page err')});
        const html = await page.content().catch(()=>{console.log('page err')});
        if (html.includes('@')) {
            let reg = /([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})/g;
            let result = html.match(reg);
            if (result !== null) {
                emailArr.push.apply(emailArr, result);
            }
        }
    })
    try{
        for (let i = 0; i < arr.length; i++) {
            await cluster.execute(arr[i])
        }
    }catch (err){console.log(err)}
return emailArr

}



exports.crawler=crawler