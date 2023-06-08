export interface ChatMessage {
  createdAt: string;
  id: string;
  jobId: number;
  porposalId: number;
  text: string;
  image?: string;
  video?: string;
  user: {
    _id: number;
    avatar: string;
    name: string;
  };
}
