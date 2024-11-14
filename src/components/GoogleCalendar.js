import React, { useEffect } from 'react';
import { initGoogleAPI, createGoogleEvent } from '../services/calendarService';

const GoogleCalendar = () => {
    useEffect(() => {
        initGoogleAPI();
    }, []);

    const handleCreateEvent = async () => {
        const event = {
            summary: 'Task Deadline',
            location: 'Online',
            description: 'Task submission deadline.',
            start: {
                dateTime: '2024-12-01T10:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: '2024-12-01T12:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
        };
        await createGoogleEvent(event);
    };

    return (
        <div className="calendar-container">
            <h3>Google Calendar</h3>
            <button onClick={handleCreateEvent}>Create Event</button>
        </div>
    );
};

export default GoogleCalendar;
