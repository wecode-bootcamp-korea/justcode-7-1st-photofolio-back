SELECT users.kor_name, users.eng_name, users.nickname, following_id, follower_id from users
LEFT JOIN follow on following_id = 1 or follower_id = 1 where users.id = 1