import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

interface Client {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  selectedTime: string;
  date: Date;
  onClose: () => void;
}

export default function BookingModal({ selectedTime, date, onClose }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [callType, setCallType] = useState<"onboarding" | "follow-up">("onboarding");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(collection(db, "clients"));
      const data: Client[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Client[];
      setClients(data);
    };
    fetchClients();
  }, []);

  const handleBook = async () => {
    if (!selectedClient) return;

    setLoading(true);
    try {
      const duration = callType === "onboarding" ? 40 : 20;

      await addDoc(collection(db, "bookings"), {
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        callType,
        date: date.toISOString().split("T")[0],
        time: selectedTime,
        duration,
        recurring: callType === "follow-up"
      });

      onClose();
    } catch (error) {
      console.error("Error booking call:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] md:w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Book New Call</h2>

        
        <div className="mb-3 text-gray-600 text-sm">
          Selected Time:{" "}
          <span className="font-medium text-gray-800">
            {date.toDateString()}, {selectedTime}
          </span>
        </div>

      
        <input
          type="text"
          placeholder="Search client by name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

       
        <div className="max-h-32 overflow-y-auto border rounded-lg mb-3">
          {!clients ? <div>Loading...</div> :  filteredClients.map((client) => (
            <div
              key={client.id}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                selectedClient?.id === client.id ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <div className="font-medium">{client.name}</div>
              <div className="text-xs text-gray-500">{client.phone}</div>
            </div>
          ))}
        </div>

        
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={callType === "onboarding"}
              onChange={() => setCallType("onboarding")}
            />
            <span>Onboarding (40 min)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={callType === "follow-up"}
              onChange={() => setCallType("follow-up")}
            />
            <span>Follow-up (20 min)</span>
          </label>
        </div>

        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            disabled={!selectedClient || loading}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Booking..." : "Book Call"}
          </button>
        </div>
      </div>
    </div>
  );
}
