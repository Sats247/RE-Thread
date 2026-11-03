import type { Ticket } from '@/shared/types';

export interface CreateTicketData {
  orderId?: string;
  rentalId?: string;
  type: Ticket['type'];
  description: string;
  photos: string[];
  requestReturn?: boolean;
}

export interface SupportContract {
  listTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket>;
  createTicket(data: CreateTicketData): Promise<Ticket>;
  postMessage(ticketId: string, text: string): Promise<Ticket>;
  escalate(ticketId: string): Promise<Ticket>;
  requestReturn(ticketId: string): Promise<Ticket>;
}
