import { Device } from '@capacitor/device';
import { io, Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:8081", { autoConnect: false });

export const getUuid = async () => {
    const deviceId = await Device.getId();
    return deviceId.uuid;
};

export default socket;