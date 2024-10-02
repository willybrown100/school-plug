import like from "../../assets/notifications/like.svg";
import comment from "../../assets/notifications/comment.svg";
import repost from "../../assets/notifications/repost.svg";
import image1 from "../../assets/notifications/image-1.svg";
import image2 from "../../assets/notifications/image-2.svg";
import image3 from "../../assets/notifications/image-3.svg";

const notifications = [
  {
    id: 1,
    title: {
      text: "Grace Sunday, Blessing",
      span: "and 3 others",
    },
    action: "Liked your post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    icon: like,
    images: {
      1: image1,
      2: image2,
      3: image3,
    },
  },
  {
    id: 2,
    title: {
      text: "Grace Sunday, Blessing",
      span: "and 3 others",
    },
    action: "Comment your post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    icon: comment,
    images: {
      1: image1,
      2: image2,
      3: image3,
    },
  },
  {
    id: 3,
    title: {
      text: "Grace Sunday, Blessing",
      span: "and 3 others",
    },
    action: "Reposted your post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    icon: repost,
    images: {
      1: image1,
      2: image2,
      3: image3,
    },
  },
  {
    id: 4,
    title: {
      text: "Grace Sunday",
    },
    action: "mentioned you in a post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    images: {
      1: image1,
    },
  },
  {
    id: 5,
    title: {
      text: "Grace Sunday",
      span: "and 3 others",
    },
    action: "Reposted your post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    icon: repost,
    images: {
      1: image1,
      2: image2,
      3: image3,
    },
  },
  {
    id: 6,
    title: {
      text: "Grace Sunday",
    },
    action: "mentioned you in a post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    images: {
      1: image1,
    },
  },
  {
    id: 7,
    title: {
      text: "Grace Sunday",
      span: "and 3 others",
    },
    action: "Reposted your post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    icon: repost,
    images: {
      1: image1,
      2: image2,
      3: image3,
    },
  },
  {
    id: 8,
    title: {
      text: "Grace Sunday",
    },
    action: "mentioned you in a post",
    message:
      "Faculty of Arts, Law department, All Law students are expected to have their lectures at...",
    images: {
      1: image1,
    },
  },
];

export default notifications;
