export interface Feedback {
  id: number;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackCreateRequest {
  type: "DAILY";
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
}
