const stream = require('stream');

const parallel = (...streams) => {
    if (Array.isArray(streams[0])) streams = streams[0];

    let streamInstance = new stream.Stream();
    streamInstance.writable = stream.readable = true;

    let streamCount = streams.length;

    function bindEvent(event) {
        let count = 0;
        return (item) => {
            let already = false;
            item.on(event, () => {
                if (already) {
                    return;
                }
                already = true;
                count++;
                if (count >= streamCount) {
                    streamInstance.emit(event);
                }
            });
        };
    }

    let bindEndEvent = bindEvent('end');
    let bindFinishEvent = bindEvent('finish');

    streams.forEach(item => {
        item.pipe(streamInstance, { end: false });
        bindEndEvent(item);
        bindFinishEvent(item);
    });

    streamInstance.write = (data) => {
        streamInstance.emit('data', data);
    };

    streamInstance.destory = () => {
        items.forEach(item => {
            item.destory && item.destory();
        });
    }

    return streamInstance;
};

module.exports=parallel
