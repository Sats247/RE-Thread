import { AppError } from '@/shared/types';
import type { SupportContract, CreateTicketData } from '../contracts/support.contract';
import type { Ticket } from '@/shared/types';

export const supportMock: SupportContract = {
  async listTickets(): Promise<Ticket[]> {
    throw new AppError('not-implemented', 'listTickets not implemented');
  },
  async getTicket(_id: string): Promise<Ticket> {
    throw new AppError('not-implemented', 'getTicket not implemented');
  },
  async createTicket(_data: CreateTicketData): Promise<Ticket> {
    throw new AppError('not-implemented', 'createTicket not implemented');
  },
  async postMessage(_ticketId: string, _text: string): Promise<Ticket> {
    throw new AppError('not-implemented', 'postMessage not implemented');
  },
  async escalate(_ticketId: string): Promise<Ticket> {
    throw new AppError('not-implemented', 'escalate not implemented');
  },
  async requestReturn(_ticketId: string): Promise<Ticket> {
    throw new AppError('not-implemented', 'requestReturn not implemented');
  },
};
