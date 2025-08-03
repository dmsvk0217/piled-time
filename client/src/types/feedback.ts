export interface Feedback {
  id: number;
  type: FeedbackType;
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export enum FeedbackType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export interface FeedbackCreateRequest {
  type: FeedbackType;
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
}
