import { useEffect } from 'react';

const GOOGLE_CALENDAR_CONFIG = {
  css: 'https://calendar.google.com/calendar/scheduling-button-script.css',
  script: 'https://calendar.google.com/calendar/scheduling-button-script.js',
  scheduleUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ILpNje3GXWbgDmLl6nqgN-KnztM5kW4IftiYcGdWgITQVsqOKuOZdVKXwb_R5XU-3p8rAhLTC?gv=true',
  buttonColor: '#42d694', // You might want to use your primary color here
  buttonLabel: 'Schedule a Consultation' // Changed Label
};

export default function ConsultationButton() {
  useEffect(() => {
    let link, script;
    // Check if scripts are already loaded to avoid duplicates if possible
    // This basic check might not be foolproof for all scenarios
    if (!document.querySelector(`link[href="${GOOGLE_CALENDAR_CONFIG.css}"]`)) {
      link = document.createElement('link');
      link.href = GOOGLE_CALENDAR_CONFIG.css;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${GOOGLE_CALENDAR_CONFIG.script}"]`)) {
      script = document.createElement('script');
      script.src = GOOGLE_CALENDAR_CONFIG.script;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already loaded, try to initialize button directly
      // This assumes 'window.calendar' is available
      if (window.calendar && window.calendar.schedulingButton) {
        window.calendar.schedulingButton.load({
          url: GOOGLE_CALENDAR_CONFIG.scheduleUrl,
          color: GOOGLE_CALENDAR_CONFIG.buttonColor,
          label: GOOGLE_CALENDAR_CONFIG.buttonLabel,
          target: document.getElementById('consultation-button-container'), // New ID
        });
      } else {
        // Script tag exists but 'window.calendar' not yet ready, wait for it
        const existingScript = document.querySelector(`script[src="${GOOGLE_CALENDAR_CONFIG.script}"]`);
        existingScript.addEventListener('load', () => {
          window.calendar.schedulingButton.load({
            url: GOOGLE_CALENDAR_CONFIG.scheduleUrl,
            color: GOOGLE_CALENDAR_CONFIG.buttonColor,
            label: GOOGLE_CALENDAR_CONFIG.buttonLabel,
            target: document.getElementById('consultation-button-container'), // New ID
          });
        });
      }
      return; // Skip further script loading logic
    }
    
    // Initialize the scheduling button when script loads
    script.onload = () => {
      window.calendar.schedulingButton.load({
        url: GOOGLE_CALENDAR_CONFIG.scheduleUrl,
        color: GOOGLE_CALENDAR_CONFIG.buttonColor,
        label: GOOGLE_CALENDAR_CONFIG.buttonLabel,
        target: document.getElementById('consultation-button-container'), // New ID
      });
    };

    // Cleanup on unmount - only remove if this instance added them
    return () => {
      // More robust cleanup would involve reference counting or checking if other instances exist
      // For now, this is a simplified cleanup
      if (link && document.head.contains(link)) document.head.removeChild(link);
      if (script && document.body.contains(script)) document.body.removeChild(script);
      // Also, consider cleaning up the button instance itself if the API supports it
    };
  }, []);

  return <div id="consultation-button-container" />; // New ID
}
