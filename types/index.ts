export interface UserType {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded?: boolean;
}

export interface ThreadType {
  text: string;
  author: string;
  communityId?: string;
}
