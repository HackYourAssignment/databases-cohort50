const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const createTablesAndInsertData = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const createResearchPapersTableQuery = `
      CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
      );
    `;
    await connection.query(createResearchPapersTableQuery);

    const createAuthorPaperTableQuery = `
      CREATE TABLE IF NOT EXISTS author_paper (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
      );
    `;
    await connection.query(createAuthorPaperTableQuery);

    const insertAuthorsQuery = `
      INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
      VALUES
        ('Alice Smith', 'Harvard', '1980-05-12', 10, 'female'),
        ('Bob Johnson', 'MIT', '1975-09-22', 20, 'male'),
        ('Catherine Brown', 'Oxford', '1983-03-08', 15, 'female'),
        ('David Wilson', 'Stanford', '1990-07-19', 12, 'male'),
        ('Emily Davis', 'Cambridge', '1985-02-28', 18, 'female'),
        ('Frank White', 'Columbia', '1978-06-10', 22, 'male'),
        ('Grace Thompson', 'Princeton', '1987-11-30', 17, 'female'),
        ('Henry Lee', 'Yale', '1989-04-15', 14, 'male'),
        ('Isabella Clark', 'Berkeley', '1992-08-20', 13, 'female'),
        ('James Walker', 'Caltech', '1970-01-05', 30, 'male'),
        ('Katherine Young', 'UCLA', '1988-09-01', 16, 'female'),
        ('Liam Turner', 'Chicago', '1991-03-25', 19, 'male'),
        ('Mia Harris', 'Cornell', '1986-10-10', 21, 'female'),
        ('Nathan Scott', 'NYU', '1993-12-18', 12, 'male'),
        ('Olivia Adams', 'Duke', '1984-01-07', 11, 'female');
    `;
    await connection.query(insertAuthorsQuery);

    const insertPapersQuery = `
      INSERT INTO research_papers (paper_title, conference, publish_date)
      VALUES
        ('AI in Medicine', 'NeurIPS', '2022-12-01'),
        ('Quantum Computing', 'QIP', '2021-06-15'),
        ('Deep Learning Advances', 'CVPR', '2023-03-10'),
        ('Natural Language Processing', 'ACL', '2020-11-20'),
        ('Graph Neural Networks', 'ICLR', '2021-04-25'),
        ('Reinforcement Learning', 'ICML', '2022-09-05'),
        ('Ethics in AI', 'NeurIPS', '2020-08-30'),
        ('Data Privacy', 'KDD', '2023-01-18'),
        ('Big Data Analytics', 'SIGMOD', '2019-07-10'),
        ('Computer Vision', 'ECCV', '2023-02-05'),
        ('Robotics', 'ICRA', '2022-03-28'),
        ('Bioinformatics', 'RECOMB', '2021-12-10'),
        ('Human-Computer Interaction', 'CHI', '2018-05-15'),
        ('Distributed Systems', 'SOSP', '2021-10-30'),
        ('Embedded Systems', 'DAC', '2020-04-20'),
        ('Edge Computing', 'MobiSys', '2023-09-10'),
        ('Self-Driving Cars', 'ITS', '2021-07-05'),
        ('Machine Translation', 'NAACL', '2019-09-19'),
        ('Speech Recognition', 'INTERSPEECH', '2023-06-22'),
        ('Object Detection', 'WACV', '2022-02-14'),
        ('Text Summarization', 'EMNLP', '2021-11-01'),
        ('Cybersecurity', 'IEEE S&P', '2020-10-18'),
        ('Blockchain Technology', 'Crypto', '2023-08-01'),
        ('Augmented Reality', 'ISMAR', '2020-03-25'),
        ('Virtual Reality', 'SIGGRAPH', '2022-12-05'),
        ('Autonomous Drones', 'ICRA', '2019-08-11'),
        ('Cloud Computing', 'SC', '2023-05-30'),
        ('Neural Network Optimization', 'ICML', '2021-01-19'),
        ('Federated Learning', 'ICLR', '2022-04-07'),
        ('Explainable AI', 'NeurIPS', '2023-07-15');
    `;
    await connection.query(insertPapersQuery);

    const insertAuthorPaperQuery = `
      INSERT INTO author_paper (author_id, paper_id)
      VALUES
        (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (4, 6), (5, 7), (6, 8), (7, 9), (8, 10),
        (9, 11), (10, 12), (11, 13), (12, 14), (13, 15), (14, 16), (15, 17), (1, 18), (3, 19),
        (4, 20), (5, 21), (6, 22), (7, 23), (8, 24), (9, 25), (10, 26), (11, 27), (12, 28),
        (13, 29), (15, 30);
    `;
    await connection.query(insertAuthorPaperQuery);
  } catch (err) {
    throw new Error(`Error occurred: ${err.message}`);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

createTablesAndInsertData();
