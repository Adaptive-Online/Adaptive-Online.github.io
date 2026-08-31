import { useEffect } from 'react';

const GOOGLE_CALENDAR_CONFIG = {
  css: 'https://calendar.google.com/calendar/scheduling-button-script.css',
  script: 'https://calendar.google.com/calendar/scheduling-button-script.js',
  scheduleUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ILpNje3GXWbgDmLl6nqgN-KnztM5kW4IftiYcGdWgITQVsqOKuOZdVKXwb_R5XU-3p8rAhLTC?gv=true',
  buttonColor: '#42d694',
  buttonLabel: 'Book a call'
};

export default function BookingButton() {
  useEffect(() => {
    // Load Google Calendar CSS
    const link = document.createElement('link');
    link.href = GOOGLE_CALENDAR_CONFIG.css;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Google Calendar Script
    const script = document.createElement('script');
    script.src = GOOGLE_CALENDAR_CONFIG.script;
    script.async = true;
    document.body.appendChild(script);

    // Initialize the scheduling button
    script.onload = () => {
      window.calendar.schedulingButton.load({
        url: GOOGLE_CALENDAR_CONFIG.scheduleUrl,
        color: GOOGLE_CALENDAR_CONFIG.buttonColor,
        label: GOOGLE_CALENDAR_CONFIG.buttonLabel,
        target: document.getElementById('booking-button-container'),
      });
    };

    // Cleanup on unmount
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return <div id="booking-button-container" />;
}
