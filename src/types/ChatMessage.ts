export interface ChatMessage {
  createdAt: string;
  id: string;
  jobId: number;
  porposalId: number;
  text: string;
  image?: string;
  video?: string;
  document: string;
  user: {
    _id: number;
    avatar: string;
    name: string;
  };
}

export interface ChatMessageList {
  createdAt: string;
  fullName: string;
  image: string[];
  jobDescription: string;
  jobId: number;
  jobName: string;
  profileImage: string;
  proposalId: number;
  proposalStatus: number;
  clientId: number;
  read?: number;
}
