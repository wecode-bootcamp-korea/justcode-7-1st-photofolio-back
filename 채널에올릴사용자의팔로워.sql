SELECT COUNT(follow.follower_id) as follower_cnt, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
          "following_id", follow.following_id,
			"follower_id", follow.follower_id
            )
          ) as follower_info
      from follow
      where follow.follower_id = 1