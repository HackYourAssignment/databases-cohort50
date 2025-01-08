import { connection } from './connection.js';

async function adjustDatabase() {
    const createResearchPapersTable = `
        CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT PRIMARY KEY, 
        paper_title VARCHAR(255) NOT NULL, 
        conference TEXT, 
        publish_date DATE
    )`;

    const createAuthorPaperTable = `
        CREATE TABLE IF NOT EXISTS author_paper (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    )`;

    const useDatabase = `USE academics`;

    try {
        await connection.query(useDatabase);
        await connection.query(createResearchPapersTable);
        await connection.query(createAuthorPaperTable);
        await addDataToDatabase();
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

async function addDataToDatabase() {
    const addAuthorsInfo = `
        INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
        VALUES 
            (1, 'Billie Joe Armstrong', 'University of California, Berkeley', '1972-02-17', 45, 'm', NULL),
            (2, 'Mark Hoppus', 'University of Southern California', '1972-03-15', 40, 'm', 1),
            (3, 'Gerard Way', 'Rutgers University', '1977-04-09', 50, 'm', 1),
            (4, 'Hayley Williams', 'University of Tennessee', '1988-12-27', 38, 'f', 3),
            (5, 'Travis Barker', 'San Diego State University', '1975-11-14', 42, 'm', 2),
            (6, 'Pete Wentz', 'University of Chicago', '1979-06-05', 55, 'm', 3),
            (7, 'Patrick Stump', 'University of Illinois', '1984-04-27', 35, 'm', 6),
            (8, 'Tom DeLonge', 'California State University, San Marcos', '1975-12-13', 30, 'm', 2),
            (9, 'Brendon Urie', 'University of Nevada, Las Vegas', '1987-04-12', 48, 'm', 6),
            (10, 'Frank Iero', 'New York University', '1981-10-31', 37, 'm', 3),
            (11, 'Mikey Way', 'Rutgers University', '1980-09-10', 39, 'm', 3),
            (12, 'Zack Faro', 'University of Chicago', '1976-02-24', 44, 'm', 2),
            (13, 'Tre Cool', 'University of Florida', '1975-04-10', 43, 'm', NULL),
            (14, 'Lacey Sturm', 'North Carolina State University', '1981-09-22', 38, 'f', 3),
            (15, 'Bert McCracken', 'University of Utah', '1982-02-25', 36, 'm', 1)
    `;

    const addResearchPaperInfo = `
        INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
        VALUES
            (1, 'The Evolution of Alternative Music', 'World Music Conference', '1998-05-15'),
            (2, 'Pop-Punk: A Cultural Phenomenon', 'Global Rock Studies Summit', '2001-07-20'),
            (3, 'The Rise of Female Fronted Bands in the 90s', 'Women in Music Symposium', '1999-03-12'),
            (4, 'Lyrics and Youth: The Impact of Green Day', 'Youth Culture Conference', '2000-09-25'),
            (5, 'The Legacy of Nirvana in Modern Rock', 'Grunge Studies Forum', '1997-11-30'),
            (6, 'The Aesthetic: Visual and Sonic Elements', 'Visual Arts and Music Intersection', '2002-04-10'),
            (7, 'The Role of My Chemical Romance in Pop Revival', 'Music Revival Studies Conference', '2005-06-18'),
            (8, 'Paramore Breakthrough in Mainstream Music', 'Pop Music Insights', '2007-01-21'),
            (9, 'Warped Tour: A Catalyst for Alternative Music', 'Music Festivals and Culture', '1996-08-15'),
            (10, 'The Intersection of Punk and Pop in Blink-182''s Work', 'Crossover Music Conference', '2001-10-05'),
            (11, 'The DIY Ethos in Pop-Punk Bands', 'Independent Music Summit', '1999-12-14'),
            (12, 'Guitar Techniques in Pop Bands', 'World Guitar Conference', '1998-06-30'),
            (13, 'The Emotional Themes in Dashboard Confessional Lyrics', 'Poetry in Music Symposium', '2000-04-22'),
            (14, 'How Avril Lavigne Changed Pop-Punk for Women', 'Women in Punk Conference', '2002-09-14'),
            (15, 'The Influence of Good Charlotte on Teen Culture', 'Teen Identity and Music Forum', '2003-03-03'),
            (16, 'The Role of Social Media in Pop-Punk Revival', 'Music and Technology Summit', '2010-11-19'),
            (17, 'Evanescence: A Bridge Between Goth and Pop-Punk', 'Genre Blending in Music', '2004-05-09'),
            (18, 'The Drumming Styles in Pop-Punk Bands', 'Rhythm in Music Studies', '1997-07-29'),
            (19, 'How Bands Explored Mental Health in Lyrics', 'Music and Psychology Conference', '2000-08-12'),
            (20, 'The Role of MTV in Popularizing Alternative Rock', 'Media and Music Insights', '1999-10-08'),
            (21, 'The Acoustic Side of Punk: Stripped-Down Sounds', 'Acoustic Music Studies', '2005-02-15'),
            (22, 'Pop-Punk and Its Connection to Skateboarding Culture', 'Subcultures in Music', '2001-03-20'),
            (23, 'The Branding of Pop-Punk Bands: Merchandise and Identity', 'Music Marketing Summit', '1998-11-02'),
            (24, 'Taking Back Sunday: Lyrics of Love and Loss', 'Storytelling in Music Symposium', '2003-07-18'),
            (25, 'The Role of Alternative Music in Female Representation', 'Diversity in Music Studies', '2006-04-07'),
            (26, 'The Intersection of Fashion and Music Trends', 'Fashion and Music Trends', '2002-01-13'),
            (27, 'The Nostalgia of 90s Pop-Punk in Today''s Music', 'Nostalgia and Pop Culture Conference', '2015-09-10'),
            (28, 'The Collaboration Between Pop-Punk Bands and Producers', 'Music Collaboration Studies', '1997-05-25'),
            (29, 'The Sound of Suburbia: Pop-Punk and Middle-Class America', 'Sociology in Music Conference', '2000-02-27'),
            (30, 'From Garage Bands to Stardom: The Journey of Alternative Artists', 'Music Career Symposium', '2003-12-06')
    `;

    const addAuthorsPaperInfo = `
        INSERT INTO author_paper (author_id, paper_id)
            VALUES
            (1, 1), (1, 5), (1, 12),
            (2, 3),
            (3, 2), (3, 9), (3, 14), (3, 18),
            (4, 6), (4, 19),
            (5, 4), (5, 7), (5, 20), (5, 25),
            (6, 8),
            (7, 10), (7, 15),
            (8, 11), (8, 16), (8, 23),
            (9, 13), (9, 22), (9, 26),
            (10, 17),
            (11, 21), (11, 27), (11, 28), (11, 29),
            (12, 24),
            (13, 30),
            (14, 7), (14, 10),
            (15, 3), (15, 18), (15, 30)
    `;

    try {
        await connection.query(addAuthorsInfo);
        await connection.query(addResearchPaperInfo);
        await connection.query(addAuthorsPaperInfo);
    } catch (error) {
        console.error(error);
        connection.end();
    }
}

adjustDatabase();
