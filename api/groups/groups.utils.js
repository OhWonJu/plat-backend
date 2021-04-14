export const processHashtags = bio => {
  // parse bio
  //                                       null이 들어왔을 때 빈 배열 반환
  const hashtags = bio.match(/#[\w]+/g) || [];
  // map return array~
  return hashtags.map(hashtag => ({
    where: { hashtag },
    create: { hashtag },
  }));
};

export const generateInviteCode = () =>
  Math.random().toString(36).substr(2, 4).toUpperCase();

