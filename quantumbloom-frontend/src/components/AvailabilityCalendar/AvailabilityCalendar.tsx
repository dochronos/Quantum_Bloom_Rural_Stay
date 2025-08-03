'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo, Event as CalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

type AvailabilityCalendarProps = {
  occupiedDates: string[]; // Formato ISO o compatible con Date
  onDateSelect: (date: Date) => void;
  onShowMessage?: (message: string) => void;
};

type CustomEvent = CalendarEvent & {
  type: 'occupied' | 'selected';
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  occupiedDates,
  onDateSelect,
  onShowMessage,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const occupiedEvents: CustomEvent[] = occupiedDates.map((date) => ({
    title: 'Ocupado',
    start: new Date(date),
    end: new Date(date),
    allDay: true,
    type: 'occupied',
  }));

  const selectedEvent: CustomEvent[] = selectedDate
    ? [{
        title: 'Seleccionado',
        start: selectedDate,
        end: selectedDate,
        allDay: true,
        type: 'selected',
      }]
    : [];

  const allEvents: CustomEvent[] = [...occupiedEvents, ...selectedEvent];

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const clickedDate = moment(slotInfo.start).startOf('day');
    const isOccupied = occupiedDates.some(date =>
      moment(date).isSame(clickedDate, 'day')
    );

    if (!isOccupied) {
      const selected = clickedDate.toDate();
      setSelectedDate(selected);
      onDateSelect(selected);
    } else {
      onShowMessage?.('Esta fecha no está disponible para reserva.');
    }
  };

  const eventStyleGetter = (event: CustomEvent) => {
    let style: React.CSSProperties = {
      borderRadius: '8px',
      color: 'black',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      padding: '4px 6px',
      fontSize: '0.85rem',
    };

    if (event.type === 'occupied') {
      style.backgroundColor = '#ffd6d6';
      style.border = '1px solid #e60000';
    } else if (event.type === 'selected') {
      style.backgroundColor = '#ccf5d6';
      style.border = '1px solid #007f00';
    }

    return { style };
  };

  return (
    <div className="availability-calendar">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: 450, fontFamily: 'Garamond, sans-serif' }}
        selectable
        popup
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
      />

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <h4 style={{ fontFamily: 'Garamond, sans-serif' }}>Fecha seleccionada:</h4>
        {selectedDate
          ? <p>{moment(selectedDate).format('DD/MM/YYYY')}</p>
          : <p style={{ color: '#999' }}>Aún no seleccionaste una fecha.</p>}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
