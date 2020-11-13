const app = require('../index');
const syncDB = require('./sync-db');

syncDB().then(() =>{
    console.log('Sync database..');
    
    app.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`);
    }); 
});