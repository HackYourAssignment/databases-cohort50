
### Exercise 1 : SQL Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

1. What columns violate 1NF?

ANSWER:
The table below has violations in such columns:
     - member_address, venue_description, food_description and food_code: these columns have multi-valued attributes. Each column should have single values in each cell, and no cell should hold multiple values.

     - dinner_date: in this column data is inconsistent. All values in a column should be of the same type.

     - venue_description and food_description: these columns have many repetitions that means they could be moved to a separate table and connected to this one using a foreign key.

2. What entities do you recognize that could be extracted?

ANSWER:
I would extract members, dinners, venues, and food into separate tables and add relationships between these entities to connect them.

3. Name all the tables and columns that would make a 3NF compliant solution.

ANSWER:
For the entities members, dinners, venues, and food  should be created such tables:

- Members Table (id, name, address)
- Dinners Table (id, date, venue_code(a foreign key))
- Venues Table (venue_code, description)
- Food Table (food_code, description)

 Relationship between Members and Dinners and Dinners and Food are many-to-many, that is why two more tables (middle tables) should be created:

- member_dinner Table
- dinner_food Table

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
