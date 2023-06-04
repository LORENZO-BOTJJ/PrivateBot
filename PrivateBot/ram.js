const bytes = process.memoryUsage();
const jumlah = bytes.rss + bytes.heapTotal + bytes.heapUsed + bytes.external + bytes.arrayBuffers;
const megabytes = (jumlah / (1024 * 1024)).toFixed(2);

console.log(megabytes + " MB");