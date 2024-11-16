import { gapi } from 'gapi-script';

export const initGoogleAPI = () => {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
        });
    });
};

export const createGoogleEvent = async (eventData) => {
    const authInstance = gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();
    
    if (isSignedIn) {
        const calendar = gapi.client.calendar;
        await calendar.events.insert({
            calendarId: 'primary',
            resource: eventData,
        });
    } else {
        throw new Error('User not authenticated');
    }
};
