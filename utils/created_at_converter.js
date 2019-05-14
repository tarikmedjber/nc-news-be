exports.createdAtConverter = articlesData => {
  return articlesData.map(article => {
    let timeStamp = new Date(article.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const { created_at, ...restOfKeys } = article;
    restOfKeys.created_at = timeStamp;
    return restOfKeys;
  });
};

// this takes in the articles data and maps over every created_at property changing it to a date
