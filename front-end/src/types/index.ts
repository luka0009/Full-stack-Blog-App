interface User {
  _id: string;
  name: string;
}

export interface Comment {
  _id: string;
  user: User;
  desc: string;
  post: string;
  parent?: any;
  replyOnUser?: any;
  createdAt: string;
}
