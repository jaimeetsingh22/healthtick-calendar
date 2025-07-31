import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Menu, X } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
}

export default function Sidebar() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "clients"));
      const data: Client[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];
      setClients(data);
    })();
  }, []);

  return (
    <>
     
      <button
        className="absolute top-2 left-4 md:hidden opacity-50 z-50 bg-blue-500 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

    
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 w-64 bg-white shadow-md p-4 flex flex-col h-screen z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
       
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">Health Tick</h1>
        <nav className="space-y-4">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
            Calendar
          </button>
        </nav>
        <p className="text-lg text-gray-600 border-b p-1">Clients</p>
        <div className="flex-1 overflow-y-auto p-3 m-1 z-[100]">
          {clients.length > 0 ? (
            clients.map((client: Client) => (
              <div
                key={client.id}
                className="flex items-center justify-between gap-2 p-2 hover:bg-blue-50 rounded-lg"
              >
                <span className="text-gray-800 font-medium">{client.name}</span>
                <span className="text-sm text-gray-500">{client.phone}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No clients found</div>
          )}
        </div>
        <div className="mt-auto">
          <p className="text-sm text-gray-400">Coach HealthTick</p>
        </div>
      </div>
    </>
  );
}
