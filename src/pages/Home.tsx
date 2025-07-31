import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import BookingModal from "../components/BookingModal";
import Sidebar from "../components/Sidebar";
import type { Booking } from "../types";
import { doc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { format } from "date-fns";

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDeleteBooking = async (id: string) => {
    await deleteDoc(doc(db, "bookings", id));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const allBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const currentWeekday = selectedDate.getDay();

      const filteredBookings = allBookings.filter((b) => {
        if (b.recurring) {
          const bookingDate = new Date(b.date);
          return bookingDate.getDay() === currentWeekday;
        }
        return b.date === dateStr;
      });

      setBookings(filteredBookings);
    });

    return () => unsubscribe();
  }, [selectedDate]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
  
    <Sidebar />
  <div className="flex-1 pl-4 pt-2 pr-4">
    <Calendar
      bookings={bookings}
      selectedDate={selectedDate}
      onChangeDate={(date) => setSelectedDate(date)}
      onBook={(time) => setSelectedTime(time)}
      onDelete={handleDeleteBooking}
    />
  </div>
  {selectedTime && (
    <BookingModal
      selectedTime={selectedTime}
      date={selectedDate}
      onClose={() => setSelectedTime(null)}
    />
  )}
</div>

  );
}
