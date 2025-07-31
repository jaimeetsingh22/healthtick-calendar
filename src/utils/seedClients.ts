import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const clients = [
  { name: "Alice Wonderland", phone: "555-1234" },
  { name: "Bob The Builder", phone: "555-5678" },
  { name: "Charlie Chaplin", phone: "555-9012" },
  { name: "Diana Prince", phone: "555-3456" },
  { name: "Ethan Hunt", phone: "555-7890" },
  { name: "Fiona Apple", phone: "555-2345" },
  { name: "George Costanza", phone: "555-6789" },
  { name: "Hannah Montana", phone: "555-0123" },
  { name: "Ian Malcolm", phone: "555-4567" },
  { name: "Jane Doe", phone: "555-8901" },
  { name: "Kevin Spacey", phone: "555-1357" },
  { name: "Laura Croft", phone: "555-2468" },
  { name: "Michael Scott", phone: "555-3579" },
  { name: "Nina Simone", phone: "555-4680" },
  { name: "Oscar Wilde", phone: "555-5791" },
  { name: "Pablo Picasso", phone: "555-6802" },
  { name: "Quentin Tarantino", phone: "555-7913" },
  { name: "Rihanna", phone: "555-8024" },
  { name: "Steve Jobs", phone: "555-9135" },
  { name: "Tina Fey", phone: "555-0246" },
];

export async function seedClients() {
  const clientsRef = collection(db, "clients");
  for (const client of clients) {
    await addDoc(clientsRef, client);
  }
  console.log("Clients seeded!");
  alert("Clients seeded!");
}
