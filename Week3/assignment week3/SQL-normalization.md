# SQL Normalization - Dinner Club

## Violations of 1NF
1. `food_code` and `food_description` contain multiple values in a single column.
2. Inconsistent date formats in the `dinner_date` column.

## Recognized Entities
1. **Member**
2. **Dinner**
3. **Venue**
4. **Food**

## 3NF Compliant Tables

### 1. Members Table
| Column           | Description           |
|------------------|-----------------------|
| `member_id`      | Unique ID for members |
| `member_name`    | Name of the member    |
| `member_address` | Address of the member |

### 2. Dinners Table
| Column       | Description            |
|--------------|------------------------|
| `dinner_id`  | Unique ID for dinners  |
| `dinner_date`| Date of the dinner     |
| `venue_code` | Code for the venue     |

### 3. Venues Table
| Column              | Description              |
|---------------------|--------------------------|
| `venue_code`        | Unique code for venues   |
| `venue_description` | Description of the venue |

### 4. Food Table
| Column             | Description                   |
|--------------------|-------------------------------|
| `food_code`        | Unique code for food items    |
| `food_description` | Description of the food items |

### 5. Dinner_Food Table
| Column       | Description            |
|--------------|------------------------|
| `dinner_id`  | ID of the dinner       |
| `food_code`  | Code of the food item  |

### 6. Member_Dinners Table
| Column       | Description            |
|--------------|------------------------|
| `member_id`  | ID of the member       |
| `dinner_id`  | ID of the dinner       |

