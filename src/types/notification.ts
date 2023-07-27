export type Module = 'proposal_details' | 'payment_request_';
type NoticationType = 1 | 2 | 3 | 4;

export enum NotificationEnumType {
  Contract_detail = 1,
  Payment_Request_By_Talent = 2,
  Proposal_Sent_By_Talent = 3,
  For_Hire = 4,
}

export interface NotificationItem {
  createdAt: string;
  deleted: number;
  description: string;
  module: string;
  receiverId: number;
  renderId: string;
  senderId: number;
  senderName: string;
  title: string;
  type: NoticationType;
  jobId: string | null;
}
