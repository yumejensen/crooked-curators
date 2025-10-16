'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ribbons', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: 'Museum is Getting Sued',
        points: 200,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: 'Best in Show',
        points: 180,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: 'Most Accurate',
        points: 160,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: 'Perfect Counterfeit',
        points: 140,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: `We Get It, You're An Artist`,
        points: 120,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'BLUE',
        description: 'NOBODY is gonna know',
        points: 100,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_BLUE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'WHITE',
        description: 'Oh Bless Your HeART',
        points: 200,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_WHITE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'WHITE',
        description: 'Barely Above Average',
        points: 170,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_WHITE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'WHITE',
        description: 'Most Okayest',
        points: 150,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_WHITE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'WHITE',
        description: 'It does count as "Art"',
        points: 130,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_WHITE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'WHITE',
        description: 'Most Unfinished',
        points: 110,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_WHITE_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'Museum is Getting Sued',
        points: 200,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'Truly Horror Inducing',
        points: 180,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'It Made My Child Cry',
        points: 160,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'Not Fit For Eyes',
        points: 140,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'Most Disturbing',
        points: 120,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'RED',
        description: 'Most Disliked',
        points: 100,
        source: 'https://crooked-curators.s3.us-east-2.amazonaws.com/ribbons/ArtRibbon_RED_BLANK.png'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ribbon', null, {});
  }
};
