app.exec(_ =>{
    app.utils.dateFormat
    =(date =new Date, format ='yyyy-mm-dd') =>{
        const {padStart} =String.prototype;
        const yyyy =date.getFullYear();
        const mm =padStart.call(date.getMonth() +1, 2, '0');
        const dd =padStart.call(date.getDate(), 2, '0');
        const hh =padStart.call(date.getHours(), 2, '0');
        const mi =padStart.call(date.getMinutes(), 2, '0');
        const ss =padStart.call(date.getSeconds(), 2, '0');
        const ms =padStart.call(date.getMilliseconds(), 3, '0');
        return format.replace(/yyyy/g, yyyy)
            .replace(/mm/g, mm)
            .replace(/dd/g, dd)
            .replace(/hh/g, hh)
            .replace(/mi/g, mi)
            .replace(/ss/g, ss)
            .replace(/ms/g, ms);
    };

    app.utils.numberFormat
    =(number =0) =>number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
