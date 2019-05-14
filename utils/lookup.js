// the first function is to create the lookup table which will need to consist of article ID and the article title

exports.lookupArticleId = articleRows => {
  let lookupObj = {};
  articleRows.forEach(article => {
    lookupObj[article.title] = article.article_id;
    return article;
  });
  return lookupObj;
};

// now we will use this lookup objectb to scan through the comments array and matching the belongs_to value to the
// article title and if they match then we shall replace this with article_id and corressponding number

exports.formatComments = (newCommentData, lookupArticle) => {
  let formattedCommentData = newCommentData.map(comment => {
    comment.article_id = lookupArticle[comment.belongs_to];
    const { belongs_to, ...rest } = comment;

    return rest;
  });
  return formattedCommentData;
};
