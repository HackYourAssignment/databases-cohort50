## What columns violate 1NF?

# food_code and food_description violate 1NF coz they store multiple values. 
================================================ 

## What entities do you recognize that could be extracted?

- members : member_id  , member_name , member_address .

- dinners : dinner_id , dinner_date , venue_code .
- venues : venue_code , venue_description .
- foods : food_code , food_description .
- member_dinner : member_id , dinner_id .
- dinner_food : dinner_id , food_code .
 
 # there is no multiple values 1Nf
 # every non-key attribute depends on the entire primay key 2NF 
 # there is no transitive dependencies 3NF 

#  member_address column might contain multiple values if a member has more than one address  a home and a work address. Storing with comma-separated value would violate 1NF.

# to Normalize member_address into a separate table, member_addresses :
 member_id (FK from members)
- address ( one address per row)

# food_description in food table could violate 1NF coz it could store multiple values too ..
# to normalize food_description into more separated columns , for simple scenarios and fixed attributes of food item 

foods:
- food_code (PK)
- name 
- description 
- calories 

# or i can normalize it by separating food_description into another table for complex scenarios if we have multipl attributes for food 
and that would look like 
# foods : 
-food_code (pk)
-name 

# food_descriptions : 
-food_code : (fk from foods)
-description
-calories 