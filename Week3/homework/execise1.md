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

