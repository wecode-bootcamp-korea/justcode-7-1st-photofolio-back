SELECT COUNT(follow.following_id) as following_cnt, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
		"follower_id", follow.follower_id,
          "following_id", follow.following_id
            )
          ) as following_info
      from follow
      where follow.following_id = 1