type ScreenType = 0 | 1 | 2 | 3 | 4;

export interface NotificationInterface {
  createdAt: string;
  deleted: number;
  description: string;
  module: string;
  reciverId: number;
  renderId: string;
  senderId: number;
  senderName: string;
  title: string;
  type: ScreenType;
}
