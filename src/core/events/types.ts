export interface WritingUserWsEvent {
  threadId: string;
  state: boolean;
  user: { id: string; fullName: string };
}
