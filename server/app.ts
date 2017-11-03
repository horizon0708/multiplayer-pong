import * as express from 'express'
import * as path from 'path';

class App {
    public express;

    constructor () {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        this.express.get('/', (req, res) => {
            res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
        });
        this.express.use('/', express.static(path.join(__dirname, '../dist')));
    }
}

export default new App().express;