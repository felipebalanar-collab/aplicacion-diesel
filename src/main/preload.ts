import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel: string, func: (data: any) => void) => {
        ipcRenderer.on(channel, (event: any) => {
            func(event);
        });
    }
});