import { createConnection } from 'mysql2/promise';

async function main() {
  try {
    const connection = await createConnection({
      host: 'localhost',
      user: 'hyfuser',
      password: 'hyfpassword',
      multipleStatements: true,
    });

    const queries = `
    CREATE DATABASE IF NOT EXISTS authors;
    USE authors;
    CREATE TABLE authors (
      author_id INT PRIMARY KEY,
      author_name VARCHAR(255) NOT NULL,
      university VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      h_index INT NOT NULL,
      gender ENUM('male', 'female', 'other') NOT NULL,
      supervisor INT,
      CONSTRAINT supervisor_integrity FOREIGN KEY (supervisor) REFERENCES authors(author_id)
   );

    CREATE TABLE research_Papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(500) NOT NULL,
      conference VARCHAR(500) NOT NULL,
      publish_date DATE NOT NULL,
      date_of_adding TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE TABLE authors_research_Papers (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    );

      CREATE TABLE supervisors (
        supervisor_id INT PRIMARY KEY,
        supervisor_name VARCHAR(255) NOT NULL
      );

      CREATE TABLE authors_supervisors (
        author_id INT,
        supervisor_id INT,
        PRIMARY KEY (author_id, supervisor_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id)
      );

      CREATE INDEX idx_author_name ON authors(author_name);
      CREATE INDEX idx_university ON authors(university);

        INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, supervisor)
        VALUES
            (1, 'Dr. Stephen Hawking', 'University of Cambridge', '1942-01-08', 120, 'male', 2),
            (2, 'Prof. Marie Curie', 'University of Paris', '1867-11-07', 95, 'female', 2),
            (3, 'Dr. Albert Einstein', 'ETH Zurich', '1879-03-14', 150, 'male', 2),
            (4, 'Dr. Rosalind Franklin', 'King\'s College London', '1920-07-25', 90, 'female', 1),
            (5, 'Dr. Alan Turing', 'University of Manchester', '1912-06-23', 130, 'male', 2),
            (6, 'Dr. Carl Sagan', 'Cornell University', '1934-11-09', 85, 'male', 2),
            (7, 'Dr. Ada Lovelace', 'University of London', '1815-12-10', 60, 'female', 2),
            (8, 'Dr. Richard Feynman', 'California Institute of Technology', '1918-05-11', 125, 'male', 2),
            (9, 'Dr. Katherine Johnson', 'NASA Research Center', '1918-08-26', 75, 'female', 2),
            (10, 'Dr. Niels Bohr', 'University of Copenhagen', '1885-10-07', 100, 'male', 2),
            (11, 'Dr. Jane Goodall', 'University of Cambridge', '1934-04-03', 70, 'female', 2),
            (12, 'Dr. Nikola Tesla', 'Graz University of Technology', '1856-07-10', 110, 'male', 2),
            (13, 'Dr. Chien-Shiung Wu', 'Columbia University', '1912-05-31', 80, 'female', 2),
            (14, 'Dr. James Clerk Maxwell', 'University of Edinburgh', '1831-06-13', 95, 'male', 2),
            (15, 'Dr. Florence Nightingale', 'University of London', '1820-05-12', 65, 'female', 2);
        
    INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date, date_of_adding)
    VALUES
        (1, 'A Brief History of Time', 'International Physics Conference', '1988-04-01', CURRENT_TIMESTAMP),
        (2, 'On the Radioactive Substances', 'Paris Chemistry Symposium', '1903-06-15', CURRENT_TIMESTAMP),
        (3, 'Special Theory of Relativity', 'Bern Scientific Meeting', '1905-09-26', CURRENT_TIMESTAMP),
        (4, 'Structure of DNA: X-ray Crystallography', 'London Biochemical Congress', '1953-02-28', CURRENT_TIMESTAMP),
        (5, 'The Turing Machine', 'Manchester Computing Symposium', '1936-11-12', CURRENT_TIMESTAMP),
        (6, 'Cosmos: A Personal Voyage', 'International Astronomy Conference', '1980-03-20', CURRENT_TIMESTAMP),
        (7, 'Analytical Engine Algorithms', 'London Mathematical Society', '1843-11-10', CURRENT_TIMESTAMP),
        (8, 'Quantum Electrodynamics', 'Caltech Quantum Mechanics Conference', '1949-06-12', CURRENT_TIMESTAMP),
        (9, 'Mathematical Computations for NASA', 'NASA Space Symposium', '1960-10-15', CURRENT_TIMESTAMP),
        (10, 'Atomic Structure and Spectra', 'Copenhagen Physics Congress', '1913-02-07', CURRENT_TIMESTAMP),
        (11, 'Chimpanzees in the Wild: Observations', 'Cambridge Wildlife Research Symposium', '1965-09-01', CURRENT_TIMESTAMP),
        (12, 'Wireless Power Transmission', 'Chicago Engineering Expo', '1893-05-01', CURRENT_TIMESTAMP),
        (13, 'Beta Decay and Weak Interactions', 'Columbia University Physics Seminar', '1956-04-25', CURRENT_TIMESTAMP),
        (14, 'Electromagnetic Field Theory', 'Royal Society of Edinburgh', '1864-08-13', CURRENT_TIMESTAMP),
        (15, 'Sanitary Reform in Healthcare', 'London Health Symposium', '1860-03-25', CURRENT_TIMESTAMP),
        (16, 'Black Holes and Baby Universes', 'Hawking Physics Workshop', '1993-06-20', CURRENT_TIMESTAMP),
        (17, 'Radioactive Traces in Nature', 'Paris Academy of Sciences', '1905-12-05', CURRENT_TIMESTAMP),
        (18, 'General Theory of Relativity', 'Berlin Mathematical Society', '1915-11-20', CURRENT_TIMESTAMP),
        (19, 'Helical Structure of Viruses', 'King\'s College Medical Symposium', '1958-07-10', CURRENT_TIMESTAMP),
        (20, 'Artificial Intelligence and Logic', 'Manchester AI Summit', '1950-05-19', CURRENT_TIMESTAMP),
        (21, 'Pale Blue Dot: Earth and the Cosmos', 'Cornell Astronomy Forum', '1994-11-08', CURRENT_TIMESTAMP),
        (22, 'Mathematics of Computation', 'Royal Society of London', '1848-02-14', CURRENT_TIMESTAMP),
        (23, 'The Feynman Lectures on Physics', 'Caltech Physics Education Forum', '1965-09-15', CURRENT_TIMESTAMP),
        (24, 'Computational Solutions for Space', 'NASA Research Conference', '1970-03-22', CURRENT_TIMESTAMP),
        (25, 'Complementarity in Quantum Physics', 'Copenhagen Quantum Physics Workshop', '1928-10-23', CURRENT_TIMESTAMP),
        (26, 'Primate Social Behavior', 'Cambridge Wildlife Symposium', '1972-04-09', CURRENT_TIMESTAMP),
        (27, 'Innovations in Electric Motors', 'American Engineering Congress', '1888-07-22', CURRENT_TIMESTAMP),
        (28, 'Parity Violation in Weak Interactions', 'Columbia University Physics Conference', '1957-09-17', CURRENT_TIMESTAMP),
        (29, 'Maxwell\'s Equations and Applications', 'Royal Society of Edinburgh', '1873-04-25', CURRENT_TIMESTAMP),
        (30, 'Statistical Evidence in Healthcare', 'International Medical Conference', '1871-06-05', CURRENT_TIMESTAMP);

          INSERT INTO authors_research_Papers (author_id, paper_id)
    VALUES
        -- Dr. Stephen Hawking
        (1, 1), (1, 16),
        -- Prof. Marie Curie
        (2, 2), (2, 17),
        -- Dr. Albert Einstein
        (3, 3), (3, 18),
        -- Dr. Rosalind Franklin
        (4, 4), (4, 19),
        -- Dr. Alan Turing
        (5, 5), (5, 20),
        -- Dr. Carl Sagan
        (6, 6), (6, 21),
        -- Dr. Ada Lovelace
        (7, 7), (7, 22),
        -- Dr. Richard Feynman
        (8, 8), (8, 23),
        -- Dr. Katherine Johnson
        (9, 9), (9, 24),
        -- Dr. Niels Bohr
        (10, 10), (10, 25),
        -- Dr. Jane Goodall
        (11, 11), (11, 26),
        -- Dr. Nikola Tesla
        (12, 12), (12, 27),
        -- Dr. Chien-Shiung Wu
        (13, 13), (13, 28),
        -- Dr. James Clerk Maxwell
        (14, 14), (14, 29),
        -- Dr. Florence Nightingale
        (15, 15), (15, 30);

        INSERT INTO supervisors (supervisor_id, supervisor_name)
        VALUES
            (1, 'Prof. Maurice Wilkins'), 
            (2, 'Self-study')
          ;`;

    await connection.query(queries);
    console.log('Successfully created and fulfilled!');
    await connection.end();
    console.log('Connection is closed.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
