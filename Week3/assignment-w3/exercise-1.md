### 3.1. Exercise 1 : SQL Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners
had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

1. What columns violate 1NF?
2. What entities do you recognize that could be extracted?
3. Name all the tables and columns that would make a 3NF compliant solution.

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

1. What columns violate 1NF?

    Following columns violate 1NF:

-   food_code: Contains multiple values separated by commas (e.g., C1, C2).
-   food_description: Contains multiple values separated by commas (e.g., Curry, Cake).

2. What entities do you recognize that could be extracted?

    Entities:

-   Member information (member_id, member_name, member_address);
-   Dinner information (dinner_id, dinner_date);
-   Venue information (venue_code, venue_description);
-   Food information (food_code, food_description);

3. Name all the tables and columns that would make a 3NF compliant solution.

-- Members Table

`CREATE TABLE members (
member_id INT PRIMARY KEY,
member_name VARCHAR(100),
member_address VARCHAR(200)
);`

-- Venues Table

`CREATE TABLE venues (
venue_code VARCHAR(10) PRIMARY KEY,
venue_description VARCHAR(100)
);`

-- Foods Table

`CREATE TABLE foods (
food_code VARCHAR(10) PRIMARY KEY,
food_description VARCHAR(100)
);`

-- Dinners Table

`CREATE TABLE dinners (
dinner_id VARCHAR(15) PRIMARY KEY,
dinner_date DATE,
venue_code VARCHAR(10),
FOREIGN KEY (venue_code) REFERENCES venues(venue_code)
);`

-- Dinner Attendance Table

`CREATE TABLE dinner_attendance (
dinner_id VARCHAR(15),
member_id INT,
PRIMARY KEY (dinner_id, member_id),
FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id),
FOREIGN KEY (member_id) REFERENCES members(member_id)
);`

-- Dinner Foods Table

`CREATE TABLE dinner_foods (
dinner_id VARCHAR(15),
food_code VARCHAR(10),
PRIMARY KEY (dinner_id, food_code),
FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id),
FOREIGN KEY (food_code) REFERENCES foods(food_code)
);`
