// below is an example set of article data
exports.articlesData = [
  {
    article_id: 1,
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: 1542284514171,
    votes: 100
  },
  {
    article_id: 2,
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body:
      "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: 1416140514171
  }
];
// below is an example set of article data with the new formatted date
exports.newDateData = [
  {
    article_id: 1,

    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: new Date(1542284514171)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    votes: 100
  },
  {
    article_id: 2,

    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body:
      "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: new Date(1416140514171)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
  }
];
// below is an example of the article title and article id lookup article
exports.lookUpTestData = {
  "Living in the shadow of a great man": 1,
  "Sony Vaio; or, The Laptop": 2
};

// below is an example of a comments array
exports.commentsData = [
  {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    created_by: "butter_bridge",
    votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
    belongs_to: "Living in the shadow of a great man",
    created_by: "butter_bridge",
    votes: 14,
    created_at: 1479818163389
  }
];
// below is an example of the lookup table again, this time used in conjunction with the previous comments data example
exports.exampleReferenceTable = {
  "They're not exactly dogs, are they?": 1,
  "Living in the shadow of a great man": 2
};

// below is an example of the comments array with the article id inside and belong_to key removed
exports.formattedCommentTest = [
  {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    article_id: 1,
    created_by: "butter_bridge",
    votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
    article_id: 2,
    created_by: "butter_bridge",
    votes: 14,
    created_at: 1479818163389
  }
];

exports.swappedCreatedBy = [
  {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    article_id: 1,
    author: "butter_bridge",
    votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
    article_id: 2,
    author: "butter_bridge",
    votes: 14,
    created_at: 1479818163389
  }
];
