import { Comment } from "../types";

export const getCommentsData = async (): Promise<Comment[]> => {
  return [
    {
      _id: "10",
      user: {
        _id: "a",
        name: "Jemal baghasjvili",
      },
      desc: "it was a nice post, Thank you!",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
    {
      _id: "11",
      user: {
        _id: "b",
        name: "Gia baghasvili",
      },
      desc: "a reply for Mr.Jemal",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
    {
      _id: "12",
      user: {
        _id: "b",
        name: "Vlad aramovi",
      },
      desc: "keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
    {
      _id: "13",
      user: {
        _id: "c",
        name: "Tashi",
      },
      desc: "*Iumorinas musika*",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
  ];
};