interface User {
  avatar: string;
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

export interface PostFormInputs {
  title: string;
  caption?: string;
  tags?: string[];
  text: string;
  token: any;
}
