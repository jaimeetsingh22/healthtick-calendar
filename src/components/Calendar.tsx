import { useState } from "react";
import TimeSlot from "./TimeSlot";
import { format, addMinutes, setHours, setMinutes } from "date-fns";
import type { Booking } from "../types";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";

interface CalendarProps {
  bookings: Booking[];
  onBook?: (time: string) => void;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  onDelete?: (id: string) => void;
}

export default function Calendar({
  bookings,
  onBook,
  selectedDate,
  onChangeDate,
  onDelete,
}: CalendarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const startTime = setMinutes(setHours(selectedDate, 10), 30);
  const endTime = setMinutes(setHours(selectedDate, 19), 30);

  const slots: Date[] = [];
  let current = startTime;
  while (current <= endTime) {
    slots.push(current);
    current = addMinutes(current, 20);
  }

  const handlePrevDay = () => onChangeDate(new Date(selectedDate.getTime() - 86400000));
  const handleNextDay = () => onChangeDate(new Date(selectedDate.getTime() + 86400000));
  const handleToday = () => onChangeDate(new Date());

  
  const isSlotDisabled = (slot: Date) => {
    const slotStart = slot;
    const slotEnd = addMinutes(slotStart, 20);

    return bookings.some((booking) => {
      const bookingStart = new Date(`${booking.date}T${booking.time}`);
      const bookingEnd = addMinutes(bookingStart, booking.duration);

      return (
        (slotStart >= bookingStart && slotStart < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd)
      );
    });
  };

  return (
    <div className="flex-1 bg-white shadow rounded-2xl p-4 h-screen relative">
     
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextDay}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <h2
          className="text-xl font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <CalendarIcon size={20} className="text-blue-500" />
          {format(selectedDate, "EEEE, MMMM dd, yyyy")}
        </h2>
        <button
          onClick={handleToday}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Today
        </button>
      </div>

   
      {showDatePicker && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-xl p-3">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (date) {
                onChangeDate(date);
                setShowDatePicker(false);
              }
            }}
            inline
          />
        </div>
      )}

     
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate.toDateString()}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-y-auto lg:h-[90vh] sm:h-[85vh]"
        >
          {slots.map((slot) => {
            const booking = bookings.find((b) => b.time === format(slot, "HH:mm"));
            const disabled = isSlotDisabled(slot);

            return (
              <TimeSlot
                key={format(slot, "HH:mm")}
                time={slot}
                booking={booking}
                onBook={!disabled && !booking ? onBook : undefined}
                onDelete={onDelete}
                disabled={disabled && !booking}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
