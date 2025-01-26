

# Columns That Violate 1Nf
  
   1-food_code:
    This column contains multiple values separated by comma
    (e.g., C1, C2 or P1, T1, M1)

   2-food_description
    This column also contains multiple values separated by comma
    (e.g., Curry, Cake or Pie, Tea, Mousse

 1NF Rule: Each cell must have a single value

# What entities do you recognize that could be extracted
   1. Member
     Attributes:
      . member_id
      . member_nam
      . member_addres

   2. dinner
     Attributes:
      . dinner_i
      . dinner_dat
    
   3. venue
     Attributes:
      . venue_cod
      . venue_descriptio

   4. Food
     Attributes
      . food_cod
      . food_description

# Name all the tables and columns that would make a 3NF compliant solution.
      . Members => member_id, member_name, member_addres
      . Member_Dinner => member_id, dinner_id
      . Dinners => dinner_id, dinner_dat,venue_code
      . Venues => venue_code, venue_description
      . Foods => food_code, food_descriptio
      . Dinner_Food => dinner_id, food_code
     
