export type reviewsType = {
  comment: string;
  creatTime: string;
  reviewId: string;
  starRating: string;
  updateTime: string;
  reviewReply: {
    comment: string;
    updateTime: string;
  };
  reviewer: {
    displayName: string;
    isAnonymous: boolean;
    profilePhotoUrl: string;
  };
};
