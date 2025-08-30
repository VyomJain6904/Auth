import { getIp } from "@/lib/get-ip";

const trackers: Record<string, { count: number; expiresAt: number }> = {};

export async function rateLimitByIp(
    limit: number = 1,
    interval: number = 1000000
) {
    const ip = getIp();

    if (!ip) {
        throw new Error("IP Address not found");
    }

    rateLimitByKey(ip, limit, interval);
}

export async function rateLimitByKey(
    key: string,
    limit: number = 1,
    interval: number = 1000000
) {
    const tracker = trackers[key] || { count: 0, expiresAt: 0 };

    if (!trackers[key]) {
        trackers[key] = tracker;
    }

    if (tracker.expiresAt < Date.now()) {
        tracker.count = 0;
        tracker.expiresAt = Date.now() + interval;
    }

    tracker.count++;

    if (tracker.count > limit) {
        throw new Error("Rate limit exceeded");
    }
}
