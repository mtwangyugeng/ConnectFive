import type { Request, Response, Express } from 'express';
import type { BodyParser } from 'body-parser';

export function Map(app: Express, jsonParser: BodyParser) {
    app.post('/map/playerlist', jsonParser, (req: Request, res: Response) => {
        console.log(req.body);
        const mapIndex = req.body.mapIndex;
    });
}