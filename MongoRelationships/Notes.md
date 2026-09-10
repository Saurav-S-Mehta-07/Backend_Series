# # Relationships

\# SQL (via Foreign Keys)

* one to one : 
    * table 1 -> table 2 (one connection ) \
       eg : country ->  president  (one country has only one president)\
        (country_id, country_name, p_id) -> (p_id, p_name)

* one to many : 
    * table 1 -> -> table 2 (multipe connection) \
       eg : users -> posts \
       one user can create mulitipe posts and one post has only one author \
       users(user_id, name) -> posts(p_id, content, user_id)

* many to many : 
    * table 1 <-> <-> table 2 \
      eg: student <-> subject \
        students(std_id, name, sub_id) <-> subject(sub_id, name, std_id) \

``

# # Mongo Relationships

## One to Many 

 * this many can be : few(100 - 500), 100^n, millions-billions

### Approach 1 (one to few)
* store the child document inside parent
* eg : Zomato \
       home, hostel, office's addresses \

