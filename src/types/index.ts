export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  callType: "onboarding" | "follow-up";
  date: string;   
  time: string;   
  duration: number;
  recurring: boolean;
}
