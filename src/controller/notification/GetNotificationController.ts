import { Request, Response } from "express";

import GetNotificationService from "../../services/notification/GetNotificationService";

export default async function GetNotificationController(req: Request, res: Response) {
    const userId = req.user_id;

    try {
        const notifications = await GetNotificationService(userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve notifications" });
    }
}