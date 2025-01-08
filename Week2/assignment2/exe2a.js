


import { connection } from './exe1.js';




const createResearchTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY AUTO_INCREMENT,
      paper_title VARCHAR(50) NOT NULL,
      conference VARCHAR(50),
      publish_date DATE
    );
  `;

  try {
    await connection.execute(createTableQuery);
    console.log('Research papers table created successfully.');
  } catch (err) {
    console.error('Error creating research_papers table:', err.message);
  }
};


const createAuthorPapersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS author_papers (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    );
  `;

  try {
    await connection.execute(createTableQuery);
    console.log('Author papers table created successfully.');
  } catch (err) {
    console.error('Error creating author_papers table:', err.message);
  }
};

const insertResearchPapers = async () => {
  const researchPapers = [
    ['Quantum Computing Breakthrough', 'International Conference on Quantum Tech', '2020-01-15'],
    ['AI in Healthcare', 'World AI Summit', '2020-02-10'],
    ['Blockchain Applications in Finance', 'FinTech Expo 2020', '2020-03-05'],
    ['Cybersecurity Trends 2021', 'Global Security Forum', '2020-04-18'],
    ['Renewable Energy Innovations', 'Clean Energy Symposium', '2020-05-12'],
    ['Advances in Machine Learning', 'Neural Networks Conference', '2020-06-20'],
    ['The Future of Autonomous Vehicles', 'Automotive Tech Expo', '2020-07-07'],
    ['Space Exploration Technologies', 'Aerospace Conference', '2020-08-15'],
    ['CRISPR and Gene Editing', 'Genomics Conference', '2020-09-10'],
    ['Climate Change and Mitigation Strategies', 'Environmental Science Summit', '2020-10-05'],
    ['5G Networks and Beyond', 'Mobile World Congress', '2021-01-10'],
    ['IoT in Smart Cities', 'Urban Tech Symposium', '2021-02-22'],
    ['Advancements in Robotics', 'Robotics and Automation Expo', '2021-03-15'],
    ['Big Data in Business Analytics', 'Data Science Congress', '2021-04-05'],
    ['Nanotechnology in Medicine', 'NanoMed Conference', '2021-05-18'],
    ['Virtual Reality in Education', 'EdTech Global', '2021-06-22'],
    ['Bioinformatics in Drug Discovery', 'PharmaTech Summit', '2021-07-11'],
    ['AR in Retail and Marketing', 'Digital Commerce Conference', '2021-08-25'],
    ['Quantum Cryptography', 'Cryptography and Security Workshop', '2021-09-15'],
    ['Global Supply Chain Disruption', 'Logistics and Supply Chain Forum', '2021-10-05'],
    ['Artificial Intelligence in Space', 'SpaceTech Summit', '2022-01-20'],
    ['Hydrogen as a Renewable Energy Source', 'Energy Innovations Expo', '2022-02-14'],
    ['Advanced Battery Technologies', 'Battery Tech Conference', '2022-03-12'],
    ['Ocean Conservation Efforts', 'Marine Science Symposium', '2022-04-10'],
    ['Sustainable Agriculture Practices', 'AgriTech World Forum', '2022-05-08'],
    ['The Rise of Metaverse', 'Virtual World Expo', '2022-06-30'],
    ['Digital Twins in Manufacturing', 'Industry 4.0 Congress', '2022-07-20'],
    ['AI Ethics and Regulation', 'Global AI Policy Summit', '2022-08-16'],
    ['Wearable Tech Innovations', 'Consumer Tech Conference', '2022-09-08'],
    ['Next-Gen Processors', 'Computing Hardware Summit', '2022-10-05']
  ];

  const insertQuery = `
    INSERT INTO research_papers (paper_title, conference, publish_date)
    VALUES ?;
  `;

  try {
     await connection.execute(insertQuery, [researchPapers]);
    console.log('Successfully inserted 30 research papers into the research_papers table!');
  } catch (err) {
    console.error('Error inserting data:', err.message);
  }
};


const setupDatabase = async () => {
  await createResearchTable();
  await createAuthorPapersTable();
  await insertResearchPapers();
};


setupDatabase();
