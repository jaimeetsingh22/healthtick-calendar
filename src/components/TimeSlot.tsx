import { format } from "date-fns";
import type { Booking } from "../types";
import { Trash2 } from "lucide-react";

interface Props {
  time: Date;
  booking?: Booking;
  onBook?: (time: string) => void;
  onDelete?: (id: string) => void;
  disabled?: boolean;
}

export default function TimeSlot({ time, booking, onBook, onDelete, disabled }: Props) {
  const handleClick = () => {
    if (!booking && !disabled && onBook) {
      onBook(format(time, "HH:mm"));
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-xl shadow-sm transition
        ${
          booking
            ? "bg-blue-50 border-l-4 border-blue-500"
            : disabled
            ? "bg-red-50 text-red-400 cursor-not-allowed"
            : "bg-gray-50 hover:bg-blue-100 cursor-pointer"
        }`}
      onClick={handleClick}
      title={
        booking
          ? `${booking.clientName} (${booking.callType})`
          : disabled
          ? "Overlapping with another call"
          : "Click to book"
      }
    >
      <span className="text-gray-700 font-medium">{format(time, "hh:mm a")}</span>
      {booking ? (
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">{booking.clientName}</span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              booking.callType === "onboarding"
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {booking.callType === "onboarding" ? "Onboarding" : "Follow-up"}
          </span>
          <Trash2
            className="text-red-500 hover:text-red-700 cursor-pointer"
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              onDelete && booking.id && onDelete(booking.id);
            }}
          />
        </div>
      ) : (
        <span
          className={`font-medium ${
            disabled ? "text-red-400" : "text-blue-500"
          }`}
        >
          {disabled ? "Unavailable" : "Empty Slot"}
        </span>
      )}
    </div>
  );
}
